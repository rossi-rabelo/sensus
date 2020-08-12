<template>
  <q-list style="border-radius: 30px;" class="q-pa-md">
        <!-- SEARCH -->
        <div class="row full-width q-mb-md">
            <q-input
                rounded
                outlined
                class="full-width"
                dense
                bg-color="white"
                v-model="searchQuery"
                label="Pesquisar Produto"
            >
                <template v-slot:append>
                    <q-btn color="positive" :disable="searchQuery.length === 0" size="sm" @click="searchProducts" icon="fas fa-search" round/>
                </template>
            </q-input>
        </div>

        <!-- CATEGORIES -->
        <q-expansion-item
            v-for="category in categories"
            :key="category.name"
            dense
            @click="selectCategory(category)"
            :expand-icon-class="(category.features && category.features.length === 0) ? 'hideExpandIcon' : 'expandIcon' "
            style="border-radius: 20px; color: white"
            class="item-category q-mb-md text-subtitle1 shadow-1 overflow-hidden" >

            <!-- HEADER -->
            <template v-slot:header>
                <div class="categoryName" style="width: 100%; padding: 5px;">
                    {{ category.name }}
                </div>
            </template>

            <!-- SUBCATEGORIES -->
            <q-list style="border-radius: 30px;" v-if="(category.features && category.features.length) > 0">
                <q-expansion-item
                    :header-inset-level="1"
                    expand-icon-class="hideExpandIcon"
                    expand-separator
                    class="subList"
                    label="Todos"
                    @click="selectCategory(category, true)" >

                    <template v-slot:header>
                        <div class="categoryName" style="width: 100%; padding-top: 3px">
                            Todos
                        </div>
                    </template>
                </q-expansion-item>
                <q-expansion-item
                    v-for="subCategory in category.features"
                    :key="subCategory.name"
                    :header-inset-level="1"
                    expand-icon-class="hideExpandIcon"
                    expand-separator
                    class="subList"
                    :label="subCategory.name"
                    @click="selectSubCategory(subCategory)" >

                    <template v-slot:header>
                        <div class="categoryName" style="width: 100%; padding-top: 3px">
                            {{ subCategory.name }}
                        </div>
                    </template>
                </q-expansion-item>
            </q-list>
        </q-expansion-item>
  </q-list>
</template>

<script>
/* eslint indent: [2, 4] */

// ENUMERATORS
import { ROUTES } from 'src/enumerators/routes'

export default {
    name: 'Categories',

    async created () {
        this.$q.loading.show({
            delay: 400 // ms
        })
        const response = await this.$axios.get('/categories')
        this.categories = response.data.categories
        this.$q.loading.hide()
    },

    data () {
        return {
            categories: [],
            searchQuery: ''
        }
    },

    methods: {
        selectCategory (category, force) {
            // EMIT IF ONLY IS ROOT CATEGORY
            if (force || (!category.features || (category.features && category.features.length === 0))) {
                // ENVIAR VUEX
                this.$store.commit('products/changeCategory', category.id)
                this.checkPlatform()
                // GO TO PRODUCTS PAGE
                this.$q.localStorage.set('lastSearch', {
                    category: category.id
                })
                if (this.$route.name !== ROUTES.PRODUCTS) {
                    this.$router.push('products')
                }
            }
        },

        selectSubCategory (subCategory) {
            this.$store.commit('products/changeSubCategory', subCategory.id)
            this.$q.localStorage.set('lastSearch', {
                subCategory: subCategory.id
            })
            this.checkPlatform()
            if (this.$route.name !== ROUTES.PRODUCTS) {
                this.$router.push('products')
            }
        },

        searchProducts () {
            this.$store.commit('products/changeSearch', this.searchQuery)
            this.$q.localStorage.set('lastSearch', {
                searchQuery: this.searchQuery
            })
            this.checkPlatform()
            if (this.$route.name !== ROUTES.PRODUCTS) {
                this.$router.push('products')
            }
        },
        checkPlatform () {
            if (this.$q.platform.is.mobile) {
                this.$emit('closeDrawer')
            }
        }
    }
}
</script>

<style lang="stylus">
    .hideExpandIcon
        display none

    .item-category
        background-color rgba(87,0,87,.93)

    .expandIcon
        color white

    .categoryName
        font-size 13px
</style>
