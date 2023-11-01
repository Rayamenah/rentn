import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { authType } from "dto/form.dto";
import { Dispatch, SetStateAction, useState } from "react";
import { useToast } from "../ui/use-toast";

type Props = {
    setForm: Dispatch<SetStateAction<authType>>;
};
const SignUp = ({ setForm }: Props) => {
    const [signUp, setSignUp] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })
    const { toast } = useToast()
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUp((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const mutation = useMutation({
        mutationFn: async () => {
            const res = await axios.post("/api/v1/auth/signup", { email: signUp.email, password: signUp.password })
            const data = res.data
            return data
        }
    })

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        if (signUp.password !== signUp.confirmPassword) {
            toast({
                variant: "destructive",
                title: "invalid email or password provided",
            })
            setSignUp(prev => ({ ...prev, email: "", password: "", conFirmPassword: "" }))
        }
        try {
            mutation.mutate()
            if (mutation.isSuccess) {
                toast({
                    title: "account created",
                    description: "check your email for your otp"
                })
                setForm(prev => ({ ...prev, email: "", password: "", confirmPassword: "", verified: false }))
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
        <div className="relative px-4 w-full sm:flex sm:justify-center">
            <form
                className="relative w-full h-[70vh] max-w-xl flex flex-col gap-5"
                onSubmit={handleSignup}
            >
                <>
                    <label
                        htmlFor="password"
                        className="text-xs font-semibold"
                    >
                        EMAIL ADDRESS
                    </label>
                    <input
                        className="max-w-xl h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none"
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        required
                        value={signUp.email}
                        onChange={onChange}
                    />
                    <label
                        htmlFor="password"
                        className="text-xs font-semibold"
                    >
                        PASSWORD
                    </label>
                    <input
                        className="max-w-xl h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        value={signUp.password}
                        onChange={onChange}
                    />
                    <label
                        htmlFor="password"
                        className="text-xs font-semibold"
                    >
                        CONFIRM PASSWORD
                    </label>
                    <input
                        className="max-w-xl h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none"
                        type="password"
                        name="confirmPassword"
                        placeholder="Enter your password"
                        required
                        value={signUp.confirmPassword}
                        onChange={onChange}
                    />
                </>
                <div className="absolute left-0 bottom-14 flex flex-col gap-5 mt-8 max-w-xl w-full items-center border-none ">
                    <input
                        className="cursor-pointer max-w-xl w-[70%] p-3 bg-black text-white border-none rounded-md "
                        type="submit"
                        value="Sign Up"
                    />
                    <div className="sm:hidden w-full flex justify-center text-xs">
                        Already have an account ?
                        <span
                            className="ml-1 text-gray-900 font-semibold underline cursor-pointer"
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
                </div>
            </form>
        </div>
    );
};

export default SignUp;
