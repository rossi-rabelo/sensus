<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <div class="row full-width justify-between">
          <q-btn dense flat round icon="menu" @click="left = !left" />
            <!-- <q-avatar>
              <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
            </q-avatar> -->
            <span style="padding-top: 0.3%; cursor: pointer">
              <img src="../statics/logo-header.png" height="80%" alt="">
            </span>
          <div style="width: 30px"></div>
        </div>
      </q-toolbar>

      <q-tabs v-if="false" align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="left" side="left" overlay elevated>
      <div class="bg-yellow fit">
        <div class="sideDrawer fit">
          <div class="rgbaFilter fit">
            <categories/>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import categories from 'components/Categories'
export default {
  components: {
    categories
  },
  data () {
    return {
      left: true
    }
  }
}
</script>

<style lang="stylus">
  .sideDrawer
    background-image url("../statics/bg-side.png")

  .rgbaFilter
    background-color rgba(0,0,0,.3)
</style>
