import { listingType } from "dto/form.dto";
import { Dispatch, SetStateAction, useState } from "react";
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
    price: string;
    features: listingType;
    tenure: string;
    setPrice: Dispatch<SetStateAction<listingType>>;
    setFeatures: Dispatch<SetStateAction<listingType>>;
};

export default function Features({
    features,
    setFeatures,
    price,
    setPrice,
    tenure,
}: Props) {
    const { bedroom, toilet, guestRoom, parkingSpace } = features.features;
    // features will have to be changed from boolean to array of strings
    
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, checked } = e.target;
        setFeatures((prev) => ({
            ...prev,
            features: {
                ...prev.features,
                [name]: checked,
            },
        }));
    };

    return (
        <section className="p-8 sm:flex sm:justify-center">
            <section className="md:w-[50%] w-full flex flex-col">
                <div className="flex text-base font-bold">
                    FEATURES OF HOUSE
                </div>
                <br />
                <label>
                    <input
                        className="mr-2 text-black"
                        type="checkbox"
                        name="bedroom"
                        checked={bedroom}
                        onChange={handleChange}
                    />
                    Bedroom(s)
                </label>
                <label>
                    <input
                        className="mr-2 text-black"
                        type="checkbox"
                        name="toilet"
                        checked={toilet}
                        onChange={handleChange}
                    />
                    Toilet
                </label>
                <label>
                    <input
                        className="mr-2 text-black"
                        type="checkbox"
                        name="guestRoom"
                        checked={guestRoom}
                        onChange={handleChange}
                    />
                    Guest room(s)
                </label>
                <label>
                    <input
                        className="mr-2 text-black"
                        type="checkbox"
                        name="parkingSpace"
                        checked={parkingSpace}
                        onChange={handleChange}
                    />
                    Parking space
                </label>
                <br />
                <aside>
                    <p className="text-base font-bold">
                        PRICING & TENURE
                    </p>
                    <br />
                    <div className="flex justify-between items-center max-w-md">
                        <p className="text-sm font-semibold">
                            Annual Rent
                        </p>
                        <input
                            className="max-w-[7rem] w-[7rem] h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none"
                            type="number"
                            name="rent"
                            placeholder="Enter amount"
                            required
                            value={price}
                            onChange={(e) =>
                                setPrice((prev) => ({
                                    ...prev,
                                    price: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="flex justify-between items-center max-w-md">
                        <p className="text-sm font-semibold">Tenure</p>
                        <input
                            className="max-w-[7rem] w-[7rem] h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none"
                            type="number"
                            name="tenure"
                            placeholder="Enter amount"
                            required
                            value={tenure}
                            onChange={(e) =>
                                setPrice((prev) => ({
                                    ...prev,
                                    tenure: e.target.value,
                                }))
                            }
                        />
                    </div>
                </aside>
            </section>
        </section>
    );
}
