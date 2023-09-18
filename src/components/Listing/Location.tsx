import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { listingType } from "dto/form.dto";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
    form: listingType;
    setForm: Dispatch<SetStateAction<listingType>>;
};

const Location = ({ form, setForm }: Props) => {
    const onChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        //update form state
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    return (
        <aside className="w-full flex justify-center">
            <form className="relative w-[80%] max-w-xl flex justify-center flex-col gap-2 p-4">
                <label
                    htmlFor="name"
                    className="text-xs font-semibold"
                >
                    NAME
                </label>
                <input
                    className="max-w-xl h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none"
                    type="text"
                    name="name"
                    placeholder="short descriptive name of house"
                    required
                    value={form.name}
                    onChange={onChange}
                />
                <label
                    htmlFor="house type"
                    className="text-xs font-semibold"
                >
                    HOUSE TYPE
                </label>
                <Select
                    required
                    name="houseType"
                    onValueChange={(item) =>
                        setForm((prev) => ({
                            ...prev,
                            houseType: item,
                        }))
                    }
                >
                    <SelectTrigger className="w-full border-b-black rounded-none shadow-non">
                        <SelectValue placeholder="Select house type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>House type</SelectLabel>
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
                <label
                    htmlFor="community"
                    className="text-xs font-semibold"
                >
                    COMMUNITY
                </label>
                <Select
                    required
                    name="community"
                    onValueChange={(item) =>
                        setForm((prev) => ({
                            ...prev,
                            community: item,
                        }))
                    }
                >
                    <SelectTrigger className="w-full border-b-black rounded-none shadow-none">
                        <SelectValue placeholder="Select Community" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Communities</SelectLabel>
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
                <label
                    htmlFor="address"
                    className="text-xs font-semibold"
                >
                    ADDRESS
                </label>
                <input
                    className="max-w-xl h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none"
                    type="text"
                    name="address"
                    placeholder="No 12 Kings way Ugbomro road"
                    required
                    value={form.address}
                    onChange={onChange}
                />
                <label
                    htmlFor="description"
                    className="text-xs font-semibold"
                >
                    DESCRIPTION
                </label>
                <input
                    className="max-w-xl h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none"
                    type="text"
                    name="description"
                    placeholder="short descriptive name of house"
                    required
                    value={form.description}
                    onChange={onChange}
                />
            </form>
        </aside>
    );
};

export default Location;
