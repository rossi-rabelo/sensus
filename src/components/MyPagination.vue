<template>
    <q-page-sticky expand position="bottom">
        <q-toolbar class="row items-center full-width justify-between q-px-md bg-grey-3">
            <q-select
                v-model="pagination.rowsPerPage"
                label="Itens por página"
                dense
                outlined
                bg-color="grey-2"
                :options="[
                    { label: '5', value: 5 },
                    { label: '6', value: 6 },
                    { label: '9', value: 9 },
                    { label: '12', value: 12 },
                    { label: '15', value: 15 },
                    { label: '18', value: 18 },
                    { label: 'Todos', value: 0 }]"
                emit-value
                input-class="text-center row justify-center"
                style="min-width: 140px"
                @input="savePreferences">

                <template v-slot:selected>
                    {{ (pagination.rowsPerPage === 0) ? 'Todos' : pagination.rowsPerPage }}
                </template>
            </q-select>
            <q-pagination v-model="pagination.page" :max="configuration.pagesNumber" color="grey-10" :input="true" size="20px"/>
            <div class="text-overline text-grey-9" style="letter-spacing: 0.05em">&#9775; Powered by KNetiin & KingFarofa</div>
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
        configuration: {
            required: true
        }
    },

    created () {
        if (this.$q.localStorage.has('items')) {
            this.pagination.rowsPerPage = this.$q.localStorage.getItem('items')
        }
    },

    methods: {
        savePreferences () {
            this.$q.localStorage.set('items', this.pagination.rowsPerPage)
        }
    }
}
</script>
