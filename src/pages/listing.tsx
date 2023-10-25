import DesktopProgressBar from "@/components/Listing/DesktopProgressBar";
import Features from "@/components/Listing/Features";
import Images from "@/components/Listing/Images";
import Location from "@/components/Listing/Location";
import MobileProgressBar from "@/components/Listing/MobileProgressBar";
import { listingType } from "dto/form.dto";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { TbArrowLeft } from "react-icons/tb";

const Listing = () => {
    const [formDetails, setFormDetails] =
        useState<listingType>({
            name: "",
            community: "iterigbi",
            houseType: "bedsitter",
            address: "",
            description: "",
            price: "",
            tenure: "",
            features: {
                bedroom: true,
                toilet: true,
                guestRoom: false,
                parkingSpace: false,
            },
            images: [],
        });
    const [progressBar, setProgressBar] = useState(10);
    const [nextModal, setNextModal] = useState(0);

    const router = useRouter();

    // console.log(formDetails);

    const goBack = () => {
        router.back();
    };

    function progress() {
        // moving progress bar
        if (progressBar == 10) {
            setProgressBar(progressBar + 40);
        }
        if (progressBar == 50) {
            setProgressBar(progressBar + 50);
        }
        // changing the modal contents
        if (nextModal < 2) {
            setNextModal(nextModal + 1);
        }
    }
    function regress() {
        // moving progress bar
        if (progressBar == 100) {
            setProgressBar(progressBar - 50);
        }
        if (progressBar == 50) {
            setProgressBar(progressBar - 40);
        }
        //changing the modal contents
        if (nextModal > 0) {
            setNextModal(nextModal - 1);
        }
    }

    function submitListing() {
        // add submission here
        setNextModal(nextModal + 1);
    }

    // switch components when buttoons are pressed
    const modalContents = [
        {
            modal: (
                <Location
                    form={formDetails}
                    setForm={setFormDetails}
                />
            ),
        },
        {
            modal: (
                <Features
                    features={formDetails}
                    setFeatures={setFormDetails}
                    price={formDetails.price}
                    setPrice={setFormDetails}
                    tenure={formDetails.tenure}
                />
            ),
        },
        {
            modal: (
                <Images
                    image={formDetails.images}
                    setImage={setFormDetails}
                />
            ),
        },
        //     { modal: <SucessModal formDetails={formDetails} setShowModal={setShowModal} />},
    ];

    const canNext = [
        formDetails.name,
        formDetails.houseType,
        formDetails.community,
        formDetails.address,
    ].every(Boolean);

    return (
        <>
            <Head>
                <title>rentn house listing</title>
                <meta name="description" content="create a new house listing" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/rentnLogo.svg" />
            </Head>
            <section className="relative flex-grow sm:flex">

                {/* first half shows on larger screen hidden in mobile devices*/}
                <aside className="hidden sm:flex sm:p-5 sm:flex-col sm:w-[45%] sm:gap-10 bg-black text-white ">
                    <div className="relative flex h-10 px-2 justify-center items-center">
                        <div className="absolute left-0 top-2 flex items-center">
                            <button onClick={goBack}>
                                <TbArrowLeft className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="w-2/3 text-center font-bold">
                            <p>Create new Listing</p>
                        </div>
                        <div />
                    </div>
                    {/* desktop progress bar */}
                    <DesktopProgressBar nextModal={nextModal} progressBar={progressBar} />
                </aside>


                <aside className="relative h-full flex flex-col gap-y-3 sm:w-[60%]">
                    <div className="flex h-10 px-2 justify-center items-center sm:hidden">
                        <div className="hidden sm:w-1/3 sm:flex sm:items-center sm:pl-4">
                            <button onClick={goBack}>
                                <TbArrowLeft className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="h-10 pl-4 flex items-center font-bold">
                            <p>Create new Listing</p>
                        </div>
                    </div>

                    {/* mobile Progress Bar */}
                    <MobileProgressBar nextModal={nextModal} progressBar={progressBar} />

                    {/* Modal Contents */}
                    <section className="">
                        {modalContents[nextModal].modal}
                    </section>

                    {/* navigation button */}
                    <div className='absolute left-0 bottom-14 w-full'>
                        {nextModal == 0 ? (
                            <div className="flex justify-around p-4">
                                <button
                                    className="p-1 rounded-lg"
                                    disabled
                                />
                                <button
                                    className="bg-black text-white border p-1 rounded-lg"
                                    onClick={() => progress()}
                                    disabled={!canNext}
                                >
                                    Next
                                </button>
                            </div>
                        ) : nextModal == 1 ? (
                            <div className="flex justify-around p-4">
                                <button
                                    onClick={regress}
                                    className="border border-black w-10 rounded-lg"
                                >
                                    <img src="/chevron-right.svg" />
                                </button>
                                <button
                                    className="bg-black text-white border p-1 rounded-lg"
                                    onClick={() => progress()}
                                >
                                    Next
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-around p-4">
                                <button
                                    onClick={regress}
                                    className="border border-black w-10 rounded-lg"
                                >
                                    <img src="/chevron-right.svg" />
                                </button>

                                {nextModal == 2 && (
                                    <button
                                        className="border bg-black text-white p-1 rounded-lg"
                                        onClick={() => submitListing}
                                    // disabled={!canNext}
                                    >
                                        Create listing
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </aside>
            </section>
        </>
    );
};

export default Listing;
