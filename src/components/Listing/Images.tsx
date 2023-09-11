import { useRef, useState } from "react";

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
                {image ?
                    (<div>
                        {image.map(item => (
                            <img key={item.name} src={item.name} />
                        ))}
                    </div>) :
                    <div
                        onClick={() => selectedFileRef.current?.click()}
                        className='py-20 px-12 flex justify-center border border-black rounded-lg cursor-pointer'>
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
                    </div>}
            </aside>
            <br />
            <div className='w-[80%] m-auto flex justify-between items-center'>
                <button onClick={regress} className='border border-black w-10 rounded-lg'><img src='/chevron-right.svg' /></button>
                <button type='submit' className='border border-black w-10 rounded-lg'><img src='/chevron-right.svg' /></button>
            </div>



            {/* <Button variant='outline' height='20px' onClick={() => selectedFileRef.current?.click()}>
                Upload
            </Button>
            <input ref={selectedFileRef} type='file' hidden onChange={onSelectImage}
            /> */}
        </section>
    )
}