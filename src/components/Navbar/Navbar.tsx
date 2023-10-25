import Link from "next/link"
import { useState } from "react"

const Navbar = () => {
    const [select, setSelect] = useState('')
    return (
        <nav className='w-full px-10 py-4 flex justify-between items-center'>
            <Link
                href='/'
                className='font-bold text-xl'>
                rent'n
            </Link>
            <Link
                href="/"
                //TODO: rent a house is supposed to randomly fetch a list of apartments for you with different locations. So for now, it just return the index page
                onClick={() => setSelect('rent')}
                className={`text-xs sm:text-sm ${select === 'rent' ? 'underline font-semibold ' : ''}`}
            >Rent a house</Link>
            <Link
                href="/agent"
                onClick={() => setSelect('agent')}
                className={`text-xs sm:text-sm ${select === 'agent' ? 'underline font-semibold' : ''}`}
            >Agent</Link>
        </nav>
    )
}
export default Navbar