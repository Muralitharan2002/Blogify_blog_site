import Skeleton from "./Skeleton";

export default function loading() {
    return (
        <>
            <div className="flex justify-center mx-auto">
                <div className="w-[90%]">
                    <div className="mt-12 flex justify-between flex-wrap  gap-5">
                        <Skeleton className=" flex-grow" />
                        <Skeleton className=" flex-grow" />
                        <Skeleton className=" flex-grow" />
                        <Skeleton className=" flex-grow" />
                        <Skeleton className=" flex-grow" />
                        <Skeleton className=" flex-grow" />
                    </div>
                </div>
            </div>
        </>
    )
}