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
            <div className='flex justify-between gap-4 '>
                <Link
                    href="/Search"
                    onClick={() => setSelect('rent')}
                    className={`text-xs sm:text-sm ${select === 'rent' ? 'underline font-semibold ' : ''}`}
                >Rent a house</Link>
                <Link
                    href="/Agent"
                    onClick={() => setSelect('agent')}
                    className={`text-xs sm:text-sm ${select === 'agent' ? 'underline font-semibold' : ''}`}
                >Agent</Link>
            </div>
        </nav>
    )
}
export default Navbar