<template>
  <div>
    <transition name="custom-classes-transition" enter-active-class="animated lightSpeedIn">
      <div v-show="showTitle">
      <Card :padding="0">
          <div slot="title" class="card-title">
            <Icon :type="titleIcon"></Icon>
            <span v-if="!showSearchInput" @click="bodySwitch">
              <i18n path="table.tips" tag="span">
                <template v-slot:count>
                  <Badge :count="count" style="padding:0px 5px;"></Badge>
                </template>
              </i18n>
              <span v-show="showBody"> - Userscript+</span>
            </span>
            <Input v-else v-model="searchInput"  icon="android-search" placeholder="Enter title、description、author..." style="width: 450px;height: 25px;"></Input>                    
          </div>
          <div slot="extra">
          <span v-show="showBody">
            <Tooltip :content="$t('table.search')" placement="bottom">
              <Button icon="android-search" type="default" @click="showSearchInput = !showSearchInput"></Button>
            </Tooltip>
            <Tooltip :content="$t('table.issue')" placement="bottom">
              <Button icon="bug" type="default" @click="open('https://github.com/magicoflolis/Userscript-Plus/issues/new')"></Button>
            </Tooltip>
            <Tooltip :content="$t('table.home')" placement="bottom">
              <Button icon="home" type="default" @click="open('https://github.com/magicoflolis/Userscript-Plus#readme')"></Button>
            </Tooltip>
            <Tooltip :content="$t('table.og')" placement="bottom">
              <Button icon="fork" type="default" @click="open('https://github.com/jae-jae/Userscript-Plus#readme')"></Button>
            </Tooltip>
          </span>
            <Tooltip :content="$t('table.close')" placement="left">
              <Button icon="close-round" type="default" @click="close"></Button>
            </Tooltip>
          </div>
          <transition name="custom-classes-transition" enter-active-class="animated lightSpeedIn" leave-active-class="animated bounceOutRight">
            <div v-show="showBody">
              <Table highlight-row :columns="columns" :data="data"></Table>
              <div class="table-footer"> </div>
            </div>
          </transition>
      </Card>
    </div>
    </transition>
    <div v-show="!showTitle" @mouseover='showTitle = true'>
      <Indicator :count="count"></Indicator>
    </div>
  </div>
</template>

<script>
	/* global Event */
  import Tools from '../common/js/tools'
  import Info from './Info.vue'
  import Indicator from './Indicator.vue'
  export default {
    components: { Info, Indicator },
    mounted: function () {
      this.count = Tools.getCount()
    },
    data: function () {
      return {
        isZH: Tools.isZH(),
        showSearchInput: false,
        searchInput: '',
        showTitle: false,
        showBody: false,
        titleIcon: 'chevron-up',
        count: 0,
        columns: [{
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(Info, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          type: 'index',
          width: 50,
          align: 'center'
        },
        {
          title: this.$t('table.title'),
          key: 'name',
          width: '35%',
          ellipsis: false,
          render: (h, params) => {
            return h('span', {
              attrs: {
                title: params.row.description
              },
              style: {
                cursor: 'pointer'
              },
              on: {
                click: _ => {
                  open(params.row.url)
                }
              }
            }, params.row.name)
          }
        },
        {
          title: this.$t('table.author'),
          render: (h, params) => {
            return h('span', {
              attrs: {
                title: this.$t('table.authorTips', {name: params.row.user.name})
              },
              style: {
                cursor: 'pointer'
              },
              on: {
                click: _ => {
                  open(params.row.user.url)
                }
              }
            }, params.row.user.name)
          }
        },
        {
          title: this.$t('table.dailyInstalls'),
          width: 105,
          key: 'daily_installs',
          sortable: true,
          render: (h, params) => {
            return h('span', {
              style: {
                cursor: 'pointer'
              },
              on: {
                click: _ => {
                  open(`${params.row.url}/feedback`)
                }
              }
            }, params.row.daily_installs)
          }
        },
        {
          title: this.$t('table.updatedTime'),
          key: 'code_updated_at',
          sortable: true,
          render: (h, params) => {
            return h('span', {
              style: {
                cursor: 'pointer'
              },
              on: {
                click: _ => {
                  open(`${params.row.url}/versions`)
                }
              }
            }, Tools.timeagoFormat(params.row.code_updated_at))
          }
        },
        {
          title: this.$t('table.action'),
          width: 100,
          key: 'code_url',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  icon: 'ios-download-outline'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$Message.info(this.$t('table.scriptInstalling'))
                    Tools.installUserJs(params.row.code_url)
                  }
                }
              }, this.$t('table.install'))
            ])
          }
        }
        ],
        originData: [ ],
        data: [ ]
      }
    },
    watch: {
      showBody (val) {
        (val) ? (this.titleIcon = 'chevron-down',Tools.dispatchEvent('max')) : (this.titleIcon = 'chevron-up',Tools.dispatchEvent('min'))
        // Tools.dispatchEvent('resize')
        window.dispatchEvent(new Event('resize'))
      },
      searchInput: function (val) {
        (val) ? (val = val.toLowerCase(),this.data = Tools.searcher(this.originData, val)) : (this.data = this.originData)
      }
    },
    methods: {
      close () {
        Tools.dispatchEvent('close')
      },
      // getData (callback) {
      //   let host = 'pornhub.com'
      //   window.fetch(`https://sleazyfork.org/scripts/by-site/${host}.json`)
      //     .then((r) => {
      //       r.json().then((json) => {
      //         callback(json)
      //       })
      //     })
      // },
      bodySwitch () {
        (!this.data.length && !this.showBody) ? (
          this.$Spin.show(),
          Tools.dispatchEvent('loading'),
          Tools.getData((json) => {
            this.originData = json
            this.data = json
            this.$Spin.hide()
          }) ) : false
          this.showBody = !this.showBody
          new Promise((resolve) => setTimeout(resolve, 500))
          this.showTitle = this.showBody
      },
      open (url) {
        window.open(url)
      }
    }
  }
</script>

<style>
*:not(select) {
  scrollbar-color: #2d8cf0 #ffffff;
}
::-webkit-scrollbar-thumb {
  background: #2d8cf0;
}
::-webkit-scrollbar-track {
  background-color: #ffffff;
}
/* Chrome and derivatives*/
::-webkit-scrollbar {
  max-width: 8px !important;
  max-height: 8px !important;
}
.card-title {
  cursor: pointer;
}
.ivu-card-head {
  line-height: 2 !important;
  min-height: 54px !important;
}
.ivu-table-body {
  height: 400px;
  overflow-x: hidden;
}
.table-footer {
  position: fixed;
  bottom: 0 ;
  padding-left: 10px;
  width: 100%;
  background-color: #fff;
}
.table-footer a {
  color: #ed3f14;
}
/* dark theme */
.card-title {
  color: #ffffff !important;
}
.ivu-card-head {
  border-bottom: 1px solid #ffffff !important;
}
.ivu-tooltip {
  border-color: #ffffff !important;
  border-radius: 4px !important;
  background-color: #ffffff !important;
}
.ivu-btn-icon-only, .ivu-table {
  color: #ffffff !important;
  background-color: #2e323d !important;
}
.ivu-card, .ivu-table td, .ivu-table th {
  background-color: #2e323d !important;
  border-color: #ffffff !important;
}
.ivu-table-row-highlight, .ivu-table-row-hover {
  color: #9cc3e7 !important;
}
</style>
