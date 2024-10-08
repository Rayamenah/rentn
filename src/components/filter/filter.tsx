import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

type SliderProps = React.ComponentProps<typeof Slider>;

type filterType = {
    community: string;
    houseType: string;
};

const Filter = ({ className }: SliderProps) => {
    const [price, setPrice] = useState(350);
    const [community, setCommunity] = useState("iterigbi");
    const [apartmentType, setApartmentType] = useState("Bedsitter");

    const router = useRouter()
    const mutation = useMutation({
        mutationFn: async () => {
            const res = await axios.get(`/api/v1/search/?community=${community}&apartmentType=${apartmentType}&price=${price}&page=${1}`)
            const data = res.data
            return data
        }
    })

    const handleSearch = () => {
        try {
            router.push('/search')
            mutation.mutate()

        } catch (err) {
            return mutation.error?.message
        }
    }


    return (
        <div className="border border-gray-400 w-[90%] md:flex rounded-lg ">
            <div className=" w-full md:w-1/4 border border-b-gray-400 md:flex  md:border-r-gray-400 md:border-b-0 md:flex-col">
                <div className="m-1 flex gap-2">
                    <img
                        className="w-3"
                        src="/chevron-right.svg"
                    />
                    <p className="text-xs text-gray-700">
                        Search axis
                    </p>
                </div>
                <div className="m-1 flex justify-center">
                    <Select
                        name="community"
                        // defaultValue={community}
                        // value={community}
                        onValueChange={(item) => setCommunity(item)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={community} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Iterigbi">
                                    Iterigbi
                                </SelectItem>
                                <SelectItem value="Ugbomro">
                                    Ugbomro
                                </SelectItem>
                                <SelectItem value="Ugolo">Ugolo</SelectItem>
                                <SelectItem value="Okuokoko">
                                    Okuokoko
                                </SelectItem>
                                <SelectItem value="Agbarho">
                                    Agbarho
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="w-full md:w-1/4 border border-b-gray-400 md:flex md:border-r-gray-400 md:border-b-0 md:flex-col">
                <div className="m-1 flex gap-2">
                    <img
                        className="w-3"
                        src="/chevron-right.svg"
                    />
                    <p className="text-xs text-gray-700">
                        Type of house
                    </p>
                </div>
                <div className="m-1 flex justify-center">
                    <Select
                        // value={house}
                        // defaultValue={house}
                        name="houseType"
                        onValueChange={(item) => setApartmentType(item)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={apartmentType} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Okuokoko">
                                    Bedsitter
                                </SelectItem>
                                <SelectItem value="Iterigbi">
                                    Self Contain
                                </SelectItem>
                                <SelectItem value="Ugbomro">
                                    2 Bedroom
                                </SelectItem>
                                <SelectItem value="Ugolo">
                                    3 Bedroom
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex-1 lg:flex">
                <div className="p-2 lg:w-3/4 flex flex-col items-center justify-center border border-b-gray-400 md:flex md:border-b-0 md:flex-col">
                    <div className="m-1 w-full">
                        <p className="text-xs text-gray-700">
                            Annual rent:{" "}
                            <b>{price == 1000 ? "1m" : price + "k"}</b>
                        </p>
                    </div>
                    <div className="m-1 text-[10px] flex justify-center gap-2 w-full">
                        <p>100k</p>
                        <Slider
                            value={[price]}
                            min={100}
                            max={1000}
                            step={50}
                            className={cn("w-full", className)}
                            onValueChange={(value: number[]) =>
                                setPrice(value[0])
                            }
                        />
                        <p>1m</p>
                    </div>
                </div>
                <div className="flex p-2 flex-1 justify-center items-center">
                    <button
                        onClick={handleSearch}
                        className="h-full p-2 w-full lg:w-full lg:p-0 bg-gray-500 rounded-lg text-sm text-gray-900">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
