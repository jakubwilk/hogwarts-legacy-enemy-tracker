import { notifications } from '@mantine/notifications'
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'

import i18n from './i18n'

const baseURL = import.meta.env.DEV ? '/api' : '/api'

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (import.meta.env.DEV) {
      console.log('🚀 Request:', config.method?.toUpperCase(), config.url)
    }
    return config
  },
  (error: AxiosError) => {
    if (import.meta.env.DEV) {
      console.error('❌ Request Error:', error)
    }
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log('✅ Response:', response.config.url, response.status)
    }
    return response
  },
  (error: AxiosError) => {
    let errorMessage = i18n.t('errors.unexpected.message')
    let errorTitle = i18n.t('errors.unexpected.title')

    if (error.response) {
      const status = error.response.status
      const errorKey = [400, 401, 403, 404, 500, 503].includes(status)
        ? status.toString()
        : 'default'

      errorTitle = i18n.t(`errors.${errorKey}.title`)
      errorMessage = i18n.t(`errors.${errorKey}.message`)

      if (errorKey === 'default') {
        errorTitle = `${errorTitle} ${status}`
      }
    } else if (error.request) {
      errorTitle = i18n.t('errors.network.title')
      errorMessage = i18n.t('errors.network.message')
    } else {
      errorTitle = i18n.t('errors.request.title')
      errorMessage = error.message || i18n.t('errors.request.message')
    }

    notifications.show({
      title: errorTitle,
      message: errorMessage,
      color: 'red',
      autoClose: 5000,
      withCloseButton: true,
    })

    if (import.meta.env.DEV) {
      console.error('❌ Response Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        message: errorMessage,
        error,
      })
    }

    return Promise.reject(error)
  },
)

export default api
