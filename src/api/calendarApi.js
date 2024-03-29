import axios from 'axios'
import { getEnvVariables } from '../helpers'

const { VITE_API_URL } = getEnvVariables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

//todo : configurar interceptores :D => anadir o modificar 
// info de la peticion
calendarApi.interceptors.request.use(config => {
        config.headers ={
            ...config.headers,
            'x-token': localStorage.getItem('token')
        }
        return config
    }
)

export default calendarApi