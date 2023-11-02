import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { authType } from "dto/form.dto";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "../ui/use-toast";

type Props = {
    setForm: Dispatch<SetStateAction<authType>>;
}

const ForgotPassword = ({ setForm }: Props) => {
    const [email, setEmail] = useState("")


    const mutation = useMutation({
        mutationFn: async () => {
            const res = await axios.post("/api/v1/auth/forgot-password", { email: email })
            const data = res.data
            return data
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            mutation.mutate()
            if (mutation.isSuccess) {
                toast({
                    title: "otp sent",
                    description: "check your email for your otp"
                })
                setEmail("")
                setForm(prev => ({ ...prev, email: "", forgotPassword: false, verified: false }))
            }
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Uh oh something went wrong.",
                description: mutation.error?.message
            })
            return mutation.error?.message
        }
    };
    return (
        <div className='w-full px-4 sm:flex sm:justify-center'>
            <form className='relative w-full h-[70vh] max-w-xl flex flex-col gap-5'
                onSubmit={handleSubmit}>
                <label htmlFor='password' className='text-xs font-semibold'>EMAIL ADDRESS</label>
                <input
                    className='max-w-xl h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none'
                    type='email'
                    name='email'
                    placeholder='Enter your email address'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

        <div className="flex flex-col gap-5 mt-8 max-w-xl w-full items-center border-none absolute left-0 bottom-14">
          <input
            className="cursor-pointer max-w-xl w-[70%] p-3 bg-black text-white border-none rounded-md"
            type="submit"
            value="Submit"
          />
          <button
            className="m-auto text-xs font-semibold text-gray-700 underline cursor-pointer"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                forgotPassword: false,
              }))
            }
          >
            Back to Log in
          </button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
