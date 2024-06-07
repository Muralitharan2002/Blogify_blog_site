import React from "react"
import { Link } from "react-router-dom"
import { formateDate } from "./formateDate"
export default function Cards({ FilterBlogs }) {


    return (
        <>

            <div className="mt-14 w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    FilterBlogs && FilterBlogs.map((item, key) => (
                        // <Link key={key} to={"/blog/"} className="h-full">
                        <div key={key} className=" text-white rounded-xl col-span-1 row-span-1 bg-gradient-to-t from-blue-700 to-black p-[1px] overflow-hidden">
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
                        </div>
                        // </Link>
                    ))
                }
            </div >

            {
                !FilterBlogs.length > 0 && <p className="text-white h-36  w-full grid place-items-center text-3xl opacity-30">No Blogs Available!</p>
            }

        </>
    )
}