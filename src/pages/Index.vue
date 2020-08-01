<template>
  <q-page class="flex flex-center">
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
