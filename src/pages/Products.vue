<template>
  <q-page padding class="">
    <card-product
      :product="card"
      @selectProduct="showDialogProduct"
    />
    <dialog-product
      v-model="dialogProductModel"
      :product="selectedProduct"
    />
  </q-page>
</template>

<script>
import CardProduct from 'components/CardProduct'
import DialogProduct from 'components/DialogProduct'
export default {
  components: {
    'card-product': CardProduct,
    'dialog-product': DialogProduct
  },
  name: 'PageProducts',
  data () {
    return {
      card: {
        images: ['https://http2.mlstatic.com/gel-excitante-feminino-gozzy-soft-love-60-ml-D_NQ_NP_672736-MLB26777614962_022018-F.jpg', 'https://http2.mlstatic.com/gel-excitante-feminino-gozzy-soft-love-60-ml-D_NQ_NP_880241-MLB26777614961_022018-F.jpg'],
        name: 'Gozzy, óleo corporal para massagem',
        description: 'Essa é uma descrição teste',
        price: {
          money: '10.99',
          card: '12.99'
        }
      },
      selectedProduct: {},
      dialogProductModel: false
    }
  },
  methods: {
    showDialogProduct (product) {
      this.selectedProduct = product
      this.dialogProductModel = true
    }
  }
}
</script>

<style lang="stylus">
.customMargin
  margin 0px 50px 0px 50px
</style>
