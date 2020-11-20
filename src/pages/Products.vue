<template>
    <div style="background-color: #10050f">
        <!-- <my-banner
            :imagePath="getBanner()"
            :activate="true"
            class="desktop-only"
        />
        <my-banner
            :imagePath="getBannerMobile()"
            :activate="true"
            class="mobile-only"
        /> -->
        <img class="full-width desktop-only" src="../statics/generic/desktop/black_friday_generic.png" alt="">
        <img class="full-width mobile-only" src="../statics/generic/mobile/black_friday_generic_mobile.png" alt="">
        <q-page padding class="page">
            <q-table
                :data="productsList"
                :columns="columns"
                row-key="id"
                :pagination="pagination"
                virtual-scroll
                grid
            >

                <template v-slot:item="product">
                    <my-card-product
                        :product="product.row"
                        @selectProduct="showDialogProduct"
                    />
                </template>
                <!-- PAGINATION OF CLIENTS -->
                <template v-slot:bottom>
                    <my-pagination :pagination.sync="paginationBottomSlot" @changePage="changePage" :numberOfPages="numberOfPages"/>
                </template>
            </q-table>
            <!-- <my-pagination :pagination="pagination"/> -->
            <my-dialog-product v-model="dialogProductModel" :product="selectedProduct" @hide="changeURL"/>
        </q-page>
    </div>
</template>

<script>
/* eslint indent: [2, 4] */

// EVENT BUS
import { EventBus } from 'src/functions/event-bus.js'

// COMPONENTS
import CardProduct from 'components/CardProduct'
import DialogProduct from 'components/DialogProduct'
import MyPagination from 'components/MyPagination'

// ENUMERATORS
import { ROUTES } from 'src/enumerators/routes'
// import Banner from 'src/components/Banner.vue'

export default {
    name: 'PageProducts',

    components: {
        'my-card-product': CardProduct,
        'my-dialog-product': DialogProduct,
        'my-pagination': MyPagination
    },

    created () {
        EventBus.$on('update_product', this.getProducts)
        if (this.routeName && this.routeParams) {
            if (this.routeName === ROUTES.CATEGORY) {
                if (this.routeParams) {
                    this.$store.commit('products/changeCategory', this.routeParams.id)
                }
            }
            if (this.routeName === ROUTES.SUBCATEGORY) {
                if (this.routeParams) {
                    this.$store.commit('products/changeSubCategory', this.routeParams.id)
                }
            }
            if (this.routeName === ROUTES.SEARCH) {
                if (this.routeParams) {
                    this.$store.commit('products/changeSearch', this.routeParams.query)
                }
            }
            if (this.routeParams && this.routeParams.page) {
                this.$store.commit('products/changePage', this.routeParams.page)
                this.paginationBottomSlot.page = parseInt(this.routeParams.page)
            }
            this.getProducts()
        }
        if (this.$route.query && this.$route.query.productId) {
            this.showDialogProduct({ id: this.$route.query.productId }, true)
        }
    },

    computed: {
        numberOfPages () {
            return Math.ceil((this.$store.state.products.count) / 12)
        },
        routeName () {
            return this.$route.name
        },
        routeParams () {
            return this.$route.params
        }
    },

    beforeDestroy () {
        EventBus.$off('update_product')
    },

    data () {
        return {
            selectedProduct: null,
            dialogProductModel: false,
            pagination: {
                rowsPerPage: 12,
                page: 1
            },
            paginationBottomSlot: {
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
        // BANNER METHODS
        getBanner () {
            return 'banners/generic/desktop/black_friday_generic.png'
        },
        getBannerMobile () {
            return 'banners/generic/mobile/black_friday_generic_mobile.png'
        },
        // AXIOS METHODS
        getProducts () {
            this.paginationBottomSlot.page = parseInt(this.$store.state.products.page)
            this.$q.loading.show({
                delay: 400 // ms
            })
            this.$axios.get('products/black_friday', {
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
                    this.$store.commit('products/changeCount', count.value)
                })
                .finally(() => {
                    this.$q.loading.hide()
                })
        },

        showDialogProduct (product, routeForce = false) {
            if (!routeForce) {
                // this.$router.replace({ name: this.routeName, params: this.$route.params, query: { productId: product.id } })
                this.setQueryStringParameter('productId', product.id)
            }
            this.searchForProduct(product)
        },

        searchForProduct (product) {
            this.$q.loading.show({
                delay: 400
            })
            this.$axios.get('product/black_friday', {
                params: {
                    id: product.id
                }
            }).then((response) => {
                this.selectedProduct = response.data.product
                this.dialogProductModel = true
            }).finally(() => {
                this.$q.loading.hide()
            })
        },

        changeURL () {
            this.addHashToLocation()
        },

        changePage (page) {
            this.$store.commit('products/changePage', page)
            let params = {}
            params = this.routeParams
            params.page = page
            this.$router.replace({ name: this.routeName, params: params })
            this.getProducts()
        },
        addHashToLocation (params) {
            history.pushState(
                {},
                null,
                `#${this.$route.path}`
            )
        },
        setQueryStringParameter (name, value) {
            const params = new URLSearchParams(window.location.search)
            params.set(name, value)
            window.history.replaceState({}, '', decodeURIComponent(`#${this.$route.path}?${params}`))
        }
    }
}
</script>

<style lang="stylus">
    .customMargin
        margin 0px 50px 0px 50px

    .page
        background-color #10050f !important
        overflow-x hidden
</style>
