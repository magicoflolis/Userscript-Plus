<template>
    <div>
        <transition name="custom-classes-transition" enter-active-class="animated lightSpeedIn">
            <div>
            <Card :bordered="false" style="width:100%;height:100%;padding:0px">
                <div slot="title" class="card-title">
                    <span v-if="!showSearchInput">
                      <i18n path="table.tips" tag="span">
                        <template v-slot:count>
                          <Badge :count="count" style="padding:0px 5px;"></Badge>
                          </template>
                      </i18n>
                      - Userscript+
                    </span>
                    <Input v-else v-model="searchInput"  icon="android-search" placeholder="Enter title、description、author..." style="width: 50%"/>
                </div>
                <div slot="extra">
                <span>
                  <Tooltip :content="$t('table.search')" placement="bottom">
                        <Button type="default" @click="showSearchInput = !showSearchInput" style="background-color: #2e323d">
                            <Icon type="android-search" color="white"></Icon>
                        </Button>
                    </Tooltip>

                    <Tooltip :content="$t('table.issue')" placement="bottom">
                        <Button type="default" @click="open('https://github.com/magicoflolis/Userscript-Plus/issues/new')" style="background-color: #2e323d">
                            <Icon type="bug" color="white"></Icon>
                        </Button>
                    </Tooltip>

                    <Tooltip :content="$t('table.home')" placement="bottom">
                        <Button type="default" @click="open('https://github.com/magicoflolis/Userscript-Plus')" style="background-color: #2e323d">
                            <Icon type="home" color="white"></Icon>
                        </Button>
                    </Tooltip>

                    <Tooltip :content="$t('table.og')" placement="bottom">
                        <Button type="default" @click="open('https://github.com/jae-jae/Userscript-Plus#readme')" style="background-color: #2e323d">
                            <Icon type="fork" color="white"></Icon>
                        </Button>
                    </Tooltip>

                </span>

                </div>
                <transition name="custom-classes-transition" enter-active-class="animated lightSpeedIn" leave-active-class="animated bounceOutRight">
                    <div>
                        <Table highlight-row :columns="columns" :data="data"></Table>
                        <div class="table-footer">
                        </div>
                    </div>
                </transition>
            </Card>
        </div>
        </transition>

    </div>


</template>
<script>
    import Tools from '../common/js/tools'
    import Info from './Info.vue'
    import Indicator from './Indicator.vue'
    export default {
      components: { Info, Indicator },
      mounted: function () {
        this.$Spin.show()
        Tools.getData((json) => {
          this.data = json
          this.originData = json
          this.count = this.data.length
          this.$Spin.hide()
          this.showBody = !this.showBody
        })
      },
      data: function () {
        return {
          isZH: Tools.isZH(),
          showSearchInput: false,
          searchInput: '',
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
                    window.open(params.row.url)
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
                    window.open(params.row.user.url)
                  }
                }
              }, params.row.user.name)
            }
          },
          {
            title: this.$t('table.dailyInstalls'),
            width: 105,
            key: 'daily_installs',
            sortable: true
          },
          {
            title: this.$t('table.updatedTime'),
            width: 105,
            key: 'code_updated_at',
            render: (h, params) => {
              return h('span', Tools.timeagoFormat(params.row.code_updated_at))
            },
            sortable: true
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
                      // Tools.installUserJs(params.row.code_url)
                      let evt = parent.document.createEvent('MouseEvents')
                      evt.initEvent('click', true, true)
                      let link = parent.document.createElement('a')
                      link.href = params.row.code_url
                      link.dispatchEvent(evt)
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
        searchInput: function (val) {
          if (val) {
            val = val.toLowerCase()
            this.data = Tools.searcher(this.originData, val)
          } else {
            this.data = this.originData
          }
        }
      },
      methods: {
        getData (callback) {
          let host = 'pornhub.com'
          window.fetch(`https://greasyfork.org/scripts/by-site/${host}.json`).then((r) => {
            r.json().then((json) => {
              callback(json)
            })
          })
        },
        open (url) {
          window.open(url)
        }
      }
    }
</script>

<style>
.card-title {
  color: #ffffff !important;
  cursor: pointer;
}
.ivu-card-extra {
  top: 8px !important;
}
.ivu-card-head {
  padding: 2.5% 16px !important;
  border-bottom: 1px solid #ffffff !important;
}
.ivu-table-body {
  height: 418px;
  overflow-x: hidden;
  scrollbar-width: thin !important;
}
.table-footer {
  position: fixed;
  bottom: 0 ;
  padding-left: 10px;
  width: 100%;
  background-color: #ffffff;
}
.table-footer a {
  color: #ed3f14;
}
.ivu-tooltip {
  border-color: #ffffff !important;
  border-radius: 4px !important;
  background-color: #ffffff !important;
}
.ivu-table {
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