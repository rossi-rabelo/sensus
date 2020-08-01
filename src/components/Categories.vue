<template>
  <q-list class="">
    <q-expansion-item
      v-for="category in categories"
      :key="category.name"
      @click="selectCategory(category)"
      :expand-icon-class="category.subCategories.length === 0 ? 'hideExpandIcon' : '' "
      :label="category.name"
    >
      <q-list v-if="category.subCategories.length > 0" separator>
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
        console.log('mandar pro vuex -> ', category)
      }
    }
  }
}
</script>

<style lang="stylus">
  .hideExpandIcon
    display none

  .subList
    background rgba(87,0,87,.3)
</style>
