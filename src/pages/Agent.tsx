import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Agent = () => {
    return (
        <>
            <Head>
                <title>rentn agent page</title>
                <meta
                    name="description"
                    content="rentn agent page"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </Head>
            <section className="relative p-4">
                <div className="flex justify-between items-center">
                    <p className="text-base font-bold">
                        Your Listings
                    </p>
                    <div className="border border-black p-1 rounded-lg text-xs sm:text-sm font-semibold">
                        Emmanuel Peterson <span></span>
                    </div>
                </div>
                <br />
                <div className="relative h-full p-24 border flex justify-center">
                    <div className="flex justify-center flex-col ">
                        <Image
                            className="m-auto"
                            src="/Group 10.svg"
                            alt="listing"
                            width={100}
                            height={100}
                        />
                        <p className="text-center font-semibold text-[0.6rem] sm:text-sm">
                            You have uploaded no listings yet, click on
                            the + icon to add a listing
                        </p>
                    </div>

                    <div className="absolute bottom-5 right-5 flex justify-end">
                        <div className="flex flex-col justify-center">
                            <Link href="/createListing">
                                <Image
                                    className="m-auto"
                                    src="/Component 11.svg"
                                    alt="listing"
                                    width={30}
                                    height={30}
                                />
                            </Link>

                            <p className="text-xs font-semibold">
                                Add new listing
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Agent;
