/* eslint-disable */

import axios from 'axios'
import { Notify } from 'quasar'

import { REQUEST } from 'src/enumerators/request.js'
import { MESSAGES } from 'src/enumerators/alerts.js'

export default async ({ router, Vue }) => {
    const axiosInstance = axios.create({
        baseURL: 'https://api.lojasensus.com.br/client/',
        crossdomain: true
    })

    // INTERCEPTOR RESPONSE
    axiosInstance.interceptors.response.use(
        (response) => {
            return response
        },

        // STANDARD ERROR MESSAGES
        (error) => {
            console.error(error)
            let notifyMessage = 'ERROR'

            if (error.response) {
                const status = error.response.status

                if (status === REQUEST.WILDCARD) { notifyMessage = error.response.data }

                else if (status === REQUEST.BAD_REQUEST) { notifyMessage = MESSAGES.ERROR }
                else if (status === REQUEST.UNAUTHORIZED) { notifyMessage = MESSAGES.ERROR }
                else if (status === REQUEST.NOTFOUND) { notifyMessage = MESSAGES.ERROR }
                else if (status === REQUEST.CONFLICT) { notifyMessage = MESSAGES.ERROR }
                else if (status === REQUEST.READ_FILES) { notifyMessage = MESSAGES.ERROR }

                else { notifyMessage = MESSAGES.UNKNOW_ERROR }
            } else {
                notifyMessage = MESSAGES.CONNECTION_ERROR
            }

            Notify.create({
                icon: 'fas fa-exclamation-triangle',
                message: notifyMessage
            })

            return Promise.reject(error)
        })

    Vue.prototype.$axios = axiosInstance
}
