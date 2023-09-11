import { useRouter } from 'next/router';
import { useState } from 'react';
import { TbArrowLeft } from 'react-icons/tb';
import Location from '@/components/Listing/Location';
import Features from '@/components/Listing/Features';
import Images from '@/components/Listing/Images';

const Agent = () => {
    const [formDetails, setFormDetails] = useState({
        name: '',
        community: 'iterigbi',
        houseType: 'bedsitter',
        address: '',
        description: ''
    });
    const [progressBar, setProgressBar] = useState(10);
    const [nextModal, setNextModal] = useState(0);
    // console.log(nextModal);

    const router = useRouter()
    const goBack = () => {
        router.back()
    }

    function formUpdate(key: number, newvalue: number) {
        setFormDetails((item) => ({ ...item, [key]: newvalue }));
    }

    function progress() {
        // moving progress bar
        if (progressBar == 10) {
            setProgressBar(progressBar + 40);
        }
        if (progressBar == 50) {
            setProgressBar(progressBar + 50)
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
            setProgressBar(progressBar - 40)
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

    const modalContents = [
        { modal: <Location form={formDetails} setForm={setFormDetails} progress={progress} /> },
        { modal: <Features progress={progress} regress={regress} /> },
        { modal: <Images progress={progress} regress={regress} /> },
        //     { modal: <SucessModal formDetails={formDetails} setShowModal={setShowModal} />},
    ];

    const canNext = [formDetails.name, formDetails.houseType, formDetails.community, formDetails.address].every(Boolean)

    return (
        <section className='flex flex-col gap-y-3'>
            <div className='flex h-10 px-2 justify-between items-center'>
                <div className='w-1/3 flex items-center pl-4'>
                    <button onClick={goBack}>
                        <TbArrowLeft className='w-6 h-6' />
                    </button>
                </div>
                <div className='w-2/3 h-10 pl-4 flex items-center font-bold'>
                    <p>Create new Listing</p>
                </div>
                <div />
            </div>

            {/* Progress Bar */}
            {nextModal < 3 && (
                <>
                    <div className='relative w-[90%] mx-auto'>
                        <div className='mx-auto h-[2px] border'>
                            <div
                                style={{
                                    width: progressBar + '%',
                                    height: '2px',
                                    background: 'black',
                                    transition: 'width 0.5s'
                                }}
                            />

                        </div >
                        <div className={`absolute transition-all -top-full left-[10%] w-2 h-2 rounded-full ${(progressBar >= 10) ? 'bg-black w-3 h-3 -top-[200%]' : 'bg-gray-400'} `} />
                        <div className={`absolute transition-all -top-full left-[50%] w-2 h-2 rounded-full ${(progressBar >= 50) ? 'bg-black w-3 h-3 -top-[200%]' : 'bg-gray-400'} `} />
                        <div className={`absolute transition-all -top-full left-[90%] w-2 h-2 rounded-full ${(progressBar == 100) ? 'bg-black w-3 h-3 -top-[200%]' : 'bg-gray-400'} `} />
                    </div>
                    <div className='w-[90%] m-auto flex text-[0.6rem] justify-around'>
                        <p>Hostel info</p>
                        <p>Pricing</p>
                        <p>Images & videos</p>
                    </div>
                </>
            )}

            {/* Modal Contents */}
            <section>
                {modalContents[nextModal].modal}
            </section>
            {/* Next Button */}
            {/* Rendering different buttons depending on the displayed modal components  */}
            {/* <div className=''>
                {nextModal == 0 ? (
                    <button
                        className=' '
                        onClick={() => progress()}
                    >
                        Next
                    </button>
                ) : nextModal == 1 ? (
                    <button
                        className=' '
                        onClick={() => progress()}
                        disabled={!canNext}
                    >
                        Next
                    </button>
                )
                    : nextModal == 2 ? (
                        <button
                            className=' '
                        // onClick={() => bookAppointment()}
                        >
                            Book
                        </button>
                    ) : (
                        ''
                    )}
            </div> */}
        </section>
    )
}

export default Agent
