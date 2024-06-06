import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { RemoveFirstName, RemoveLastName, RemoveStatus } from "../Redux/slice.js/slice"
import axios from "axios"
import { BackendUrl } from "../components/BackendUrl"




export default function Profile({ children }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [disable, setDisable] = useState()
    const firstname = useSelector((state) => state.authDetails.firstname)
    const lastname = useSelector((state) => state.authDetails.lastname)


    const logout = async () => {
        setDisable(true)
        await axios.post(BackendUrl + "/user/signout", {}, { withCredentials: true })
            .then(async (res) => {
                console.log(res.data)
                if (res.data.status === "success") {
                    // setLoginStatus(false)
                    dispatch(RemoveFirstName())
                    dispatch(RemoveLastName())
                    dispatch(RemoveStatus())
                    sessionStorage.removeItem("status")
                    navigate("/")
                } else {
                    console.log(res.data)
                }
            })
            .catch((err) => {
                console.log("logout function", err.message)
            }).finally(() => {
                setDisable(false)
            })

    }



    return (
        <>
            <div className="text-white lg:mt-32 md:mt-32 sm:mt-32 mt-20 lg:mx-20 md:mx-10">
                <div className="flex lg:flex-nowrap md:flex-wrap flex-wrap gap-5">

                    <div className=" lg:border-r lg:border-b-0 md:border-b  border-slate-800 lg:w-72 w-full lg:h-96 md:h-64 h-60 flex lg:flex-col lg:gap-0 md:gap-10 sm:gap-10 gap-7 items-center justify-center items-center flex-wrap">
                        <div className="w-32 h-32 rounded-full flex justify-center items-center bg-gradient-to-b from-blue-600 to-slate-800 cursor-pointer">
                            <p className="text-6xl">{lastname}</p>
                        </div>


                        <div>
                            <div className="lg:mt-5">
                                <div className="text-slate-500">@{firstname}</div>
                                <div className="text-3xl">{firstname + " " + lastname}</div>
                            </div>

                            <div className="lg:mt-8 md:mt-4 mt-4">
                                <button disabled={disable} onClick={logout} className={` w-48 py-2 rounded-md ${disable ? " opacity-60 cursor-not-allowed" : ""} shadow-inner shadow-slate-500`}>Log out</button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-[75%] md:w-full w-full px-5 ">
                        <h2 className="text-3xl border-b pb-5 border-slate-800">My Blogs</h2>
                        <div className="mt-5  max-h-[500px] overflow-y-scroll">
                            {children}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}