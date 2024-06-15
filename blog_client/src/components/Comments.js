import React, { useState } from 'react'
import { BiSolidCommentDetail } from "react-icons/bi";
import { formateDate } from './formateDate';
import axios from 'axios';
import { BackendUrl } from './BackendUrl';
import { ScrollTo } from './ScrollTo';

function Comments({ comments, blogID, setAlert }) {
    // console.log(blogID)
    // // const data = comments?.Comments
    // // const id = comments?._id
    const [text, setText] = useState("")
    const [disable, setDisable] = useState(false)

    const postComment = async (id) => {
        if (!text) {
            ScrollTo()
            setAlert("Type the comments, first!")
            setTimeout(() => {
                setAlert("")
            }, 3000);
            return
        }
        setDisable(true)
        await axios.post(BackendUrl + `/user/PostComment?blogId=${id}`, { text }, { withCredentials: true })
            .then((res) => {
                if (res.data.status === "success") {
                    console.log(res.data)
                } else {
                    ScrollTo()
                    setAlert("Please, Login first!")
                    setTimeout(() => {
                        setAlert("")
                    }, 3000);
                }
            })
            .catch((err) => {
                console.log({ message: "error in AddComment component", err })
            })
            .finally(() => {
                setDisable(false)
                setText("")
            })
    }

    return (
        <div className='text-white max-w-[800px] mx-auto lg:px-3 md:px-3 sm:px-3'>

            <div className='h-[1px] w-full bg-slate-600 mt-4 mb-7'></div>

            <div className='flex items-center gap-2 text-xl text-slate-500'>
                <BiSolidCommentDetail className='text-xl' />
                <div>Comments</div>
            </div>

            <div className='flex items-center gap-4 mb-8'>
                <input type="text" placeholder='share your comments...' value={text} onChange={(e) => setText(e.target.value)} className='w-full bg-transparent pe-12 p-1 border-b text-sm focus:outline-none mt-4' />
                <div className={`rounded-md px-4 py-1 ${disable ? " opacity-60 cursor-not-allowed" : "cursor-pointer"} shadow-inner shadow-slate-500 text-slate-400 duration-300 hover:text-slate-100`} onClick={() => postComment(blogID)}>Add</div>
            </div>

            <div className='max-h-[450px] overflow-y-scroll'>

                {
                    comments.length === 0 ?
                        <div className='bg-slate-800 text-center text-xl py-2 rounded-md'>Comments not posted Yet!</div> :
                        comments?.map((item) => (
                            <div key={item._id} className='flex mt-4 gap-2'>
                                <div className=" w-8 h-8 rounded-full flex justify-center items-center bg-gradient-to-b from-blue-600 to-slate-800 cursor-pointer">
                                    <p className="text-lg">{item.postedBy.lastname}</p>
                                </div>
                                <div className=' bg-slate-800 flex-1 rounded-md px-2 py-2'>
                                    <div className='flex justify-between text-slate-400 text-[13px]'>
                                        <div>@{item.postedBy.firstname}</div>
                                        <div>{formateDate(item.created)}</div>
                                    </div>

                                    <div className='mt-2 text-sm'>
                                        {item.text}
                                    </div>
                                </div>

                            </div>
                        ))
                }
            </div>

        </div>
    )
}

export default Comments