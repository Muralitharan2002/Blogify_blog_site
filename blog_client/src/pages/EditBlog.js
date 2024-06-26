import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BsUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom"
import { BackendUrl } from "../components/BackendUrl";
import { ScrollTo } from "../components/ScrollTo"
import axios from "axios"
import ClipLoader from "react-spinners/ClipLoader";


export default function EditBlog() {
    const { id } = useParams()
    const navigate = useNavigate()
    const uploadField = useRef("")

    const [loader, setLoader] = useState(true)
    const [content, setContent] = useState('');
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState('')
    const [file, setFile] = useState(null)
    const [status, setStatus] = useState(false)
    const [Alert, setAlert] = useState("")
    const [Disable, setDisable] = useState(false)
    const [Preview, setPreview] = useState("")


    const blogCategories = [
        { name: 'Technology' },
        { name: 'Travel' },
        { name: 'Food' },
        { name: 'Fashion' },
        { name: 'Health' },
        { name: 'Fitness' },
        { name: 'Lifestyle' },
        { name: 'Sports' },
        { name: 'Movies' },
        { name: 'Education' },
        { name: 'Finance' },
        { name: 'Politics' },
        { name: 'Gaming' },
        { name: 'other' }
        // Add more categories as needed
    ];

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['image'],
            ['code-block']
        ] // Enable syntax highlighting
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet', 'indent',
        'link', 'image',
        'code-block'
    ];

    const upload = () => {
        uploadField.current.click()
    }

    const handleImageupload = (e) => {
        const image = e.target.files[0];
        if (!image) return;

        setFile(image)

        const ImageUrl = URL.createObjectURL(image)
        // console.log(ImageUrl)
        setPreview(ImageUrl)

    }

    const clearStates = () => {
        setTitle("")
        setCategory("")
        setContent("")
        setFile(null)
        setPreview("")

    }

    // console.log(id)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !content || !category) {
            setStatus(false)
            ScrollTo()
            setAlert("Please fill all the fields!")
            setTimeout(() => {
                setStatus(false)
                setAlert("")
            }, 3000)
            return;
        }

        const formData = new FormData()
        formData.append("title", title)
        formData.append("category", category)
        formData.append("content", content)
        formData.append("file", file)

        setDisable(true)

        await axios.put(BackendUrl + `/user/update?blogId=${id}`, formData, { withCredentials: true })
            .then(async (res) => {
                if (res.data.status === "success") {
                    setStatus(true)
                    ScrollTo()
                    setAlert("Blog updated!")
                    setTimeout(() => {
                        setStatus(false)
                        setAlert("")
                        navigate("/profile")
                    }, 2000)
                } else if (res.data.status === "failed") {
                    setStatus(false)
                    ScrollTo()
                    setAlert("you nothing update!")
                    setTimeout(() => {
                        setStatus(false)
                        setAlert("")
                        navigate("/profile")
                    }, 2000)
                } else {
                    console.log(res.data)
                }
            }).catch((err) => {
                console.log("Error in create component", err)
                setStatus(false)
                ScrollTo()
                setAlert("Blog updation Failed!")
                setTimeout(() => {
                    setStatus(false)
                    setAlert("")
                    navigate("/profile")
                }, 2000)
            }).finally(() => {
                setDisable(false)
                clearStates()
            })
    }



    const fetchBlog = async () => {
        setLoader(true)
        await axios.get(BackendUrl + `/user/post/${id}`, { withCredentials: true })
            .then((res) => {
                // console.log(post ? post : "")
                if (res.data.status === "success") {
                    setTitle(res.data.data.title)
                    setCategory(res.data.data.category)
                    setContent(res.data.data.content)
                    setPreview(res.data.data.Image)
                    setLoader(false)
                }
                else if (res.data.status === "failed") {
                    navigate("/login")
                }
                else {
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
            <div className=' text-white mt-32'>
                <h2 className='text-center lg:text-4xl md:text-4xl sm:text-3xl text-3xl '>Update your Blog</h2>

                {
                    loader ?
                        <div className='min-h-[430px] flex pt-20  justify-center'>
                            <ClipLoader
                                color='#636363'
                                size={45}
                            />
                        </div>
                        :
                        <form className=' lg:w-[48%] md:w-[70%] w-[90%] mt-10 mx-auto' onSubmit={handleSubmit}>
                            <div className=''>
                                {
                                    Alert &&
                                    <div className={`text-center mb-8 ${status ? "bg-green-700" : "bg-red-900"} rounded-md px-1 py-2 text-xl`}>
                                        {Alert}
                                    </div>
                                }
                                <div>
                                    <label htmlFor="category" className='text-slate-500 lg:text-2xl md:text-2xl sm:text-2xl text-xl '>Enter a blog title :</label>
                                    <input type="text" name='title' value={title} onChange={(e) => { setTitle(e.target.value) }} className='w-full mt-4 px-1 py-2 bg-black rounded-md border border-slate-500 focus:border-slate-600 cursor-pointer field' placeholder=' Blog title' />
                                </div>

                                <div className='my-8'>
                                    <label htmlFor="category" className='text-slate-500 lg:text-2xl md:text-2xl sm:text-2xl text-xl'>Blog image :</label>
                                    <div className='w-full mt-4 rounded-md border-slate-500 mx-auto min-h-60 border overflow-hidden'>
                                        {
                                            Preview &&
                                            <img src={Preview} alt="" className='w-full h-full object-cover' loading='lazy' />
                                        }
                                    </div>

                                    <div className='w-[50%] mx-auto mt-7 text-white border-slate-500 border rounded-md shadow-inner shadow-blue-500 lg:py-2 md:py-2 py-1 text-lg cursor-pointer'>
                                        <div htmlFor="input-file" onClick={upload} className='upload flex items-center gap-4 justify-center '><BsUpload className='text-base' />upload</div>
                                        <input ref={uploadField} onChange={handleImageupload} name='file' type="file" className='hidden uploadBtn' />
                                    </div>

                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="category" className='text-slate-500 lg:text-2xl md:text-2xl sm:text-2xl text-xl'>Select a category:</label>
                                    <select value={category} onChange={(e) => { setCategory(e.target.value) }} className='bg-black px-1 py-3 border border-slate-500 focus:border-slate-600 rounded-md field mt-4 mb-8'>
                                        {/* Mapping over the categories array to create dropdown options */}
                                        <option>Select the category</option>
                                        {blogCategories.map((category, index) => (
                                            <option key={index} value={category.name} className='bg-black py-2'>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="category" className='text-slate-500 lg:text-2xl md:text-2xl sm:text-2xl text-xl'>Text editor :</label>
                                    <div className='mt-4'>
                                        <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} formats={formats} placeholder="Write something amazing..." />
                                    </div>
                                </div>

                                <div>
                                    <button type='submit' disabled={Disable} className={`border cursor-pointer ${Disable ? " opacity-60 cursor-not-allowed" : ""} text-slate-400 hover:text-white duration-300 lg:py-2 md:py-2 py-1 w-full rounded-md border-slate-600 mt-16 shadow-inner shadow-blue-500 text-xl`}>Update</button>
                                </div>

                            </div>
                        </form>
                }
            </div>
        </>
    )
}