import Link from 'next/link'
import React from 'react'
import { SlLocationPin } from 'react-icons/sl'
import Image from "next/image"
type Props = {
    arr: number[]
}

const Carousel = ({ arr }: Props) => {
    return (
        <div className="flex gap-2 overflow-x-scroll whitespace-nowrap">
            {arr.map((item: number) => (
                <section
                    key={item}
                    className="w-full h-[14rem] sm:w-1/2 sm:h-[13rem] box-border border rounded-lg md:w-[30%]"
                >
                    <div className="w-full h-[70%] relative">
                        <Image src="/whatsapp_img1.svg" alt="house-image" fill />
                    </div>
                    <Link
                        href={`/apartment/${item}`}
                        className="p-1 flex justify-between "
                    >
                        <div>
                            <p className="text-[0.7rem] sm:text-sm">Self Contain</p>
                            <div className="flex items-center gap-1">
                                <SlLocationPin className="w-2 sm:w-3" />
                                <p className="text-[0.6rem] sm:text-[0.7rem]">
                                    Health center road
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-[0.7rem] sm:text-sm">N180,000</p>
                            <p className="text-[0.6rem] sm:text-[0.7rem] text-gray-500">
                                per annum
                            </p>
                        </div>
                    </Link>
                </section>
            ))}

        </div>
    )
}

export default Carousel