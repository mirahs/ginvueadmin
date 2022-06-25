import axios from 'axios'
import { Message } from 'element-ui'

import store from '@/store'


const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 1000 * 5,
})


// 添加请求拦截器
request.interceptors.request.use((config) => {
    config.headers['X-Token'] = store.state.token

    return config
}, (error) => {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(response => {
    if (response.data.code != 0) Message.error(response.data.msg)

    return response.data
}, error => {
    if (error.response && error.response.data.msg) {
        if (error.response.data.code == 1) store.commit('cbTokenInvalid')

        Message.error(error.response.data.msg)
        return error.response.data
    }

    Message.error('网络错误')
    return { code: -1 }
})


export default request
