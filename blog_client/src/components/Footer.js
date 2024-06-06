export default function Footer() {
    return (
        <>
            <div className="mt-16 text-slate-600">
                <div className="h-[1px] bg-slate-800 mt-0"></div>
                <div className="flex items-center justify-around  lg:flex-row md:flex-row sm:flex-row flex-col gap-5 my-4">
                    <div>
                        Made by Muralitharan S
                    </div>
                    <div className="bg-bgtext bg-[length:100px_100px] bg-clip-text text-transparent text-3xl">
                        Blogify
                    </div>
                    <div className="">
                        &#169; 2024 Blogify. All rights reserved.
                    </div>
                </div>
            </div>
        </>
    )
}