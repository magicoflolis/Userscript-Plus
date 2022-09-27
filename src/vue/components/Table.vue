<template>
  <div>
    <div>
    <Card :bordered="false">
      <div slot="title" class="card-title">
        <span v-if="!showSearchInput">
          <i18n path="table.tips" tag="span">
            <template v-slot:count>
              <Badge :count="count"></Badge>
              </template>
          </i18n> - Userscript+
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
            <Button type="default" @click="open('https://github.com/jae-jae/Userscript-Plus')" style="background-color: #2e323d">
              <Icon type="fork" color="white"></Icon>
            </Button>
          </Tooltip>
        </span>
      </div>
      <div>
        <Table highlight-row height="460" :columns="columns" :data="data"></Table>
        <div class="table-footer"></div>
      </div>
    </Card>
    </div>
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
          width: 100,
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
                  click: _ => {
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
      searchInput: function (val) {
        (val) ? (val = val.toLowerCase(),this.data = Tools.searcher(this.originData, val)) : (this.data = this.originData);
      }
    },
    methods: {
      open (url) {
        document.open(url,'', 'noopener=true')
      }
    }
  }
</script>
