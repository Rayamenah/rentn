import React from 'react'

type Props = {
    nextModal: number,
    progressBar: number
}
const DesktopProgressBar = ({ nextModal, progressBar }: Props) => {
    return (
        <>
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
        </>
    )
}

export default DesktopProgressBar