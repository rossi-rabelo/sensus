<template>
  <q-card class="my-card" style="cursor: pointer" @click="selectProduct">
    <q-img
      :src="product.images[0]"
      basic
    >
      <div class="absolute-bottom text-h6">
        {{ product.name }}
      </div>
    </q-img>

    <q-card-section>
      <div class="row full-width">
        <div class="col">
          <div class="row justify-center text-positive text-bold text-subtitle1">R$ {{ product.price.money }}</div>
          <div class="row justify-center">Dinheiro</div>
        </div>
        <div class="col">
          <div class="row justify-center text-positive text-bold text-subtitle1">R$ {{ product.price.card }}</div>
          <div class="row justify-center">Cartão</div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
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
</style>
