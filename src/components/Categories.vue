<template>
  <q-list style="border-radius: 30px;" class="q-pa-md">
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
          <q-btn color="positive" size="sm" icon="fas fa-search" round/>
        </template>
      </q-input>
    </div>
    <q-expansion-item
      v-for="category in categories"
      :key="category.name"
      @click="selectCategory(category)"
      :expand-icon-class="category.subCategories.length === 0 ? 'hideExpandIcon' : 'expandIcon' "
      style="border-radius: 30px; color: white"
      class="item-category q-mb-md text-subtitle1 shadow-1 overflow-hidden"
    >
      <template v-slot:header>
        <div class="categoryName" style="width: 100%; padding-top: 3px">
          {{ category.name }}
        </div>
      </template>
      <q-list style="border-radius: 30px;" v-if="category.subCategories.length > 0">
        <q-expansion-item
          v-for="subCategory in category.subCategories"
          :key="subCategory.name"
          :header-inset-level="1"
          expand-icon-class="hideExpandIcon"
          expand-separator
          class="subList"
          :label="subCategory.name"
          @click="selectCategory(subCategory)"
        >
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
export default {
  name: 'Categories',
  async beforeMount () {
  },
  data () {
    return {
      categories: [
        {
          name: 'Cosméticos',
          subCategories: []
        },
        {
          name: 'Próteses',
          subCategories: [
            {
              name: 'Próteses Masculinas'
            },
            {
              name: 'Próteses Femininas'
            }
          ]
        },
        {
          name: 'Fantasias',
          subCategories: []
        }
      ],
      searchQuery: ''
    }
  },
  methods: {
    selectCategory (category) {
      if (!category.subCategories || category.subCategories.length === 0) {
        this.$router.push('products')
        console.log('mandar pro vuex -> ', category)
      }
    },
    searchProducts (query) {
      console.log('procurar os produtos: ', query)
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
