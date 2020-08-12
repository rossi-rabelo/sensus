<template>
  <q-page class="flex flex-center bg-grey-2">
    <div>
      <transition name="fade">
        <img
          v-if="show"
          alt="Logo Loja"
          src="../statics/logo-center.png"
          width="100%"
        >
      </transition>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  mounted () {
    this.show = true
  },
  created () {
    if (this.$q.localStorage.getItem('lastSearch')) {
      this.$q.localStorage.remove('lastSearch')
    }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<style lang="stylus">
.fade-enter-active, .fade-leave-active
  transition opacity 3.5s

.fade-enter, .fade-leave-to
  opacity 0
</style>
