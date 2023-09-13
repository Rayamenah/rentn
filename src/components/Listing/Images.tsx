import { useRef, useState } from "react";
import Image from "next/image"

type Props = {
    progress: () => void;
    regress: () => void
}

export default function Images({ regress }: Props) {
    const [image, setImage] = useState<File[]>([])

    const selectedFileRef = useRef<HTMLInputElement>(null)

    console.log(image)

    const selectedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) setImage(Array.from(files))
    }

    return (
        <section>
            <aside className='flex justify-center items-center p-10'>
                {/* {image ?
                    (<div>
                        {image.map(item => (
                            <Image key={item.name} src={item.name} alt='uploaded-image' width={50} height={50} />
                        ))}
                    </div>) : */}
                <div
                    onClick={() => selectedFileRef.current?.click()}
                    className='h-full py-20 px-12 flex justify-center border border-black rounded-lg cursor-pointer'>
                    <input
                        ref={selectedFileRef}
                        type='file'
                        accept='.jpg,.png'
                        multiple
                        hidden
                        onChange={selectedFile}
                    />
                    <img src='/Vector.png' />
                    <p className='font-semibold text-sm'>cick to add images/videos</p>
                </div>
            </aside>
        </section>


    )
}