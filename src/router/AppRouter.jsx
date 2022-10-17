import { Route, Routes, Navigate } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"
import { useAuthStore } from "../hooks"
import ReactLoading from 'react-loading';
import { useEffect } from "react";

export const AppRouter = () => {
    // const authStatus = 'not-authenticated'

    const { status, checkAuthToken } = useAuthStore()

    useEffect(() => {
        checkAuthToken()
    }, [])

    if(status === 'checking'){
        return (
            <div
                style={{
                    width: '100%',
                    minHeight: '100vh',
                    display: 'grid',
                    placeContent: 'center',
                }}
            >
                <ReactLoading type={"spin"} color='#33ddaa' height={'200px'} width={'200px'} />
            </div>
        )
    }


    return (
    <Routes>
        {
            status === 'not-authenticated'
            ? (
                <>
                    <Route path="/auth/*" element={ <LoginPage /> }/>
                    <Route path="/*" element={ <Navigate to={"/auth/login"} /> } />
                </>
            )
            :(
                <>
                    <Route path="/" element={ <CalendarPage /> }/>
                    <Route path="/*" element={ <Navigate to={"/"} /> } />
                </>
            )
        }

        <Route path="/*" element={ <Navigate to={"/auth/login"} /> } />
    </Routes>
    )
}
