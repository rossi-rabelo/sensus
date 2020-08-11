<template>
    <q-page padding class="bg-grey-2">
        <!-- <my-card-product :product="card" @selectProduct="showDialogProduct" /> -->
        <q-table
            :data="productsList"
            :columns="columns"
            row-key="id"
            :pagination.sync="pagination"
            virtual-scroll
            grid>

            <template v-slot:item="product">
                <my-card-product
                    :product="product.row"
                    @selectProduct="showDialogProduct"
                />
            </template>
            <!-- <template v-slot:item="props">
                Aqui vai o card
            </template> -->
            <!-- PAGINATION OF CLIENTS -->
            <template v-slot:bottom="props">
                <my-pagination :pagination.sync="pagination" :configuration="props"/>
            </template>
        </q-table>
        <!-- <my-pagination :pagination="pagination"/> -->
        <my-dialog-product v-model="dialogProductModel" :product="selectedProduct" />
    </q-page>
</template>

<script>
/* eslint indent: [2, 4] */

// EVENT BUS
import { EventBus } from 'src/functions/event-bus.js'

// COMPONENTS
import CardProduct from 'components/CardProduct'
import DialogProduct from 'components/DialogProduct'
import MyPagination from 'components/MyPagination'

export default {
    name: 'PageProducts',

    components: {
        'my-card-product': CardProduct,
        'my-dialog-product': DialogProduct,
        'my-pagination': MyPagination
    },

    created () {
        EventBus.$on('update_product', this.getProducts)
    },

    beforeDestroy () {
        EventBus.$off('update_product')
    },

    data () {
        return {
            // card: {
            //     images: ['https://http2.mlstatic.com/gel-excitante-feminino-gozzy-soft-love-60-ml-D_NQ_NP_672736-MLB26777614962_022018-F.jpg', 'https://http2.mlstatic.com/gel-excitante-feminino-gozzy-soft-love-60-ml-D_NQ_NP_880241-MLB26777614961_022018-F.jpg'],
            //     name: 'Gozzy, óleo corporal para massagem',
            //     description: 'Essa é uma descrição teste',
            //     price: {
            //         money: '10.99',
            //         card: '12.99'
            //     }
            // },
            selectedProduct: {},
            dialogProductModel: false,
            pagination: {
                rowsPerPage: 12,
                page: 1
            },

            // TABLE COLUMNS CONFIGURATION
            columns: [
                { name: 'name', label: 'Name', field: 'name' }
            ],

            // CARDS LIST
            productsList: []
        }
    },

    methods: {
        // AXIOS METHODS
        getProducts () {
            this.$q.loading.show({
                delay: 400 // ms
            })
            this.$axios.get('products', {
                params: {
                    page: this.$store.state.products.page,
                    epp: this.$store.state.products.epp,
                    category: this.$store.state.products.categoryId,
                    feature: this.$store.state.products.subCategoryId,
                    search: this.$store.state.products.search
                }
            })
                .then((response) => {
                    const products = response.data.products
                    const count = response.data.count

                    const list = []

                    products.forEach(product => {
                        product.myImages = []
                        product.carousel = 0
                        product.skeleton = true

                        product.images.forEach(image => {
                            this.$axios.get('/images', {
                                params: {
                                    id: image.id,
                                    product: image.product_id,
                                    size: '384'
                                }
                            })
                                .then((response) => {
                                    if (!product.carousel) {
                                        product.carousel = image.id
                                    }
                                    product.myImages.push({
                                        src: response.data,
                                        id: image.id
                                    })
                                })
                        })

                        list.push(product)
                    })
                    this.productsList = list
                    this.$store.commit('products/changeCount', count)
                })
                .finally(() => {
                    this.$q.loading.hide()
                })
        },

        showDialogProduct (product) {
            this.$q.loading.show({
                delay: 400 // ms
            })
            this.$axios.get('product', {
                params: {
                    id: product.id
                }
            }).then((response) => {
                this.selectedProduct = response.data.product
                this.selectedProduct.myImages = []
                this.selectedProduct.images.forEach((image) => {
                    this.$axios.get('/images', {
                        params: {
                            id: image.id,
                            product: this.selectedProduct.id,
                            size: 512
                        }
                    }).then((response) => {
                        this.selectedProduct.myImages.push({
                            src: response.data,
                            id: image.id
                        })
                        if (!this.selectedProduct.carousel) {
                            this.carousel = image.id
                        }
                        this.dialogProductModel = true
                    })
                })
                console.log(this.selectedProduct)
            }).finally(() => {
                this.$q.loading.hide()
            })
        }
    }
}
</script>

<style lang="stylus">
    .customMargin
        margin 0px 50px 0px 50px
</style>
