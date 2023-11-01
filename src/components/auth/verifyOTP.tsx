import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { authType } from "dto/form.dto";
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useRef,
    useState,
} from "react";
import { toast } from "../ui/use-toast";

type Props = {
    setForm: Dispatch<SetStateAction<authType>>;
};

const VerifyOtp = ({ setForm }: Props) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value === '' && index > 0) inputRefs[index - 1].current?.focus()

        if (
            value &&
            index < otp.length - 1 &&
            inputRefs[index + 1].current
        ) {
            inputRefs[index + 1].current?.focus();
        }
    };


    const mutation = useMutation({
        mutationFn: async () => {
            const otpValue = otp.join('')
            const res = await axios.post("/api/v1/auth/verify", { email: "email that will has been saved to state", otp: otpValue })
            const data = res.data
            return data
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        try {
            mutation.mutate()
            if (mutation.isSuccess) {
                toast({
                    title: "email verified",
                })
                setForm(prev => ({ ...prev, verified: true }))
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
        <div className="w-full px-4 sm:flex sm:justify-center">
            <form
                className="relative py-10 w-full h-[70vh] max-w-xl flex flex-col gap-5"
                onSubmit={handleSubmit}
            >
                <label
                    htmlFor="password"
                    className="text-xs font-semibold text-center"
                >
                    Enter your OTP
                </label>
                <div className='flex justify-around'>
                    {otp.map((digit, index) => (
                        <input
                            className="max-w-[35px] h-12 p-1 text-base text-center rounded-md font-bold border-gray-400 border-2 placeholder:text-base placeholder:text-center focus:outline-none"
                            key={index}
                            ref={inputRefs[index]}
                            type="text"
                            name="otp"
                            placeholder="."
                            maxLength={1}
                            required
                            value={digit}

                            onChange={(e) => handleChange(e, index)}
                        />

                    ))}
                </div>
                <div className="flex mt-8 max-w-xl w-full justify-center border-none sm:absolute sm:left-0 sm:bottom-14">
                    <input
                        className="cursor-pointer max-w-xl w-[70%] p-3 bg-black text-white border-none rounded-md"
                        type="submit"
                        value="Send OTP"
                    />
                </div>
            </form>
        </div>
    );
};

export default VerifyOtp;
