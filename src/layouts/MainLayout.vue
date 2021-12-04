<template>
    <q-layout view="lHh LpR lFf">
        <!-- HEADER -->
        <q-header bordered class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <div class="row full-width justify-between items-center">
                    <!-- OPEN MENU -->
                    <div class="col-3 desktop-only">
                        <q-btn dense flat no-caps rounded icon="menu" @click="left = !left" >
                            <span class="q-mt-xs text-subtitle1" style="margin-left: 3px">
                              Categorias
                            </span>
                        </q-btn>
                    </div>
                    <div class="mobile-only" style="width: 30px">
                        <q-btn dense flat rounded icon="menu" @click="left = !left" />
                    </div>

                    <!-- LOGO -->
                    <!-- DESKTOP -->
                    <div class="col-auto desktop-only" style="padding-top: 0.5%; cursor: pointer" @click="goToHome">
                        <img class="img-header-desk" src="../statics/logo-header.png" alt="">
                    </div>

                    <!-- MOBILE -->
                    <div class="col-auto mobile-only" style="margin-top: 5px; cursor: pointer" @click="goToHome">
                        <img class="img-header-mobile" src="../statics/logo-header.png" height="80%" alt="">
                    </div>

                    <!-- PADDING RIGHT -->
                    <div class="col-3 desktop-only"></div>
                    <div class="mobile-only" style="width: 30px"></div>
                </div>
            </q-toolbar>
        </q-header>

        <!-- DRAWER -->
        <q-drawer v-model="left" side="left">
            <div class="bg-primary fit">
                <div class="sideDrawer no-scroll fit">
                    <div class="scroll fit drawer" style="overflow: hidden">
                        <q-scroll-area class="fit">
                            <my-categories @closeDrawer="closeDrawer"/>
                        </q-scroll-area>
                    </div>
                </div>
            </div>
        </q-drawer>

        <!-- CONTENT -->
        <q-page-container style="background-color: #10050f">
            <router-view/>
        </q-page-container>
    </q-layout>
</template>

<script>
/* eslint indent: [2, 4] */

// ENUMERATORS
import { ROUTES } from 'src/enumerators/routes'

import { SOCIALMEDIAS } from 'src/enumerators/socialMedia.js'

// COMPONENTS
import categories from 'components/Categories'

export default {
    components: {
        'my-categories': categories
    },

    created () {
        if (this.$route.name === ROUTES.HOME) {
            setTimeout(() => {
                this.left = true
            }, 1000)
        }
    },

    watch: {
        routeName: function () {
            if (this.routeName === ROUTES.HOME) {
                setTimeout(() => {
                    this.left = true
                }, 1000)
            }
        }
    },

    computed: {
        routeName: function () {
            return this.$route.name
        }
    },

    data () {
        return {
            left: false,
            socialMedia: SOCIALMEDIAS
        }
    },

    methods: {
        // UTILITY METHODS
        closeDrawer () {
            if (this.left) {
                this.left = false
            }
        },

        // ROUTER METHODS
        goToHome () {
            if (this.routeName !== ROUTES.HOME) {
                this.$router.push('/')
            }
        }
    }
}
</script>

<style lang="stylus">
    .sideDrawer
        background-image url("/logos/bg-side.png")
        background-repeat no-repeat

    .rgbaFilter
        background-color rgba(0,0,0,.4)

    .drawer
        border-right 1px solid white

    .img-header-desk
        max-height 50px

    .img-header-mobile
        max-height 40px
</style>
