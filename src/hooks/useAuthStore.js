import { useDispatch, useSelector } from 'react-redux'
import calendarApi from '../api/calendarApi'
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCleanUp } from '../store'

export const useAuthStore = () => {

    const { 
        status, 
        error, 
        errorMessage,
        user
    } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {
        try {
            dispatch(onChecking())
            const { data } = await calendarApi
            .post(
                '/auth',
                {
                    email,
                    password
                }
            )

            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(onLogin({
                name: data.name,
                uid: data.uid
            }))

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'))
            console.log(error)
            setTimeout(()=>{
                dispatch(clearErrorMessage)
            }, 10)
        }
    }

    const startRegister = async ({ name, email, password }) => {


        try {
            dispatch(onChecking())
            const { data } = await calendarApi
            .post(
                '/auth/new',
                {
                    name,
                    email,
                    password
                }
            )

            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(onLogin({
                name: data.name,
                uid: data.uid
            }))

        } catch (error) {

            const { response } = error

            const errorMessage = response?.data?.errors?.password?.msg

            if(errorMessage){
                dispatch(onLogout(errorMessage))
                setTimeout(()=>{
                    dispatch(clearErrorMessage)
                }, 10)
                return
            }

            dispatch(onLogout(error.response.data?.msg || "El usuario ya existe"))
            setTimeout(()=>{
                dispatch(clearErrorMessage)
            }, 10)
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token')

        if(!token) return dispatch(onLogout())

        try {
            const { data } = await calendarApi.get('/auth/renew')

            localStorage.setItem('token-init-date', new Date().getTime())
            localStorage.setItem('token', data.token)
            dispatch(onLogin({
                name: data.name,
                uid: data.uid
            }))
        } catch (error) {
            console.log(error)
            localStorage.clear()
            dispatch(onLogout())
        }
    }

    const startLogout = () => {
        localStorage.clear()
        dispatch(onLogoutCleanUp())
        dispatch(onLogout())
    }

    return {
        status,
        error,
        errorMessage,
        user,
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}