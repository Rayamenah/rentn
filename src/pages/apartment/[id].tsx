import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SlLocationPin } from 'react-icons/sl'
import { TbArrowLeft } from 'react-icons/tb'

type Props = {}

const Apartment = (props: Props) => {
  const router = useRouter()

  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const goBack = () => {
    router.back()
  }
  return (
    <>
      <Head>
        <title>rentn apartment description</title>
        <meta name="description" content="check apartment description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/rentnLogo.svg" />
      </Head>

      <section className="p-2 flex flex-col gap-3">
        <aside className="relative flex p-2 justify-left items-center">
          <div className="absolute left-0 top-2 flex items-center">
            <button onClick={goBack}>
              <TbArrowLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="ml-14">
            <p className="font-bold text-base">The Cottage Lodge</p>
            <p className="font-semibold text-xs">
              17 River road beside RCF fupre
            </p>
          </div>
        </aside>

        {/* images */}
        <aside className=" w-full">
          <div className="flex gap-1 h-40 rounded-lg">
            <div className="w-full sm:w-[55%] relative">
              <Image src="/whatsapp_img1.svg" alt="apartment image" fill />
            </div>

            <div className="flex w-[45%] h-full flex-col gap-1 flex-grow">
              <div className="border relative h-full">
                <Image src="/whatsapp_img1.svg" alt="apartment image" fill />
              </div>
              <div className="border relative h-full">
                <Image src="/whatsapp_img1.svg" alt="apartment image" fill />
              </div>
            </div>
          </div>
        </aside>

        <aside className="flex flex-col gap-2">
          <div className="border border-gray-500 rounded-md">
            <div className="bg-black text-white w-full p-2 py-2">Features</div>
            <div className="p-2 flex gap-3 text-xs">
              <p>1 Bedroom</p>|<p>1 Toilet/bathroom</p>
            </div>
          </div>

          <div className="border border-gray-500 rounded-md">
            <div className="bg-black text-white w-full p-2 py-2">Details</div>
            <p className="text-xs p-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
              voluptatem sint quas molestias quo inventore aliquam vitae odit
              itaque saepe! Deserunt eius a ea ipsa explicabo distinctio
              quisquam eveniet ullam.
            </p>
          </div>

          <div className="bg-red-200 rounded-md p-2 py-2">
            <b>Safety Disclaimer</b>
            <ul className="text-xs">
              <li>
                Do not make any payment without seeing the agent or property
              </li>
              <li>Ensure you meet the agent in a secure and open space</li>
              <li>
                The agent does not represent Rent'n and Rent'n is not liable for
                any monetary trasaction between you and the agent
              </li>
            </ul>
          </div>
        </aside>

        <aside>
          <div className="border border-gray-500 rounded-md">
            <div className="bg-black text-white w-full p-2 py-2">Agent</div>
            <div className="p-2 py-2 gap-2">
              <div>
                <p className="text-gray-600 text-sm">Agent Name</p>
                <p className="font-semibold">Emmanuel Peterson</p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Registered</p>
                <p className="font-semibold">2 weeks ago</p>
              </div>

              <Link
                className="flex justify-center font-semibold underline"
                href=""
              >
                View Listings
              </Link>
            </div>
          </div>
        </aside>

        <aside className="border border-gray-500 rounded-md">
          <div className="bg-black text-white w-full p-2 py-2">Pricing</div>
          <div className="">
            <div className="border-b border-b-black p-2">
              <p className="text-gray-600 text-sm">Rent per year</p>
              <p className="font-semibold ">300,000</p>
            </div>

            <div className="border-b border-b-black p-2">
              <p className="text-gray-600 text-sm">Caution Fee</p>
              <p className="font-semibold ">20,000</p>
            </div>

            <div className="p-2 border-b border-b-black">
              <p className="text-gray-600 text-sm">Agent Fee</p>
              <p className="font-semibold ">10,000</p>
            </div>
          </div>
          <div className="p-4 text-right">
            <p className="text-gray-600 text-sm">Total payable in first year</p>
            <p className="font-semibold ">218,800</p>
          </div>
          <div className="flex justify-center items-center">
            <button className="m-4 p-2 px-2 rounded-md bg-black text-white">
              Show phone number
            </button>
          </div>
        </aside>
        <br />
        <hr />

        <div className="flex gap-2 overflow-x-scroll whitespace-nowrap">
          {arr.map((item) => (
            <section
              key={item}
              className="w-full h-[14rem] sm:w-1/2 sm:h-[13rem] box-border border rounded-lg md:w-[30%]"
            >
              <div className="w-full h-[70%] relative">
                <Image src="/whatsapp_img1.svg" alt="house-image" fill />
              </div>
              <Link
                href={`/apartment/${item}`}
                className="p-1 flex justify-between "
              >
                <div>
                  <p className="text-[0.7rem] sm:text-sm">Self Contain</p>
                  <div className="flex items-center gap-1">
                    <SlLocationPin className="w-2 sm:w-3" />
                    <p className="text-[0.6rem] sm:text-[0.7rem]">
                      Health center road
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[0.7rem] sm:text-sm">N180,000</p>
                  <p className="text-[0.6rem] sm:text-[0.7rem] text-gray-500">
                    per annum
                  </p>
                </div>
              </Link>
            </section>
          ))}
        </div>
      </section>
    </>
  )
}

export default Apartment
