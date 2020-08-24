<template>
    <q-page-sticky expand position="bottom">
        <q-toolbar class="row desktop-only items-center full-width justify-between q-px-md bg-grey-3">
            <span style="width: 7%"></span>
            <q-pagination v-model="pagination.page" @input="changePage" :max="numberOfPages" :max-pages="6" :direction-links="true" :boundary-links="true" color="primary" size="15px"/>
            <div class="text-overline text-grey-9" style="letter-spacing: 0.05em">&#9775; Powered by F&F</div>
        </q-toolbar>
        <q-toolbar class="row mobile-only items-center full-width justify-center q-px-md bg-grey-3" style="opacity: 0.9">
            <q-pagination v-model="pagination.page" @input="changePage" :max="numberOfPages" :max-pages="3" :direction-links="true" :boundary-numbers="false" :boundary-links="true" color="primary" id="pagination" size="15px"/>
        </q-toolbar>
    </q-page-sticky>
</template>

<script>
/* eslint indent: [2, 4] */

export default {
    name: 'MyPagination',

    props: {
        pagination: {
            required: true
        },
        numberOfPages: {
            required: true
        }
    },

    methods: {
        changePage (value) {
            this.$emit('changePage', value)
        }
    }
}
</script>
