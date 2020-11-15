<template>
  <div v-if="activate" class="full-width">
    <q-img
      :src="imagePath"
    />
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    imagePath: {
      type: String,
      default: ''
    },
    activate: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    imagePath: () => {
      console.log('mudou')
    }
  },
  data () {
    return {}
  }
}
</script>
