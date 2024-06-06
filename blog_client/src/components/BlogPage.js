import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BackendUrl } from './BackendUrl';
import parse from "html-react-parser"
import { formateDate } from './formateDate';
import "../blog.css"


function BlogPage() {

    const { id } = useParams();
    const navigate = useNavigate()
    const [post, setPost] = useState(null)

    const fetchBlog = async () => {
        await axios.get(BackendUrl + `/user/post/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(post ? post : "")
                if (res.data.status === "success") {
                    setPost(res.data.data)
                } else if (res.data.status === "failed") {
                    navigate("/login")
                } else {
                    console.log(res.data)
                }
            }).catch((err) => {
                console.log("Error in blogPage component", err.message)
            })
    }

    useEffect(() => {
        fetchBlog()
    }, [])


    return (
        <>
            <div className='text-white mt-24 mx-3'>
                {
                    post ?
                        <div className=' max-w-[800px] mx-auto lg:px-3 md:px-3 sm:px-3 px-1 py-4'>
                            <div className='lg:text-4xl md:text-3xl sm:text-3xl text-2xl'>{post.title}</div>
                            <div className='mt-5 flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                    <div className=" w-9 h-9 rounded-full overflow-hidden text-white text-lg flex items-center justify-center bg-gradient-to-b from-blue-600 to-slate-800">
                                        <p>{post.lastname}</p>
                                    </div>
                                    <p className="text-[16px] text-slate-500">@{post.firstname}</p>
                                </div>
                                <div>
                                    <p className="text-[16px] text-slate-500">{formateDate(post.createdAt)}</p>
                                </div>
                            </div>

                            <div className='h-[1px] w-full bg-slate-600 mt-4'></div>

                            <div className='mt-7 w-full'>
                                <img src={post.Image} alt="" className='w-full max-h-[500px] rounded-md' />
                            </div>

                            <div className='mt-7 text-slate-300'>
                                {parse(post.content)}
                            </div>

                        </div> :
                        "loading...."
                }
            </div>
        </>
    )
}

export default BlogPage