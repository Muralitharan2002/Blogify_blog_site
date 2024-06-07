import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { RemoveFirstName, RemoveLastName, RemoveStatus } from "../Redux/slice.js/slice"
import { BackendUrl } from "../components/BackendUrl"
import axios from "axios"


export default function Header() {
    const dispatch = useDispatch()
    const [Menu, setMenu] = useState(false)
    const [AccMenu, setAccMenu] = useState(false)
    const firstname = useSelector((state) => state.authDetails.firstname)
    const lastname = useSelector((state) => state.authDetails.lastname)
    const status = useSelector((state) => state.authDetails.isLogin)

    const MenuOn = () => {
        setMenu(true)
    }
    const MenuOff = () => {
        setMenu(false)
    }

    const dropdownOn = () => {
        setAccMenu(!AccMenu)
    }

    const checkLogin = () => {
        const status = sessionStorage.getItem("status")
        if (!status) return dispatch(RemoveStatus()) && dispatch(RemoveFirstName()) && dispatch(RemoveLastName())
    }



    const logout = async () => {

        await axios.post(BackendUrl + "/user/signout", {}, { withCredentials: true })
            .then(async (res) => {
                console.log(res.data)
                if (res.data.status === "success") {
                    // setLoginStatus(false)
                    dispatch(RemoveFirstName())
                    dispatch(RemoveLastName())
                    dispatch(RemoveStatus())
                    sessionStorage.removeItem("status")
                } else {
                    console.log(res.data)
                }
            })
            .catch((err) => {
                console.log("logout function", err.message)
            })

    }

    useEffect(() => {
        checkLogin()
    }, [])

    return (
        <>
            <div className="flex items-center justify-center z-50 relative">
                <div className="text-white fixed w-[91%] py-2 top-5 Customshadow  rounded-full px-5 flex items-center justify-between backdrop-blur navbar-container z-40" >
                    <div className="bg-bgtext bg-clip-text text-transparent text-3xl">
                        Blogify
                    </div>

                    {
                        Menu && <div className={`absolute lg:hidden md:hidden top-0 left-0 w-full h-screen bg-[#000003b4] z-30`} onClick={() => MenuOff()}></div>
                    }

                    <div className={` px-4 xl:flex md:flex justify-center gap-8 text-slate-400 duration-500 sm:hidden hidden ${Menu ? "navbar" : ""}`}>
                        <NavLink to={"/"} onClick={() => MenuOff()} className="hover:text-white duration-300">Home</NavLink>
                        <NavLink to={"/blog"} onClick={() => MenuOff()} className="hover:text-white duration-300">Blog</NavLink>
                        <NavLink to={"/create"} onClick={() => MenuOff()} className="hover:text-white duration-300">Create</NavLink>
                        {/* <NavLink to={"/About"} onClick={() => MenuOff()} className="hover:text-white duration-300">About</NavLink> */}
                    </div>
                    <div className="flex items-center">
                        {
                            (status && firstname && lastname) ?
                                <div className=" relative" onClick={dropdownOn} >
                                    <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-gradient-to-b from-blue-600 to-slate-800 cursor-pointer">
                                        <p className="text-lg">{lastname}</p>
                                    </div>
                                    {
                                        AccMenu &&

                                        <div onClick={dropdownOn} className="absolute rounded-md bg-slate-800 left-[-20px] top-[60px] w-20 py-2 flex flex-col">
                                            <NavLink to={"/profile"} className="text-[16px px-2 duration-300 hover:text-slate-400 cursor-pointer">Profile</NavLink>
                                            <p onClick={() => logout()} className="mt-2 text-[16px] px-2 hover:text-slate-400 duration-300 cursor-pointer" >Log out</p>
                                        </div>
                                    }

                                </div>
                                :
                                <>
                                    <NavLink to={"/login"} className="">
                                        <div className="hover:text-white duration-300 text-slate-400">Login</div>
                                    </NavLink>
                                    <NavLink to={"/signup"} className=" ml-5">
                                        <div className=" rounded-full pb-1 px-2 Customshadow2">Sign up</div>
                                    </NavLink>
                                </>
                        }

                        <div className=" text-2xl ml-4 lg:hidden md:hidden "><CgMenuRightAlt onClick={() => { MenuOn() }} /></div>
                    </div>

                </div>
            </div>
        </>
    )
}