<template>
  <q-list style="border-radius: 30px;" class="q-pa-md">
    <q-expansion-item
      v-for="category in categories"
      :key="category.name"
      @click="selectCategory(category)"
      :expand-icon-class="category.subCategories.length === 0 ? 'hideExpandIcon' : 'expandIcon' "
      :label="category.name"
      style="border-radius: 30px; color: white"
      class="item-category q-mb-md text-bold text-subtitle1 shadow-1 overflow-hidden"
    >
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
        />
      </q-list>
    </q-expansion-item>
  </q-list>
</template>

<script>
export default {
  name: 'Categories',
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
      ]
    }
  },
  methods: {
    selectCategory (category) {
      if (!category.subCategories || category.subCategories.length === 0) {
        this.$router.push('products')
        console.log('mandar pro vuex -> ', category)
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
</style>
