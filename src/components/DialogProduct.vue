<template>
  <q-dialog v-model="model" @hide="closePop">
    <q-card class="relative-position" style="width: 100%; border-radius: 0px;">
      <q-btn icon="close" class="absolute-top-right closeIcon" style="z-index: 900" color="white" flat round dense @click="closePop"/>
      <q-card-section class="bg-primary q-py-sm row items-center">
        <div class="row full-width justify-center">
          <div class="text-h6 text-white">{{ product.name }} - {{ product.purveyor_code }}</div>
          <!-- <div class="col-2 row text-white justify-end">
            <q-btn icon="close" flat round dense @click="closePop"/>
          </div> -->
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-md">
          <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <q-carousel v-model="product.carousel" swipeable animated infinite height="200px" class="q-pl-lg">
                <q-carousel-slide v-if="!product.carousel" :name="0" class="q-pa-none">
                    <q-skeleton square animation="wave" height="200px" style="width: calc(100% - 45px); margin-left: 40px" />
                </q-carousel-slide>

                <q-carousel-slide
                    v-ripple
                    v-for="image in product.myImages"
                    :key="image.id"
                    :name="image.id"
                    class="no-wrap no-scroll q-pa-none" >
                    <q-img :src="image.src" contain style="height: 200px;"/>
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
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12 q-pa-md row content-between">
              <div class="row text-body2 text-bold">
                {{ product.details }}
              </div>
              <div class="row full-width">
                <q-separator class="q-my-sm"/>
                <div class="row full-width">
                  <div class="col">
                    <div class="row justify-center text-positive text-bold text-subtitle1">R$ {{ product.price_money ? product.price_money : ''}}</div>
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
                    (34) 99680-6896
                  </div>
                </div>
                <div class="row full-width justify-center q-mt-sm">
                  <div class="col-2">
                    <q-icon name="fab fa-instagram" size="20px"/>
                  </div>
                  <div class="q-pl-sm text-bold col-8 text-black" style="display: flex; align-items: center">
                    @sensus.official
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
export default {
  name: 'DialogProduct',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      required: true,
      default: function () {
        return {
          description: '',
          price: {
            money: ''
          }
        }
      }
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
      slide: 1
    }
  },
  methods: {
    changeDialog (value) {
      this.$emit('input', value)
    },
    closePop () {
      this.changeDialog(false)
    }
  }
}
</script>

<style lang="stylus">

</style>
