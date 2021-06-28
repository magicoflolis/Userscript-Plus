<template>
  <div>
    <transition name="custom-classes-transition" enter-active-class="animated lightSpeedIn">
      <div v-show="showTitle">
      <Card :padding="0">
          <div slot="title" class="card-title">
            <Icon :type="titleIcon"></Icon>
            <span v-if="!showSearchInput" @click="bodySwitch">
              <i18n path="table.tips" tag="span">
                <Badge place="count" :count="count" style="padding:0px 5px;"></Badge>
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
            <!-- <Tooltip :content="$t('table.donate')" placement="bottom">
              <Button type="default" @click="showConfig = true">
                <Icon type="card"></Icon>
              </Button>
            </Tooltip> -->
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
      <!-- <Modal v-model="showConfig" width="400">
        <CheckboxGroup>
          <Checkbox label="light" disabled>
            <span>Enable light theme</span>
          </Checkbox>
          <Checkbox label="sleazyfork" v-model="enableSleazy">
            <span>Enable "Greasyfork Search with Sleazyfork Results include"</span>
          </Checkbox>
        </CheckboxGroup>
        
      <div slot="footer">
        <Button type="info" size="large" long @click="showConfig=false">{{$t('table.close')}}</Button>
      </div>
    </Modal> -->
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
      // this.enableSleazy = Tools.getSleazy()
    },
    data: function () {
      return {
        isZH: Tools.isZH(),
        showSearchInput: false,
        searchInput: '',
        showTitle: false,
        showBody: false,
        enableSleazy: false,
        titleIcon: 'chevron-up',
        count: 0,
        showConfig: false,
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
        window.dispatchEvent(new Event('resize'))
      },
      // enableSleazy (val) {
      //   Tools.toggleSleazy(val)
      // },
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
