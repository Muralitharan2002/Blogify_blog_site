import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function SecureAuth({ children }) {
    const auth = useSelector((state) => state.authDetails.isLogin)
    // console.log(auth)

    if (!auth) {
        return <Navigate to={"/"} />
    }

    return (
        <>
            {children}
        </>
    )
}

export default SecureAuth