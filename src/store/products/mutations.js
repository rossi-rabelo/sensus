/* eslint indent: [2, 4] */

import { EventBus } from 'src/functions/event-bus.js'

export function changeCount (state, count) {
    state.count = count
}

export function changePage (state, page) {
    state.page = page
}

export function changeEPP (state, epp) {
    state.epp = epp
}

export function changeCategory (state, categoryId) {
    state.page = 1

    state.categoryId = categoryId
    state.subCategoryId = null
    state.search = null
    EventBus.$emit('update_product')
}

export function changeSubCategory (state, subCategoryId) {
    state.page = 1

    state.categoryId = null
    state.subCategoryId = subCategoryId
    state.search = null
    EventBus.$emit('update_product')
}

export function changeSearch (state, search) {
    state.page = 1

    state.categoryId = null
    state.subCategoryId = null
    state.search = search
    EventBus.$emit('update_product')
}
