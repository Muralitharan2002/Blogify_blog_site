import React from 'react'

function Filter({ category, FilterItems }) {

    return (
        <div className='text-white flex items-center lg:justify-center md:justify-center sm:justify-center gap-5 flex-wrap mt-14 px-3'>
            {
                category.map((item, key) => (
                    <div key={key} onClick={() => FilterItems(item)} className=" bg-blue-800 px-3 py-1 rounded-xl text-[17px] cursor-pointer">
                        {item}
                    </div>
                ))
            }

        </div>
    )
}

export default Filter