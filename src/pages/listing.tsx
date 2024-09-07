import Features from '@/components/listing/features'
import ListingPage from '@/components/listing/listingPage'
import Location from '@/components/listing/location'
import Images from '@/components/listing/uploadImage'
import { listingType } from 'dto/form.dto'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Listing = () => {
  const [formDetails, setFormDetails] = useState<listingType>({
    name: '',
    community: 'iterigbi',
    houseType: 'bedsitter',
    address: '',
    description: '',
    price: '',
    tenure: '',
    features: {
      bedroom: true,
      toilet: true,
      guestRoom: false,
      parkingSpace: false,
    },
    images: [],
  })
  const [progressBar, setProgressBar] = useState(10)
  const [nextModal, setNextModal] = useState(0)

  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  function progress() {
    // moving progress bar
    if (progressBar == 10) {
      setProgressBar(progressBar + 40)
    }
    if (progressBar == 50) {
      setProgressBar(progressBar + 50)
    }
    // changing the modal contents
    if (nextModal < 2) {
      setNextModal(nextModal + 1)
    }
  }
  function regress() {
    // moving progress bar
    if (progressBar == 100) {
      setProgressBar(progressBar - 50)
    }
    if (progressBar == 50) {
      setProgressBar(progressBar - 40)
    }
    //changing the modal contents
    if (nextModal > 0) {
      setNextModal(nextModal - 1)
    }
  }

  function submitListing() {
    // add submission here
    setNextModal(nextModal + 1)
  }

  // switch components when buttoons are pressed
  const modalContents = [
    {
      modal: <Location form={formDetails} setForm={setFormDetails} />,
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
      modal: <Images image={formDetails.images} setImage={setFormDetails} />,
    },
    //     { modal: <SucessModal formDetails={formDetails} setShowModal={setShowModal} />},
  ]

  const canNext = [
    formDetails.name,
    formDetails.houseType,
    formDetails.community,
    formDetails.address,
  ].every(Boolean)

  return (
    <ListingPage
      goBack={goBack}
      nextModal={nextModal}
      progressBar={progressBar}
      modalContents={modalContents}
      progress={progress}
      regress={regress}
      canNext={canNext}
      submitListing={submitListing}
    />

  )
}

export default Listing
