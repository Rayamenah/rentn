import { signUpType } from "dto/form.dto";
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useRef,
    useState,
} from "react";

type Props = {
    setForm: Dispatch<SetStateAction<signUpType>>;
};

const Login = ({ setForm }: Props) => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const { value } = e.target;

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (
            value &&
            index < otp.length - 1 &&
            inputRefs[index + 1].current
        ) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleSubmit = () => {
        const Otp = otp.join('')
    };

    return (
        <div className="w-full px-4 sm:flex sm:justify-center">
            <form
                className="relative w-full h-[70vh] max-w-xl flex flex-col gap-5"
                onSubmit={handleSubmit}
            >
                <label
                    htmlFor="password"
                    className="text-xs font-semibold"
                >
                    Enter your OTP
                </label>
                {otp.map((digit, index) => (
                    <input
                        className="max-w-[20px] h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none"
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        name="otp"
                        placeholder="Enter your otp"
                        required
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                    />
                ))}

                <div className="flex mt-8 max-w-xl w-full justify-center border-none sm:absolute sm:left-0 sm:bottom-10">
                    <input
                        className="cursor-pointer max-w-xl w-[70%] p-3 bg-black text-white border-none rounded-md"
                        type="submit"
                        value="Log in"
                    />
                </div>
                <div className="sm:hidden w-full flex justify-center text-xs">
                    Verified?
                    <span
                        className="ml-1 text-gray-700 underline cursor-pointer"
                        onClick={() =>
                            setForm((prev) => ({
                                ...prev,
                                isNewUser: false,
                            }))
                        }
                    >
                        Log in
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Login;
