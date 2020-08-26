<template>
  <q-dialog v-model="model" @hide="closePop" @before-show="searchProduct">
    <q-card v-if="product !== null" class="relative-position" style="width: 100%; border-radius: 0px;">
      <q-btn icon="close" class="absolute-top-right closeIcon" style="z-index: 900" color="white" flat round dense @click="closePop"/>
      <q-card-section class="bg-primary q-py-sm row items-center">
        <div class="row full-width justify-center">
          <div v-if="product" class="text-h6 text-white">{{ product.name }} - {{ product.purveyor_code }}</div>
          <q-skeleton v-else type="text" />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-md">
          <div class="row">
            <div class="column justify-between col-md-6 col-sm-12 col-xs-12">
              <q-carousel v-model="carousel" swipeable animated infinite height="200px" class="q-pl-lg">
                <q-carousel-slide v-if="!product.carousel" :name="0" class="q-pa-none">
                    <q-skeleton square animation="wave" height="200px" style="width: calc(100% - 45px); margin-left: 40px" />
                </q-carousel-slide>
                <q-carousel-slide
                    v-ripple
                    v-for="image in images"
                    :key="image.id"
                    :name="image.id"
                    class="no-wrap no-scroll q-pa-none" >
                    <q-img :src="image.src" class="mobile-only" contain style="height: 200px;"/>
                    <zoom :src="image.src" class="desktop-only" :src-large="image.src" spanClass="squareImage" style="width: 200px; height: 200px"/>
                </q-carousel-slide>

                <template v-slot:control>
                    <q-carousel-control
                        position="top-left"
                        :offset="[0, 0]"
                        class="rounded-borders"
                        :style="`width: 60px; height: 200px; color: purple`">

                        <div v-if="product.skeleton">
                            <q-skeleton v-for="i in [1, 2, 3, 4, 5]" :key="i" tag="div" type="rect" animation="wave" class="q-ma-xs" style="width 50px; height: 35px" />
                        </div>

                        <q-tabs v-model="carousel" vertical active-color="indigo" switch-indicator dense>
                            <q-tab v-for="image in images" :key="image.id" :name="image.id" style="padding: 0px">
                                <q-avatar square size="50px" style="height: 35px" color="white">
                                    <q-img :src="image.src" contain spinner-color="indigo" @load="product.skeleton = false" style="height: 35px;" />
                                </q-avatar>
                            </q-tab>
                        </q-tabs>
                    </q-carousel-control>
                </template>
              </q-carousel>
              <div class="row q-mt-sm q-pa-sm items-center justify-center">
                {{ product.fragrances[0].name }} :
                <q-chip v-for="prop in product.fragrances" square dense :key="prop.id" class="q-pt-xs" outline color="black" text-color="white">
                  {{ prop.value }}
                </q-chip>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12 q-pa-md row content-between">
              <div class="row text-body2 text-bold q-pa-sm">
                {{ product.details }}
              </div>
              <div class="row full-width">
                <q-separator class="q-my-sm"/>
                <div class="row full-width">
                  <div class="col">
                    <div class="row justify-center text-positive text-bold text-subtitle1">R$ {{ product.price_money ? product.price_money : '' }}</div>
                    <div class="row justify-center">Dinheiro</div>
                  </div>
                  <div class="col">
                    <div class="row justify-center text-positive text-bold text-subtitle1">R$ {{ product.price_card ? product.price_card : '' }}</div>
                    <div class="row justify-center">Cartão</div>
                  </div>
                </div>
                <div class="row full-width justify-center q-mt-lg">
                  <div class="col-2">
                    <q-icon name="fab fa-whatsapp" size="20px"/>
                  </div>
                  <div class="q-pl-sm text-bold col-8 text-black" style="display: flex; align-items: center">
                    <a :href="SOCIALMEDIAS.WHATSAPP" target="blank" style="text-decoration: none; color: black">
                      (34) 99680-6896
                    </a>
                  </div>
                </div>
                <div class="row full-width justify-center q-mt-sm">
                  <div class="col-2">
                    <q-icon name="fab fa-instagram" size="20px"/>
                  </div>
                  <div class="q-pl-sm text-bold col-8 text-black" style="display: flex; align-items: center">
                    <a :href="SOCIALMEDIAS.INSTAGRAM" target="blank" style="text-decoration: none; color: black">
                      @sensus.official
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import zoom from './MagnifyingGlass'

import { SOCIALMEDIAS } from '../enumerators/socialMedia.js'

export default {
  name: 'DialogProduct',
  components: {
    zoom
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      default: null
    }
  },
  created () {
    this.model = this.value
  },
  watch: {
    value: function () {
      this.model = this.value
    }
  },
  data () {
    return {
      model: false,
      slide: 1,
      images: [],
      carousel: null,
      SOCIALMEDIAS
    }
  },
  methods: {
    changeDialog (value) {
      this.$emit('input', value)
    },
    closePop () {
      this.$emit('hide')
      this.changeDialog(false)
      this.images = []
      this.carousel = null
    },
    searchProduct () {
      this.product.images.forEach((image) => {
        this.$axios.get('/images', {
          params: {
            id: image.id,
            product: this.product.id,
            size: 512
          }
        }).then((response) => {
          this.images.push({
            src: response.data,
            id: image.id
          })
          if (!this.carousel) {
            this.carousel = image.id
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus">
.squareImage
  width 200px !important
  height 200px !important
</style>
