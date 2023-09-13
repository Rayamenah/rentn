
import { useState } from "react"
// import { toast } from "@/components/ui/use-toast"

// const items = [
//     {
//         id: "bedrooms",
//         label: "Bedroom(s)",
//     },
//     {
//         id: "toilet",
//         label: "Toilet",
//     },
//     {
//         id: "guest room",
//         label: "Guest rooms",
//     },
//     {
//         id: "parking space",
//         label: "Parking space",
//     },

// ] as const


type Props = {
    progress: () => void;
    regress: () => void
}

export default function Features({ progress, regress }: Props) {
    const [checkedValues, setCheckedValues] = useState({
        bedroom: true,
        toilet: true,
        guestRoom: false,
        parkingSpace: false
    })
    const [price, setPrice] = useState(2000)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setCheckedValues({ ...checkedValues, [name]: checked })
    }

    return (
        <section className='p-8 md:flex md:justify-center' >

            <section className='w-[50%] flex flex-col'>
                <div className="flex text-base font-bold">FEATURES OF HOUSE</div>
                <br />
                <label>
                    <input className='mr-2 text-black' type='checkbox' name='bedroom' checked={checkedValues.bedroom} onChange={handleChange} />
                    Bedroom(s)
                </label>
                <label>
                    <input className='mr-2 text-black' type='checkbox' name='toilet' checked={checkedValues.toilet} onChange={handleChange} />
                    Toilet
                </label>
                <label>
                    <input className='mr-2 text-black' type='checkbox' name='guestRoom' checked={checkedValues.guestRoom} onChange={handleChange} />
                    Guest room(s)
                </label>
                <label>
                    <input className='mr-2 text-black' type='checkbox' name='parkingSpace' checked={checkedValues.parkingSpace} onChange={handleChange} />
                    Parking space
                </label>
                <br />
                <aside>
                    <p className='text-base font-bold'>PRICING</p>
                    <div className='flex justify-between items-center max-w-sm'>
                        <p className='text-sm font-semibold'>Annual Rent</p>
                        <input
                            className='max-w-[7rem] w-[7rem] h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none'
                            type='number'
                            name='description'
                            placeholder='Enter amount'
                            required
                            value={price}
                        // onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </aside>
            </section>

        </section>
    )
}
