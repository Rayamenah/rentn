import {
    Dispatch,
    SetStateAction,
    useRef,
    useState,
} from "react";
import Image from "next/image";
import { listingType } from "dto/form.dto";

type Props = {
    image: File[];
    setImage: Dispatch<SetStateAction<listingType>>;
    // setImage: React.Dispatch<React.SetStateAction<File[]>>
};

export default function Images({ image, setImage }: Props) {
    const selectedFileRef = useRef<HTMLInputElement>(null);

    const selectedFile = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = e.target.files;
        if (files)
            setImage((prev) => ({
                ...prev,
                images: Array.from(files),
            }));
    };

    return (
        <section className="flex justify-center items-center h-full">
            <aside className="flex justify-center items-center">
                {/* {image ?
                    (<div className='h-full'>
                        {image.map(item => (
                            <Image key={item.name} src={item.name} alt='uploaded-image' width={50} height={50} />
                        ))}
                    </div>) : */}
                <div
                    onClick={() => selectedFileRef.current?.click()}
                    className="h-full py-20 px-12 flex justify-center border border-black rounded-lg cursor-pointer"
                >
                    <input
                        ref={selectedFileRef}
                        type="file"
                        accept=".jpg,.png"
                        multiple
                        hidden
                        onChange={selectedFile}
                    />
                    <img src="/Vector.png" />
                    <p className="font-semibold text-sm">
                        cick to add images/videos
                    </p>
                </div>
            </aside>
        </section>
    );
}