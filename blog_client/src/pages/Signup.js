import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BackendUrl } from "../components/BackendUrl";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate()
    const [Fields, setFields] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })
    const [Disable, setDisable] = useState(false)
    const [Alert, setAlert] = useState("")
    const [submitted, setsubmitted] = useState(false)


    const onchange = (e) => {
        setFields(() => {
            return (
                { ...Fields, [e.target.name]: e.target.value }
            )
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!Fields.firstname || !Fields.lastname || !Fields.email || !Fields.password) {
            setsubmitted(false)
            setAlert("Please fill in all fields")
            setTimeout(() => {
                setsubmitted(false)
                setAlert("")
            }, 3000);
            return;
        }

        setDisable(true)

        await axios.post(BackendUrl + "/user/signup", Fields, { withCredentials: true })
            .then(async (res) => {
                // console.log(res)
                if (res.data.status === "success") {
                    setsubmitted(true)
                    setAlert("Created Successfully!")
                    setTimeout(() => {
                        setsubmitted(false)
                        setAlert("")
                        navigate("/login");
                    }, 1000);

                } else {
                    setsubmitted(true)
                    setAlert("Already have an account! go to sign in page")
                    setTimeout(() => {
                        setsubmitted(false)
                        setAlert("")
                        navigate("/login")
                    }, 1000);
                }
            })
            .catch((err) => {
                console.log("signup form error", err.message)
            }).finally(() => {
                setFields({
                    firstname: "",
                    lastname: "",
                    email: "",
                    password: ""
                });

                setDisable(false)
            })

    }



    return (
        <>
            <div className="text-white flex justify-center flex-col h-screen">
                <h3 className="text-2xl text-center">Welcom to Blogify</h3>
                <form className="mt-8 p-4 w-72 mx-auto rounded-md  bg-slate-800" onSubmit={handleSubmit}>
                    <div className="flex gap-2 w-full">
                        <div className="">
                            <label htmlFor="" className="text-slate-400 text-sm">First Name</label>
                            <input type="text" name="firstname" value={Fields.firstname} onChange={onchange} className="w-full px-3 py-2 border border-slate-500 bg-black rounded-md mt-1 text-sm field focus:border-slate-300" placeholder="Muralitharan" />
                        </div>
                        <div className="w-[50%]">
                            <label htmlFor="" className="text-slate-400 text-sm">Last Name</label>
                            <input type="text" name="lastname" value={Fields.lastname} onChange={onchange} className="w-full px-3 py-2 border border-slate-500 bg-black rounded-md mt-1 text-sm field focus:border-slate-300" placeholder="S" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <label htmlFor="" className="text-slate-400 text-sm">Email address</label>
                        <input type="text" name="email" value={Fields.email} onChange={onchange} className="w-full px-3 py-2 border border-slate-500 bg-black rounded-md mt-1 text-sm field focus:border-slate-300" />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="" className="text-slate-400 text-sm">Password</label>
                        <input type="password" name="password" value={Fields.password} onChange={onchange} className="w-full px-3 py-2 border border-slate-500 bg-black rounded-md mt-1 text-sm field focus:border-slate-300" />
                    </div>

                    <button type="submit" disabled={Disable} className={`w-full text-center  ${Disable ? " opacity-60 cursor-not-allowed" : ""}  bg-black Customshadow py-2 rounded-md mt-6 text-slate-400 hover:text-white duration-300`}>Sign in</button>
                    {
                        Alert &&
                        <div className={`py-2 px-2 ${submitted ? "bg-green-700" : "bg-red-900"} rounded-md text-sm mt-4`}>
                            {Alert}
                        </div>
                    }
                </form>
                <div className="w-72 flex justify-center mx-auto mt-5 py-5 rounded-md bg-slate-950">
                    <div>Already have an account? <Link to={"/login"} className=" text-slate-500  hover:underline">Login</Link></div>
                </div>
            </div>
        </>
    )
}