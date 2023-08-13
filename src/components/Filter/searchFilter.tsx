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
import { SlLocationPin } from "react-icons/sl"


type SliderProps = React.ComponentProps<typeof Slider>

type filterType = {
    community: string;
    houseType: string;
}

const SearchFilter = ({ className }: SliderProps) => {
    const [price, setPrice] = useState(340)
    const [filter, setFilter] = useState<filterType>({
        community: 'iterigbi',
        houseType: 'bedsitter',
    })

    const changeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    console.log(filter)

    return (
        <div
            className="border w-[90%] rounded-lg ">
            <div className=" w-full border ">
                <div className="m-1 flex gap-2">
                    <SlLocationPin className='w-3 ' />
                    <p className="text-xs text-gray-700">Search axis</p>
                </div>
                <div className="m-1 flex justify-center">
                    <Select
                        name='community'
                        value={filter.houseType}
                    // onValueChange={() => (changeValue)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Community" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Communities</SelectLabel>
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
            <div className="w-full border">
                <div className="m-1 flex gap-2">
                    <img className='w-3' src='/chevron-right.svg' />
                    <p className="text-xs text-gray-700">Type of house</p>
                </div>
                <div className="m-1 flex justify-center">
                    <Select
                        value={filter.houseType}
                        name='houseType'
                        onValueChange={() => (changeValue)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select house type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>House type</SelectLabel>
                                <SelectItem value="Okuokoko">Bedsitter</SelectItem>
                                <SelectItem value="Iterigbi">Self Contain</SelectItem>
                                <SelectItem value="Ugbomro">2 Bedroom</SelectItem>
                                <SelectItem value="Ugolo">3 Bedroom</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='flex-1'>
                <div className="p-2  flex flex-col items-center justify-center border-b-black">
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
                    <button className='h-full p-2 w-1/2  bg-gray-500 rounded-lg text-sm text-gray-700'>Search</button>
                </div>
            </div>
        </div>
    )
}

export default SearchFilter