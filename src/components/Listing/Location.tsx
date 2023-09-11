import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { Dispatch, SetStateAction } from 'react';
import { SlLocationPin } from "react-icons/sl"


type Props = {
    form: formProps;
    setForm: Dispatch<SetStateAction<formProps>>;
    progress: () => void
}

type formProps = {
    name: string;
    community: string;
    houseType: string;
    address: string;
    description: string;
}

const Location = ({ form, setForm, progress }: Props) => {

    const canNext = [form.name, form.houseType, form.community, form.address, form.description].every(Boolean)

    const changeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //update form state
        setForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const onSubmit = () => {
        progress()
    }
    return (
        <section>
            <aside className='w-full flex justify-center'>
                <form onSubmit={onSubmit} className='relative w-[80%] max-w-xl flex justify-center flex-col gap-3 p-4'
                // onSubmit={handleSubmit}
                >
                    <label htmlFor='password' className='text-xs font-semibold'>NAME</label>
                    <input
                        className='max-w-xl h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none'
                        type='text'
                        name='name'
                        placeholder='short descriptive name of house'
                        required
                        value={form.name}
                        onChange={onChange}
                    />
                    <label htmlFor='house type' className='text-xs font-semibold'>HOUSE TYPE</label>
                    <Select
                        value='bedsitter'
                        name='houseType'
                    // onValueChange={() => (changeValue)}
                    >
                        <SelectTrigger className="w-full border-b-black rounded-none shadow-non">
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
                    <label htmlFor='community' className='text-xs font-semibold'>COMMUNITY</label>
                    <Select
                        name='community'
                        value={form.houseType}
                    // onValueChange={() => (changeValue)}
                    >
                        <SelectTrigger className="w-full border-b-black rounded-none shadow-none">
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
                    <label htmlFor='address' className='text-xs font-semibold'>ADDRESS</label>
                    <input
                        className='max-w-xl h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none'
                        type='text'
                        name='address'
                        placeholder='No 12 Kings way Ugbomro road'
                        required
                        value={form.address}
                        onChange={onChange}
                    />
                    <label htmlFor='description' className='text-xs font-semibold'>DESCRIPTION</label>
                    <input
                        className='max-w-xl h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none'
                        type='text'
                        name='description'
                        placeholder='short descriptive name of house'
                        required
                        value={form.description}
                        onChange={onChange}
                    />
                    <br />
                    <div className='flex justify-end'>
                        <button
                            disabled={!canNext}
                            className='border border-black w-10 rounded-lg'><img src='/chevron-right.svg' /></button>
                    </div>
                </form>
            </aside>
        </section>

    )
}

export default Location