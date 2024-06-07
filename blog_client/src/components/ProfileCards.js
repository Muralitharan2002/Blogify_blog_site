import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { formateDate } from "./formateDate"
import axios from "axios"
import { BackendUrl } from "../components/BackendUrl"
import ClipLoader from "react-spinners/ClipLoader";

import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

export default function ProfileCards() {
    const [blogs, setblogs] = useState(null)
    const [loader, setLoader] = useState(false)

    const authblogs = async () => {
        setLoader(true)
        await axios.get(BackendUrl + "/user/authblogs", { withCredentials: true })
            .then((res) => {
                if (res.data.status !== "error") {
                    setblogs(res.data.blogs)
                    setLoader(false)
                    // console.log(blogs)
                } else {
                    console.log(res.data)
                }
            })
            .catch((err) => {
                console.log("Error in profile blogs component", err.message)
            })
    }

    useEffect(() => {
        authblogs()
    }, [])

    const deleteBlog = async (blogId) => {
        console.log(blogId)
        await axios.delete(BackendUrl + `/user/drop?blogId=${blogId}`, { withCredentials: true })
            .then((res) => {
                if (res.data.status === "success") {
                    authblogs()
                } else {
                    console.log(res.data)
                }
            })
            .catch((err) => {
                console.log("Error while deleting blog", err.message)
            })
    }

    return (
        <>

            {
                loader ?
                    <div className='min-h-[390px] flex pt-20  justify-center'>
                        <ClipLoader
                            color='#636363'
                            size={45}
                        />
                    </div>
                    :
                    <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 overflow-y-auto">
                        {
                            blogs && blogs.map((item, key) => (
                                <div key={key} className="relative text-white rounded-xl bg-gradient-to-t from-blue-700 to-black p-[1px] overflow-hidden tool-block">
                                    <Link to={`/blog/${item._id}`} className="bg-black rounded-xl overflow-hidden h-full flex flex-col ">
                                        <div className=" h-52 rounded-[8px] overflow-hidden m-2">
                                            <img src={item.Image} alt="" className="w-full h-full aspect-[4/3] object-cover" loading="lazy" />
                                        </div>
                                        <div className="mt-6 px-3">

                                            <span className=" bg-slate-600 px-3 py-2 rounded-md">{item.category}</span>

                                            <h3 className="lg:text-2xl md:text-2xl sm:text-xl text-base mt-4 line-clamp-2 text-ellipsis">
                                                {item.title}
                                            </h3>


                                        </div>
                                        <div className="px-3 my-4 flex items-center gap-3 text-slate-500 text-sm">
                                            <div className=" w-9 h-9 rounded-full overflow-hidden text-white text-lg flex items-center justify-center bg-gradient-to-b from-blue-600 to-slate-800">
                                                {/* <img src={Avatar} alt="" className="w-full" /> */}
                                                <p>{item.lastname}</p>
                                            </div>
                                            <div>
                                                <p className="text-[14px]">@{item.firstname}</p>
                                                <p className="text-[14px]">{formateDate(item.createdAt)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="tool text-green-500 text-4xl absolute top-56 -right-32 duration-300 flex">
                                        <Link to={`/edit/${item._id}`}><BiSolidMessageSquareEdit /></Link>
                                        <MdDelete className="text-red-700 cursor-pointer" onClick={() => deleteBlog(item._id)} />
                                    </div>
                                </div>
                            ))
                        }
                    </div >
            }


            {
                blogs && !blogs.length > 0 && <p className="text-white min-h-[400px] w-full flex justify-center items-center text-3xl opacity-30">No Blogs Created yet!</p>
            }




        </>
    )
}