import { useRouter } from "next/router";
import { TbArrowLeft } from "react-icons/tb"
import Image from "next/image"

type Props = {}

const Apartment = (props: Props) => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };
    return (
        <section className='p-2'>
            <aside className="relative flex p-2 ml-4 justify-left items-center">
                <div className="absolute left-0 top-2 flex items-center">
                    <button onClick={goBack}>
                        <TbArrowLeft className="w-6 h-6" />
                    </button>
                </div>
                <div className="ml-14">
                    <p className='font-bold text-base'>The Cottage Lodge</p>
                    <p className='font-semibold text-xs'>17 River road beside RCF fupre</p>
                </div>
            </aside>

            <aside>
                <div className='flex h-[35rem] gap-2 rounded-lg'>
                    <div className='w-full sm:w-[60%] relative'>
                        <Image src="/whatsapp_img1.svg" alt='apartment image' fill />
                    </div>

                    <div className='flex flex-col gap-2 flex-grow'>
                        <div className='h-[17.5rem] border relative'>
                            <Image src="/whatsapp_img1.svg" alt='apartment image' fill />
                        </div>
                        <div className='h-[17.5rem] border relative'>
                            <Image src="/whatsapp_img1.svg" alt='apartment image' fill />
                        </div>
                    </div>
                </div>
            </aside>

            <aside>

            </aside>

        </section>

    )
}

export default Apartment