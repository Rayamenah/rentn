import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SlLocationPin } from "react-icons/sl";
import { TbArrowLeft } from "react-icons/tb";
import SearchFilter from "../components/filter/searchFilter";


const Search = () => {
    const router = useRouter();
    const goBack = () => {
        router.back();
    };


    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <>
            <Head>
                <title>rentn search house </title>
                <meta
                    name="description"
                    content="search for avaliable houses"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    href="/rentnLogo.svg"
                />
            </Head>
            <section className="w-full h-full">
                <div className="flex h-10 px-2 items-center">
                    <div className="w-1/3 flex items-center pl-4">
                        <button onClick={goBack}>
                            <TbArrowLeft className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="w-2/3 h-10 pl-4 flex items-center font-bold">
                        <p>Showing 8/8</p>
                    </div>
                    <button className="w-8 h-8 border sm:hidden">
                        |||
                    </button>
                </div>
                <section className="flex h-full py-10">
                    <div className="hidden w-1/3 sm:flex justify-center">
                        <div className="flex justify-center mt-2 items-start w-[20rem]">
                            <SearchFilter />
                        </div>
                    </div>

                    <div className="w-full h-[70vh] p-2 gap-3 flex justify-center md:justify-around flex-wrap md:w-2/3 overflow-y-scroll">
                        {/* card */}
                        {arr.map((item) => (
                            <section
                                key={item}
                                className="w-[48%] h-[14rem] sm:w-1/2 sm:h-[13rem] box-border border rounded-lg md:w-[30%]"
                            >
                                <div className="w-full h-[70%] relative">
                                    <Image
                                        src="/whatsapp_img1.svg"
                                        alt="house-image"
                                        fill
                                    />
                                </div>
                                <Link
                                    href={`/apartment/${item}`}
                                    className="p-1 flex justify-between ">
                                    <div>
                                        <p className="text-[0.7rem] sm:text-sm">
                                            Self Contain
                                        </p>
                                        <div className="flex items-center gap-1">
                                            <SlLocationPin className="w-2 sm:w-3" />
                                            <p className="text-[0.6rem] sm:text-[0.7rem]">
                                                Health center road
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[0.7rem] sm:text-sm">
                                            N180,000
                                        </p>
                                        <p className="text-[0.6rem] sm:text-[0.7rem] text-gray-500">
                                            per annum
                                        </p>
                                    </div>
                                </Link>
                            </section>
                        ))}
                    </div>
                </section>
            </section>
        </>
    );
};

export default Search;
