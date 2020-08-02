<template>
  <q-dialog v-model="model" @hide="closePop">
    <q-card class="relative-position" style="width: 100%; border-radius: 0px;">
      <q-btn icon="close" class="absolute-top-right closeIcon" style="z-index: 900" color="white" flat round dense @click="closePop"/>
      <q-card-section class="bg-primary q-py-sm row items-center">
        <div class="row full-width justify-center">
          <div class="text-h6 text-white">{{ product.name }}</div>
          <!-- <div class="col-2 row text-white justify-end">
            <q-btn icon="close" flat round dense @click="closePop"/>
          </div> -->
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-md">
          <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <q-carousel
                swipeable
                animated
                v-model="slide"
                autoplay
                thumbnails
                infinite
              >
              <q-carousel-slide
                v-for="(image, index) in product.images"
                :key="index"
                :name="index"
                :autoplay="true"
                :img-src="image" />
              </q-carousel>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12 q-pa-md row content-between">
              <div class="row text-body1 text-bold">
                {{ product.description }}
              </div>
              <div class="row full-width">
                <q-separator class="q-my-sm"/>
                <div class="row full-width">
                  <div class="col">
                    <div class="row justify-center text-positive text-bold text-subtitle1">R$ {{ product.price ? product.price.money : ''}}</div>
                    <div class="row justify-center">Dinheiro</div>
                  </div>
                  <div class="col">
                    <div class="row justify-center text-positive text-bold text-subtitle1">R$ {{ product.price ? product.price.card : '' }}</div>
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
