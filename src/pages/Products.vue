<template>
    <q-page padding class="bg-grey-2">
        <!-- <my-card-product :product="card" @selectProduct="showDialogProduct" /> -->
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
                <my-pagination :pagination.sync="pagination" @changePage="changePage" :numberOfPages="numberOfPages"/>
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

        if (this.$q.localStorage.getItem('lastSearch') && (!this.$store.state.products.categoryId || !this.$store.state.products.subCategoryId || !this.$store.state.products.search)) {
            const lastSearch = this.$q.localStorage.getItem('lastSearch')
            if (lastSearch.category) {
                this.$store.commit('products/changeCategory', lastSearch.category)
            }
            if (lastSearch.subCategory) {
                this.$store.commit('products/changeSubCategory', lastSearch.subCategory)
            }
            if (lastSearch.searchQuery) {
                this.$store.commit('products/changeSearch', lastSearch.searchQuery)
            }
            this.getProducts()
        }
    },

    computed: {
        numberOfPages () {
            return Math.ceil((this.$store.state.products.count) / 12)
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
                    this.$store.commit('products/changeCount', count.value)
                })
                .finally(() => {
                    this.$q.loading.hide()
                })
        },

        showDialogProduct (product) {
            this.$q.loading.show({
                delay: 400
            })
            this.$axios.get('product', {
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

        changePage (page) {
            this.$store.commit('products/changePage', page)
            this.getProducts()
        }
    }
}
</script>

<style lang="stylus">
    .customMargin
        margin 0px 50px 0px 50px
</style>
