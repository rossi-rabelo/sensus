<template>
    <q-layout view="lHh lpR lFf">
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
                    <div class="col-auto" style="padding-top: 0.5%; cursor: pointer" @click="goToHome">
                        <img src="../statics/logo-header.png" height="80%" alt="">
                    </div>

                    <!-- PADDING RIGHT -->
                    <div class="col-3 desktop-only"></div>
                    <div class="mobile-only" style="width: 30px"></div>
                </div>
            </q-toolbar>
        </q-header>

        <!-- DRAWER -->
        <q-drawer v-model="left" side="left">
            <div class="bg-yellow fit">
                <div class="sideDrawer fit">
                    <div class="rgbaFilter fit">
                        <my-categories />
                    </div>
                </div>
            </div>
        </q-drawer>

        <!-- CONTENT -->
        <q-page-container @click="closeDrawer">
            <router-view/>
        </q-page-container>

        <!-- FOOTER -->
        <q-footer class="bg-grey-5 text-grey-10">
            <q-toolbar>
                <q-toolbar-title class="row full-width items-center justify-center">
                    <!-- WHATSAPP -->
                    <div class="col-auto q-px-sm">
                        <q-icon name="fab fa-whatsapp" color="primary" size="25px"/>
                        <span class="text-bold text-primary text-subtitle2">
                            (34) 9 9680-6896
                        </span>
                    </div>

                    <!-- INSTAGRAM -->
                    <div class="col-auto q-px-sm">
                        <q-icon name="fab fa-instagram" color="primary" size="25px"/>
                        <span class="text-bold text-primary text-subtitle1">
                            @sensus.official
                        </span>
                    </div>
                </q-toolbar-title>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<script>
/* eslint indent: [2, 4] */

// ENUMERATORS
import { ROUTES } from 'src/enumerators/routes'

// COMPONENTS
import categories from 'components/Categories'

export default {
    components: {
        'my-categories': categories
    },

    created () {
        if (this.$route.name === ROUTES.HOME) {
            this.left = true
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
            left: false
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

    .rgbaFilter
        background-color rgba(0,0,0,.4)
</style>
