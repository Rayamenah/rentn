import React from 'react'

type Props = {
    nextModal: number,
    progressBar: number
}

const MobileProgressBar = ({ nextModal, progressBar }: Props) => {
    return (
        <>
            {
                nextModal < 3 && (
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
                )
            }
        </>
    )
}

export default MobileProgressBar