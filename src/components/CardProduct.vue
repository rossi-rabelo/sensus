<template>
  <div class="my-card col-xs-12 col-sm-6 col-md-4 q-my-md q-px-sm">
        <q-card class="no-border-radius full-height" style="cursor: pointer">
            <q-card-section @click="selectProduct()" v-ripple class="q-py-xs q-px-sm">
                <!-- PROMOTION -->
                <div class="absolute-top" style="top: -18px" v-if="product.promotion && !(product.old_price_card === product.price_card)">
                    <q-badge align="top" class="custom-badge text-style-0 no-border-radius shadow-2" >Promoção</q-badge>
                </div>
                <div class="row full-width items-center" style="position: relative">
                    <div class="col-grow">
                        <!-- NAME -->
                        <div class="full-width text-style-3">
                            {{ product.name }}
                        </div>

                        <!--  PURVEYOR AND CODE -->
                        <div class="full-width text-style-1 text-grey-9">
                            {{ product.purveyor + ' - ' + product.purveyor_code }}
                        </div>
                        <div v-if="product && product.discount" class="discount">
                            -{{ product.discount }}%
                        </div>
                    </div>

                    <!-- PRICES -->
                    <div class="col-auto text-style-1">
                        <div class="full-width text-strike text-red" v-if="product.show_old_price">
                            {{ applyMoneyMask(product.old_price, false) }}
                        </div>
                    </div>
                </div>

            </q-card-section>

            <!-- IMAGES -->
            <q-carousel v-model="product.carousel" swipeable animated infinite height="200px" class="q-pl-lg">
                <q-carousel-slide v-if="!product.carousel" :name="0" class="q-pa-none">
                    <q-skeleton square animation="wave" height="200px" style="width: calc(100% - 45px); margin-left: 40px" />
                </q-carousel-slide>

                <q-carousel-slide
                    v-ripple
                    v-for="image in product.myImages"
                    :key="image.id"
                    :name="image.id"
                    class="no-wrap no-scroll q-pa-none">
                    <q-img @click="selectProduct()" :src="image.src" contain style="height: 200px; cursor: pointer"/>
                </q-carousel-slide>

                <template v-slot:control>
                    <q-carousel-control
                        position="top-left"
                        :offset="[0, 0]"
                        class="rounded-borders"
                        :style="`width: 60px; height: 200px`">

                        <div v-if="product.skeleton">
                            <q-skeleton v-for="i in [1, 2, 3, 4, 5]" :key="i" tag="div" type="rect" animation="wave" class="q-ma-xs" style="width 50px; height: 35px" />
                        </div>

                        <q-tabs v-model="product.carousel" vertical active-color="indigo" switch-indicator dense>
                            <q-tab v-for="image in product.myImages" :key="image.id" :name="image.id" style="padding: 0px">
                                <q-avatar square size="50px" style="height: 35px" color="white">
                                    <q-img :src="image.src" contain spinner-color="indigo" @load="product.skeleton = false" style="height: 35px;" />
                                </q-avatar>
                            </q-tab>
                        </q-tabs>
                    </q-carousel-control>
                </template>
            </q-carousel>
            <q-card-section>
                <div v-if="!product.promotion || (product.old_price_card === product.price_card)" class="row full-width justify-between">
                    <div class="col row text-bold justify-center">
                        <span class="text-positive q-mr-xs">Dinheiro:</span>
                        <span>
                            {{ applyMoneyMask(product.price_money, false) }}
                        </span>
                    </div>
                    <div class="col row text-bold justify-center">
                        <span class="text-positive q-mr-xs">Cartão:</span>
                        <span>
                            {{ applyMoneyMask(product.price_card, false) }}
                        </span>
                    </div>
                </div>
                <div v-else class="row full-width justify-between">
                  <div class="col row text-bold justify-center">
                      <span class="align-text-center text-positive q-mr-xs">De:</span>
                      <span class="align-text-center text-grey-13 overline">
                          {{ applyMoneyMask(product.old_price_card, false) }}
                      </span>
                  </div>
                  <div class="col row text-bold justify-center">
                      <span class="align-text-center text-positive q-mr-xs">Por:</span>
                      <span class="align-text-center text-h6 text-primary">
                          {{ applyMoneyMask(product.price_card, false) }}
                      </span>
                  </div>
              </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
// AUXILIAR FUNCTIONS
import { applyMoneyMask } from 'src/functions/number'

export default {
  name: 'CardProduct',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    applyMoneyMask,
    selectProduct () {
      this.$emit('selectProduct', this.product)
    }
  }
}
</script>

<style lang="stylus">
.my-card
  width 100%
  max-width 250px

.discount
  color white
  background-image url('../statics/stamp.png')
  background-size contain
  background-repeat no-repeat
  background-position center
  width fit-content
  position absolute
  font-weight bold
  padding 7%
  top 45%
  left 83%
  z-index 1
  border-radius 50%
  transform: rotate(-18deg);

.overline
  text-decoration line-through

.align-text-center
  display flex
  flex-flow column
  justify-content center

.custom-badge
    background-color #f8bb20
    color #10050f
    font-weight bolder
</style>

<style lang="stylus" scoped>

</style>
