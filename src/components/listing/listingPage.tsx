import Head from 'next/head'
import React from 'react'
import { TbArrowLeft } from 'react-icons/tb'
import DesktopProgressBar from './desktopProgressBar'
import MobileProgressBar from './mobileProgressBar'

type Props = {
    goBack: () => void,
    nextModal: number
    progressBar: number,
    modalContents: any,
    progress: () => void,
    regress: () => void,
    canNext: boolean,
    submitListing: () => void

}

const ListingPage = ({ goBack, nextModal, progressBar, modalContents, progress, regress, canNext, submitListing }: Props) => {
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
                    <section className="">{modalContents[nextModal].modal}</section>

                    {/* navigation button */}
                    <div className="absolute left-0 bottom-14 w-full">
                        {nextModal == 0 ? (
                            <div className="flex justify-around p-4">
                                <button className="p-1 rounded-lg" disabled />
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
                                    onClick={() => regress}
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
                                    onClick={() => regress}
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
    )
}

export default ListingPage