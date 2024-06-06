import React, { useState } from 'react';
import { SlArrowRight } from "react-icons/sl";
import blogImg from "../Assets/blog.jpg"



const Accordions = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const accordions = [
        {
            title: 'Blog beautifully',
            content: 'Customize your blog’s look and feel in a couple of clicks with beautifully designed themes. Bring your writing to life with magical drag-and-drop layouts. Or put your fingerprint on every font, color, and element on the page.',
        },
        {
            title: 'Edit easily',
            content: 'Our intuitive interface makes editing your blog posts a breeze. Customize content with simple, user-friendly tools designed for effortless modifications. Enhance your posts quickly and keep your audience engaged with seamless updates.',
        },
        {
            title: 'Share anything, simply',
            content: 'From video to audio, stories to GIFs, bring it all together right from where you write. And with plenty of storage for every type of media, your content’s secure, easy to reuse anywhere on your blog, and owned by you alone.',
        },
    ];

    return (
        <div className="relative flex items-center justify-between lg:flex-row sm:flex-col flex-col">
            <div className='lg:w-[55%] md:w-[85%] w-[98%]'>
                {accordions.map((accordion, index) => (
                    <div key={index} className={`max-w-full max-h-full border-b border-slate-800 py-16 ${index === accordions.length - 1 ? 'border-b-0' : 'border-b'}`} onClick={() => { setOpenIndex(openIndex === index ? -1 : index) }}>
                        <button className={`w-full px-4 text-white flex items-center gap-10 lg:text-[30px] md:text-[25px] text-[23px] text-left accordion`} >
                            {accordion.title}
                            <SlArrowRight className={` duration-300 ${openIndex === index ? "rotate-90" : ""}`} />
                        </button>

                        {openIndex === index &&
                            <div className="lg:pl-10 md:pl-10 sm:pl-10 pl-6 mt-8 leading-relaxed lg:text-[18px] md:text-[17px] sm:text-[16px] text-[16px] ">
                                {accordion.content}
                            </div>
                        }
                    </div>

                ))}
            </div>

            <div className='lg:w-[43%] md:w-[70%] -z-10'>
                <img src={blogImg} alt="" className='rounded-sm overflow-hidden max-w-full max-h-full my-3' />
            </div>
        </div>
    );
};

export default Accordions;
