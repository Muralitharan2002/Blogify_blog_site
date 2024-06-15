import React, { useEffect, useRef, useState } from "react";
import Cards from "../components/Card";
import Loader from "../components/Loader";
import { RiSearchEyeLine } from "react-icons/ri";
import { BackendUrl } from "../components/BackendUrl"
import axios from "axios"
import "../Global.css"
import Filter from "../components/Filter";
import { AnimatePresence } from "framer-motion"


export default function Blog() {
    const inputRef = useRef()
    const [AllBlogs, setAllBlogs] = useState([])
    const [FilterBlogs, setFilterBlogs] = useState([])
    const [loading, setLoading] = useState(false);
    // const [Empty, setEmpty] = useState(true)

    const category = ["All", ...new Set(AllBlogs.map((item) => item.category))]
    // console.log(AllBlogs)


    const FilterItems = (selectedCategory) => {
        const items = selectedCategory === "All" ? AllBlogs : AllBlogs.filter((state) => state.category === selectedCategory)
        // console.log(items)
        setFilterBlogs(items)
    }

    const Blogs = async () => {
        setLoading(true)
        await axios.get(BackendUrl + "/user/blogs", { withCredentials: true })
            .then((res) => {
                // console.log(res.data)
                if (res.data.status === "error") {
                    // setEmpty(true)
                    console.log(res.data)
                } else {
                    // setEmpty(false)
                    setAllBlogs(res.data.blogs)
                    setFilterBlogs(res.data.blogs)
                }
            })
            .catch((err) => {
                console.log("Error in all Blogs component", err)
            }).finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        Blogs()
    }, [])

    const searchBlog = async (e) => {

        if (!inputRef.current.value) return setFilterBlogs(AllBlogs)

        if (e.type === "keydown" && e.key !== "Enter") return;

        await axios.get(BackendUrl + `/user/blogs?post=${inputRef.current.value}`, { withCredentials: true })
            .then((res) => {
                // console.log(res.data)
                if (res.data) {
                    // setAllBlogs(res.data)
                    setFilterBlogs(res.data)
                } else {
                    console.log(res.data)
                }
            }).catch((err) => {
                console.log("Error in seachblog component", err)
            }).finally(() => {
                inputRef.current.value = ""
            })
    }

    return (
        <>
            <div className="text-white">
                <h2 className="lg:text-4xl md:text-4xl sm:text-3xl text-3xl mt-36 text-center">Blog&apos;s</h2>
                <div className=" mt-14 flex items-center border border-slate-600 shadow-inner z-50 shadow-slate-500 lg:w-[500px] md:w-[500px] sm:w-[400px] mx-3 sm:mx-auto md:mx-auto lg:mx-auto rounded-xl overflow-hidden">
                    <input ref={inputRef} onKeyDown={searchBlog} type="text" className="bg-black w-full m-1 rounded-lg px-2 py-2 border-0 field" placeholder="search blog..." />
                    <RiSearchEyeLine onClick={searchBlog} className=" text-2xl mx-2 cursor-pointer text-slate-400 duration-300 hover:text-white" />
                </div>
            </div>

            <Filter category={category} FilterItems={FilterItems} />


            {loading ? <Loader /> :
                <AnimatePresence>
                    <Cards FilterBlogs={FilterBlogs} />
                </AnimatePresence>
            }


        </>
    )
}