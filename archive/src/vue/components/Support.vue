<template>
    <div class="support-box" v-if="showSupportBox">
        <Carousel v-model="curIndex" autoplay loop dots="none" arrow="never" :autoplay-speed="10000">
            <a v-for="item in goods" :key="item.url" :href="item.url" target="_blank">
                <CarouselItem class="carouse-item">
                    {{item.title}}
                </CarouselItem>
            </a>
        </Carousel>
    </div>
</template>

<script>
import Tools from '../common/js/tools'
export default {
  data () {
    return {
      curIndex: 0,
      goods: []
    }
  },
  mounted () {
    this.getData()
    this.hide()
  },
  computed: {
    showSupportBox () {
      return this.goods.length > 0 && Tools.isZH()
    }
  },
  methods: {
    getData () {
      let api = 'https://gist.githubusercontent.com/jae-jae/addb107b30b12b5d54d2f062bf46e80d/raw/support-userscript-plus.json'
      window.fetch(api)
                .then((r) => {
                  return r.json()
                }).then((json) => {
                  this.goods = json
                  this.curIndex = this.random(0, json.length - 1)
                })
    },
    random (min, max) {
      return (Math.random() * (max - min + 1) | 0) + min
    },
    hide () {
      setTimeout(() => {
        this.goods = []
      }, 10000)
    }
  }
}
</script>
