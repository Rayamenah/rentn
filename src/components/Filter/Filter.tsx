import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { useState } from "react"


type SliderProps = React.ComponentProps<typeof Slider>

type filterType = {
    community: string;
    houseType: string;
}

const Filter = ({ className }: SliderProps) => {
    const [price, setPrice] = useState(340)
    const [community, setCommunity] = useState('iterigbi')
    const [house, setHouse] = useState('Bedsitter')

    // const [filter, setFilter] = useState<filterType>({
    //     community: 'iterigbi',
    //     houseType: 'bedsitter',
    // })

    // console.log(community)
    // console.log(filter.houseType)

    // const changeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    // }



    // console.log(filter)

    return (
        <div
            className="border border-black w-[90%] md:flex rounded-lg ">
            <div className=" w-full md:w-1/4 border border-b-black md:flex md:border  md:border-r-black md:border-b-0 md:flex-col">
                <div className="m-1 flex gap-2">
                    <img className='w-3' src='/chevron-right.svg' />
                    <p className="text-xs text-gray-700">Search axis</p>
                </div>
                <div className="m-1 flex justify-center">
                    <Select
                        name='community'
                        // defaultValue={community}
                        // value={community}
                        onValueChange={(item) => setCommunity(item)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={community} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Iterigbi">Iterigbi</SelectItem>
                                <SelectItem value="Ugbomro">Ugbomro</SelectItem>
                                <SelectItem value="Ugolo">Ugolo</SelectItem>
                                <SelectItem value="Okuokoko">Okuokoko</SelectItem>
                                <SelectItem value="Agbarho">Agbarho</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="w-full md:w-1/4 border border-b-black md:flex md:border md:border-r-black md:border-b-0 md:flex-col">
                <div className="m-1 flex gap-2">
                    <img className='w-3' src='/chevron-right.svg' />
                    <p className="text-xs text-gray-700">Type of house</p>
                </div>
                <div className="m-1 flex justify-center">
                    <Select
                        // value={house}
                        // defaultValue={house}
                        name='houseType'
                        onValueChange={(item) => setHouse(item)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={house} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Okuokoko">Bedsitter</SelectItem>
                                <SelectItem value="Iterigbi">Self Contain</SelectItem>
                                <SelectItem value="Ugbomro">2 Bedroom</SelectItem>
                                <SelectItem value="Ugolo">3 Bedroom</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='flex-1 lg:flex'>
                <div className="p-2 lg:w-3/4 flex flex-col items-center justify-center border-b-black md:flex md:border-b-0 md:flex-col">
                    <div className="m-1 w-full">
                        <p className="text-xs text-gray-700">Annual rent: {price == 1000 ? '1m' : price + 'k'}</p>
                    </div>
                    <div className="m-1 text-[10px] flex justify-center gap-2 w-full">
                        <p>100k</p>
                        <Slider
                            value={[price]}
                            min={100}
                            max={1000}
                            step={1}
                            className={cn("w-full", className)}
                            onValueChange={(value: number[]) => setPrice(value[0])}
                        />
                        <p>1m</p>
                    </div>
                </div>
                <div className='flex p-2 flex-1 justify-center items-center'>
                    <button className='h-full p-2 w-1/2 lg:w-full lg:p-0 bg-gray-500 rounded-lg text-sm text-gray-700'>Search</button>
                </div>
            </div>
        </div>
    )
}

export default Filter