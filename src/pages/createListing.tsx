import Features from "@/components/Listing/Features";
import Images from "@/components/Listing/Images";
import Location from "@/components/Listing/Location";
import { listingType } from "dto/form.dto";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { TbArrowLeft } from "react-icons/tb";

const Agent = () => {
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

    console.log(formDetails);

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
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className="h-[90vh] sm:flex sm:border sm:border-black">
                {/* first half shows on larger screen hidden in mobile devices*/}
                <aside className="relative hidden sm:flex sm:p-5 sm:flex-col sm:w-[45%] sm:gap-10 bg-black text-white ">
                    <div className="flex h-10 px-2 justify-between items-center">
                        <div className="w-1/3 flex items-center pl-4">
                            <button onClick={goBack}>
                                <TbArrowLeft className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="w-2/3 h-10 pl-4 flex items-center font-bold">
                            <p>Create new Listing</p>
                        </div>
                        <div />
                    </div>

                    {nextModal < 3 && (
                        <div className="flex h-[200px]">
                            <div className="relative w-[2px] ml-4 bg-gray-500">
                                <span
                                    className={`absolute transition-all top-[5%]  w-2 h-2 rounded-full ${progressBar >= 10
                                        ? "bg-black border-white border w-3 h-3 -left-[200%]"
                                        : "bg-gray-500 -top-full"
                                        } `}
                                />
                                <span
                                    className={`absolute transition-all top-[50%] w-2 h-2 rounded-full -left-[100%] ${progressBar >= 50
                                        ? "bg-black border-white border w-3 h-3 -left-[220%]"
                                        : "bg-gray-500 -top-full"
                                        } `}
                                />
                                <span
                                    className={`absolute transition-all top-[90%] w-2 h-2 rounded-full -left-[100%] ${progressBar == 100
                                        ? "bg-black border-white border w-3 h-3 -left-[220%]"
                                        : "bg-gray-500 -top-full"
                                        } `}
                                />
                            </div>

                            <div className="ml-4 relative text-[0.6rem] w-40 ">
                                <p
                                    className={`absolute top-[5%] left-0  ${nextModal >= 0
                                        ? "text-xs font-semibold"
                                        : "text-gray-300"
                                        }`}
                                >
                                    Hostel info
                                </p>
                                <p
                                    className={`absolute top-[49%] left-0  ${nextModal >= 1
                                        ? "text-xs font-semibold"
                                        : "text-gray-300"
                                        }`}
                                >
                                    Features & Pricing
                                </p>
                                <p
                                    className={`absolute top-[89%] left-0  ${nextModal == 2
                                        ? "text-xs font-semibold"
                                        : "text-gray-300"
                                        }`}
                                >
                                    Images & videos
                                </p>
                            </div>
                        </div>
                    )}
                </aside>
                <aside className="flex flex-col gap-y-3 sm:w-[60%]">
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

                    {/* Progress Bar */}
                    {nextModal < 3 && (
                        <div className="sm:hidden">
                            <div className="relative w-[90%] mx-auto">
                                <div className="mx-auto h-[2px] border">
                                    <div
                                        style={{
                                            width: progressBar + "%",
                                            height: "2px",
                                            background: "black",
                                            transition: "width 0.5s",
                                        }}
                                    />
                                </div>

                                <span
                                    className={`absolute transition-all left-[10%] w-2 h-2 rounded-full ${progressBar >= 10
                                        ? "bg-black w-3 h-3 -top-[200%]"
                                        : "bg-gray-400 -top-full"
                                        } `}
                                />
                                <span
                                    className={`absolute transition-all left-[50%] w-2 h-2 rounded-full ${progressBar >= 50
                                        ? "bg-black w-3 h-3 -top-[200%]"
                                        : "bg-gray-400 -top-full"
                                        } `}
                                />
                                <span
                                    className={`absolute transition-all left-[90%] w-2 h-2 rounded-full ${progressBar == 100
                                        ? "bg-black w-3 h-3 -top-[200%]"
                                        : "bg-gray-400 -top-full"
                                        } `}
                                />
                            </div>

                            <div className="mt-2 relative w-[90%] m-auto flex text-[0.6rem] justify-around">
                                <p
                                    className={`absolute left-[5%] top-0 md:left-[9%] ${nextModal >= 0
                                        ? "text-black font-semibold"
                                        : ""
                                        }`}
                                >
                                    Hostel info
                                </p>
                                <p
                                    className={`absolute left-[40%] top-0 md:left-[47%] ${nextModal >= 1
                                        ? "text-black font-semibold"
                                        : ""
                                        }`}
                                >
                                    Features & Pricing
                                </p>
                                <p
                                    className={`absolute left-[83%] top-0 md:left-[87%] ${nextModal == 2
                                        ? "text-black font-semibold"
                                        : ""
                                        }`}
                                >
                                    Images & videos
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Modal Contents */}
                    <section className="h-[60vh]">
                        {modalContents[nextModal].modal}
                    </section>

                    {/* navigation button */}
                    {nextModal == 0 ? (
                        <div className="flex justify-around p-4">
                            <button
                                className="p-1 rounded-lg"
                                disabled
                            ></button>
                            <button
                                className="border p-1 rounded-lg"
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
                                className="border p-1 rounded-lg"
                                onClick={() => progress()}
                            // disabled={!canNext}
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
                </aside>
            </section>
        </>
    );
};

export default Agent;
