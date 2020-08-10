<template>
    <q-page padding class="bg-grey-2">
        <!-- <my-card-product :product="card" @selectProduct="showDialogProduct" /> -->
        <q-table
            :data="products"
            :columns="columns"
            row-key="id"
            :pagination.sync="pagination"
            virtual-scroll
            grid>

            <template v-slot:body="product">
                <div class="col-xs-12 col-sm-6 col-md-4 q-my-md q-px-sm">
                    <q-card class="no-border-radius">
                        <q-card-section v-ripple class="q-py-xs q-px-sm">
                            <!-- PROMOTION -->
                            <div class="absolute-top" style="top: -18px" v-if="product.promotion">
                                <q-badge color="secondary" align="top" class="text-style-0 no-border-radius shadow-2" >Promoção</q-badge>
                            </div>

                            <div class="row full-width items-center">
                                <div class="col-grow">
                                    <!-- NAME -->
                                    <div class="full-width text-style-3">
                                        {{ product.name }}
                                    </div>

                                    <!--  PURVEYOR AND CODE -->
                                    <div class="full-width text-style-1 text-grey-9">
                                        {{ product.purveyor + ' - ' + product.purveyor_code }}
                                    </div>
                                </div>

                                <!-- PRICES -->
                                <div class="col-auto text-style-1">
                                    <div class="full-width text-strike text-red" v-if="product.show_old_price">
                                        {{ applyMoneyMask(product.old_price, false) }}
                                    </div>
                                    <div class="full-width">
                                        {{ applyMoneyMask(product.price_money, false) }}
                                        {{ applyMoneyMask(product.price_card, false) }}
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
                    </q-card>
                </div>
            </template>
            <!-- <template v-slot:item="props">
                Aqui vai o card
            </template> -->
            <!-- PAGINATION OF CLIENTS -->
            <!-- <template v-slot:bottom="props">
                <my-pagination :pagination.sync="pagination" :configuration="props"/>
            </template> -->
        </q-table>
        <!-- <my-pagination :pagination="pagination"/> -->
        <!-- <my-dialog-product v-model="dialogProductModel" :product="selectedProduct" /> -->
    </q-page>
</template>

<script>
/* eslint indent: [2, 4] */

// AUXILIAR FUNCTIONS
import { applyMoneyMask } from 'src/functions/number'

// EVENT BUS
import { EventBus } from 'src/functions/event-bus.js'

// COMPONENTS
// import CardProduct from 'components/CardProduct'
// import DialogProduct from 'components/DialogProduct'
// import MyPagination from 'components/MyPagination'

export default {
    name: 'PageProducts',

    // components: {
    //     // 'my-card-product': CardProduct,
    //     'my-dialog-product': DialogProduct,
    //     'my-pagination': MyPagination
    // },

    created () {
        EventBus.$on('update_product', this.getProducts)
    },

    beforeDestroy () {
        EventBus.$off('update_product')
    },

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
            dialogProductModel: false,
            pagination: {
                rowsPerPage: 20,
                page: 1
            },
            products: [],
            columns: [],

            // teste
            productsList: []
        }
    },

    methods: {
        // AXIOS METHODS
        applyMoneyMask,
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
