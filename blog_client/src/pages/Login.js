import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../components/BackendUrl";
import axios from "axios"

import { useDispatch } from "react-redux"
import { setFirstName, setLastName, setStatus } from "../Redux/slice.js/slice";



export default function Login() {
    window.scrollTo({
        top: 0
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [Fields, setFields] = useState({
        email: "",
        password: ""
    })
    const [Disable, setDisable] = useState(false)
    const [Alert, setAlert] = useState("")
    const [submitted, setsubmitted] = useState(false)

    const onchange = (e) => {
        const { name, value } = e.target;

        setFields(() => {
            return (
                {
                    ...Fields, [name]: value
                }
            )
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!Fields.email || !Fields.password) {
            setsubmitted(false)
            setAlert("Please fill in all fields")
            setTimeout(() => {
                setsubmitted(false)
                setAlert("")
            }, 3000);
            return;
        }

        setDisable(true)

        await axios.post(BackendUrl + "/user/login", Fields, { withCredentials: true })
            .then(async (res) => {
                console.log(res.data)
                if (res.data.status === "success") {
                    dispatch(setFirstName(res.data.firstname))
                    dispatch(setLastName(res.data.lastname))
                    dispatch(setStatus())
                    sessionStorage.setItem("status", true);
                    setsubmitted(true)
                    setAlert(res.data.message)
                    setTimeout(() => {
                        setsubmitted(false)
                        setAlert("")
                        navigate("/", { replace: true })
                    }, 2000);
                } else if (res.data.status === "failed") {
                    setsubmitted(false)
                    setAlert(res.data.message)
                    setTimeout(() => {
                        setsubmitted(false)
                        setAlert("")
                    }, 3000);
                } else {
                    console.log(res.data)
                }

            })
            .catch((err) => {
                console.log("login form error", err.message)
            }).finally(() => {
                setFields({
                    email: "",
                    password: ""
                });

                setDisable(false)
            })
    }

    return (
        <>
            <div className="text-white flex justify-center flex-col h-screen">
                <h3 className="text-2xl text-center">Login to Blogify</h3>
                <form onSubmit={handleSubmit} className="mt-8 p-4 w-72 mx-auto rounded-md  bg-slate-800">
                    <div className="">
                        <label htmlFor="" className="text-slate-400 text-sm">Email address</label>
                        <input type="text" name="email" value={Fields.email} onChange={onchange} className="w-full bg-black rounded-md mt-1 text-sm field px-3 py-2 border border-slate-500 focus:border-slate-300" />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="" className="text-slate-400 text-sm">Password</label>
                        <input type="password" name="password" value={Fields.password} onChange={onchange} className="w-full bg-black rounded-md mt-1 text-sm px-3 py-2 border border-slate-500 focus:border-slate-300" />
                    </div>

                    <button type="submit" disabled={Disable} className={`w-full text-center bg-black Customshadow py-2 ${Disable ? " opacity-60 cursor-not-allowed" : ""} rounded-md mt-6 text-slate-400 hover:text-white duration-300`}>Login</button>

                    {
                        Alert &&
                        <div className={`py-2 px-2 ${submitted ? "bg-green-700" : "bg-red-900"} rounded-md text-sm mt-4`}>
                            {Alert}
                        </div>
                    }
                </form>

                <div className="w-72 flex justify-center mx-auto mt-5 py-5 rounded-md bg-slate-950">
                    <div>New to Blogify? <Link to={"/signup"} className=" text-slate-500  hover:underline">Create an account</Link></div>
                </div>
            </div>
        </>
    )
}