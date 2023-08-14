import Link from "next/link"
import Filter from "../Filter/Filter"
const Landing = () => {
    return (
        <section className=' flex justify-center items-center sm:justify-center flex-col gap-3 md:gap-8'>

            {/* hero section */}
            <div className='hidden w-full md:flex justify-end px-4'>
                <img src='Component 11.svg' className="w-10" />
            </div>
            <div className='text-black bg-[url(/Group 10.svg)] text-4xl flex justify-center items-center p-4 sm:text-3xl md:text-7xl font-extrabold text-center border h-40 md:p-10 md:h-[300px]'>
                Find your ideal home for rent in a few clicks
            </div>

            {/* filter */}
            <Filter />

            <p className='text-center text-xs'>Own a house for rent? <Link href='/Authentication' className='text-gray-700 underline cursor-pointer'>Sign up</Link></p>
        </section >

    )
}
export default Landing




