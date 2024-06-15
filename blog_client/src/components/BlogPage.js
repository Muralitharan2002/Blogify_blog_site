import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import axios from 'axios'
import { BackendUrl } from './BackendUrl';
import parse from "html-react-parser"
import { formateDate } from './formateDate';
import "../blog.css"
import ClipLoader from "react-spinners/ClipLoader";

import { HiOutlineHandThumbUp, HiHandThumbUp } from "react-icons/hi2";
import { BiSolidCommentDetail } from "react-icons/bi";
import Comments from './Comments';
import { socket } from './SocketIo';

function BlogPage() {

    const authId = useSelector((item) => item.authDetails.authId)

    const { id } = useParams();
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [loader, setLoader] = useState(false)
    const [Like, setLike] = useState(false)
    const [LikeCount, setLikeCount] = useState(0)
    const [comments, setComments] = useState([])
    const [Alert, setAlert] = useState("")
    const ScrollRef = useRef(null)

    // console.log(Comments)



    const fetchBlog = async () => {
        setLoader(true)
        await axios.get(BackendUrl + `/user/post/${id}`, { withCredentials: true })
            .then((res) => {
                // console.log(post ? post : "")
                if (res.data.status === "success") {
                    setPost(res.data.data)
                    setLike(res.data.data.Likes.includes(authId))
                    setLikeCount(res.data.data.Likes.length)
                    setComments(res.data.data.Comments)
                    setLoader(false)
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

        socket.on("Like_Post", (likes) => {
            setLike(likes?.includes(authId))
            setLikeCount(likes?.length)
        })
        socket.on("unLike_Post", (likes) => {
            setLike(likes?.includes(authId))
            setLikeCount(likes?.length)
        })

        socket.on("postComments", (data) => {
            setComments(data)
        })

    }, [])

    const OpenComments = () => {
        if (ScrollRef.current) {
            ScrollRef.current.scrollIntoView({ behavior: 'instant' });
        }
    }

    const postLike = async (id) => {
        await axios.put(BackendUrl + `/user/Reaction?blogId=${id}`, {}, { withCredentials: true })
            .then((res) => {
                if (res.data.status === "failed") {
                    setAlert("Please, Login first!")
                    setTimeout(() => {
                        setAlert("")
                    }, 3000);
                }
            })
            .catch((err) => {
                console.log("Error in Like function", err)
            })
    }

    const RemoveLike = async (id) => {
        await axios.put(BackendUrl + `/user/RemoveReaction?blogId=${id}`, {}, { withCredentials: true })
            .then((res) => {
                if (res.data.status === "failed") {
                    setAlert("Please, Login first!")
                    setTimeout(() => {
                        setAlert("")
                    }, 3000);
                }
            })
            .catch((err) => {
                console.log("Error in RemoveLike function", err)
            })
    }



    return (
        <>
            <div className='text-white mt-24 mx-3'>
                {
                    loader ?
                        <div className='min-h-[500px] flex pt-20  justify-center'>
                            <ClipLoader
                                color='#636363'
                                size={45}
                            />
                        </div>
                        :
                        post &&
                        <div className=' max-w-[800px] min-h-[500px] mx-auto lg:px-3 md:px-3 sm:px-3 px-1 py-4'>
                            {
                                Alert &&
                                <div className={`py-2 px-2 bg-red-900 rounded-md text-sm mb-4`}>
                                    {Alert}
                                </div>
                            }
                            <div className='lg:text-4xl md:text-3xl sm:text-3xl text-2xl'>{post.title}</div>
                            <div className='mt-5 flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                    <div className=" w-9 h-9 rounded-full overflow-hidden text-white text-lg flex items-center justify-center bg-gradient-to-b from-blue-600 to-slate-800">
                                        <p>{post.lastname}</p>
                                    </div>
                                    <div>
                                        <p className="text-[14px] text-slate-500">@{post.firstname}</p>
                                        <p className="text-[13px] text-slate-500">{formateDate(post.createdAt)}</p>
                                    </div>
                                </div>
                                <div className=' text-xl flex items-center gap-5 text-slate-300'>
                                    <div className='flex items-center gap-2 cursor-pointer'>
                                        {Like ? <HiHandThumbUp className=' scale-x-[-1]' onClick={() => RemoveLike(post._id)} /> : <HiOutlineHandThumbUp className=' scale-x-[-1]' onClick={() => postLike(post._id)} />}
                                        <p className='text-[15px]'>{LikeCount}</p>
                                    </div>
                                    <div className='cursor-pointer'>
                                        <BiSolidCommentDetail onClick={OpenComments} />
                                    </div>
                                </div>
                            </div>

                            <div className='h-[1px] w-full bg-slate-600 mt-4'></div>

                            <div className='mt-7 w-full'>
                                <img src={post.Image} alt="" className='w-full max-h-[500px] rounded-md' loading='lazy' />
                            </div>

                            <div className='mt-7 text-slate-300'>
                                {parse(post.content)}
                            </div>

                        </div>
                }


                <div>
                    <div ref={ScrollRef}>
                        <Comments comments={comments} blogID={post?._id} setAlert={setAlert} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default BlogPage