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
                    <div class="img-magnifier-container" @mouseover="magnify(1.3)" @mouseleave="hideGlass" style="height: 200px; width: 200px;">
                      <img ref="image" :src="image.src" id="img" style="height: 200px; width: 200px; object-fit: contain">
                    </div>
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
                <!-- Preço normal (sem promoção) -->
                <div v-if="!product.promotion" class="row full-width">
                  <div class="col">
                    <div class="row justify-center text-positive text-bold text-subtitle1">R$ {{ product.price_money ? product.price_money : '' }}</div>
                    <div class="row justify-center">Dinheiro</div>
                  </div>
                  <div class="col">
                    <div class="row justify-center text-positive text-bold text-subtitle1">R$ {{ product.price_card ? product.price_card : '' }}</div>
                    <div class="row justify-center">Cartão</div>
                  </div>
                </div>
                <!-- Preço Promocional -->
                <div v-else class="row full-width justify-start" style="position: relative">
                  <div>
                    <span>De: </span>
                    <div style="display: inline" class="row justify-center text-grey-13 overline text-bold text-subtitle2">R$ {{ product.old_price_card ? product.old_price_card : '' }}</div>
                  </div>
                  <div class="q-mt-sm">
                    <span>Por: </span>
                    <div style="display: inline" class="row justify-center text-primary text-bold text-h5">R$ {{ product.price_card ? product.price_card : '' }}</div>
                  </div>
                  <div v-if="product && product.discount" class="discount-dialog">
                    -{{ product.discount }}%
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
/* eslint-disable */
import { SOCIALMEDIAS } from '../enumerators/socialMedia.js'

export default {
  name: 'DialogProduct',
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
      SOCIALMEDIAS,
      img: null,
      glass: null,
      w: null,
      h: null,
      bw: null,
      zoom: null
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
    },
    magnify(zoom) {
      this.zoom = zoom
      this.img = document.getElementById('img');
      /*create magnifier glass:*/
      if (!document.getElementById('glass')) {
        this.glass = document.createElement("DIV");
        this.glass.setAttribute("class", "img-magnifier-glass");
        this.glass.setAttribute('id', 'glass');
      }
      this.glass.setAttribute('style', 'opacity: 1')
      /*insert magnifier glass:*/
      this.img.parentElement.insertBefore(this.glass, this.img);
      /*set background properties for the magnifier glass:*/
      this.glass.style.backgroundImage = "url('" + this.img.src + "')";
      this.glass.style.backgroundRepeat = "no-repeat";
      this.glass.style.backgroundSize = (this.img.width * zoom) + "px " + (this.img.height * zoom) + "px";
      this.bw = 3;
      this.w = this.glass.offsetWidth / 2;
      this.h = this.glass.offsetHeight / 2;
      /*execute a function when someone moves the magnifier glass over the image:*/
      this.glass.addEventListener("mousemove", this.moveMagnifier);
      this.img.addEventListener("mousemove", this.moveMagnifier);
      /*and also for touch screens:*/
      this.glass.addEventListener("touchmove", this.moveMagnifier);
      this.img.addEventListener("touchmove", this.moveMagnifier);
    },
    moveMagnifier(e) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = this.getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /*prevent the magnifier glass from being positioned outside the image:*/
      if (x > img.width - (this.w / this.zoom)) {x = img.width - (this.w / this.zoom);}
      if (x < this.w / this.zoom) {x = this.w / this.zoom;}
      if (y > img.height - (this.h / this.zoom)) {y = img.height - (this.h / this.zoom);}
      if (y < this.h / this.zoom) {y = this.h / this.zoom;}
      /*set the position of the magnifier glass:*/
      this.glass.style.left = (x - this.w) + "px";
      this.glass.style.top = (y - this.h) + "px";
      /*display what the magnifier glass "sees":*/
      this.glass.style.backgroundPosition = "-" + ((x * this.zoom) - this.w + this.bw) + "px -" + ((y * this.zoom) - this.h + this.bw) + "px";
    },
    getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    },
    hideGlass () {
      this.glass.setAttribute('style', 'opacity: 0')
    }
  }
}
</script>

<style lang="stylus">
.squareImage
  width 200px !important
  height 200px !important

* {box-sizing: border-box;}

.img-magnifier-container
  position relative

.discount-dialog
  color white
  background-image url('../statics/stamp.png')
  background-size contain
  background-repeat no-repeat
  background-position center
  width fit-content
  position absolute
  font-weight bold
  padding 12%
  top 0%
  left 73%
  z-index 1
  border-radius 50%
  transform: rotate(-18deg);

</style>

<style lang="scss">
  .img-magnifier-glass {
    position: absolute;
    opacity: 0;
    border: 2px solid #000;
    border-radius: 50%;
    cursor: none;
    /*Set the size of the magnifier glass:*/
    width: 100px;
    height: 100px;
  }
</style>