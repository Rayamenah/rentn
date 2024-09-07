import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { authType } from "dto/form.dto";
import { Dispatch, SetStateAction, useState } from "react";
import { useToast } from "../ui/use-toast";

type Props = {
    setForm: Dispatch<SetStateAction<authType>>;
};

const Login = ({ setForm }: Props) => {
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const { toast } = useToast()

    const onChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        //update form state
        setLogin((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const mutation = useMutation({
        mutationFn: async () => {
            const res = await axios.post("/api/v1/auth/login", { email: login.email, password: login.password })
            const data = res.data
            return data
        }
    })
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        try {
            mutation.mutate()
            if (mutation.isSuccess) {
                toast({
                    title: "Signed in",
                })
            }
            if (mutation.isError) {
                toast({
                    variant: "destructive",
                    title: "Uh oh something went wrong.",
                    description: mutation.error?.message
                })
                setLogin(prev => ({ ...prev, email: "", password: "" }))

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
                className="relative w-full h-[70vh] max-w-xl flex flex-col gap-5"
                onSubmit={handleLogin}
            >
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
                    value={login.email}
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
                    value={login.password}
                    onChange={onChange}
                />

                <div className="flex flex-col gap-5 mt-8 max-w-xl w-full items-center border-none absolute left-0 bottom-5">
                    <button
                        className="cursor-pointer flex justify-center items-center max-w-xl w-[70%] p-3 bg-black text-white border-none rounded-md"
                        type="submit"
                    >
                        {mutation.isPending ? <div className='w-5 h-5 border-white bg-black border rounded-full animate-spin' /> : "Log in"}
                    </button>
                    <div
                        className="hidden w-full sm:flex sm:justify-center text-xs font-semibold text-gray-900 underline cursor-pointer"
                        onClick={() =>
                            setForm((prev) => ({
                                ...prev,
                                forgotPassword: !prev.forgotPassword,
                            }))
                        }
                    >
                        Forgot Password?
                    </div>
                    <div className="sm:hidden w-full flex justify-center text-xs">
                        No account?
                        <span
                            className="ml-1 text-gray-900 underline font-semibold cursor-pointer"
                            onClick={() =>
                                setForm((prev) => ({
                                    ...prev,
                                    isNewUser: true,
                                }))
                            }
                        >
                            Sign up
                        </span>
                    </div>
                    <div
                        className="sm:hidden w-full flex justify-center text-xs font-semibold text-gray-900 underline cursor-pointer"
                        onClick={() =>
                            setForm((prev) => ({
                                ...prev,
                                forgotPassword: !prev.forgotPassword,
                            }))
                        }
                    >
                        Forgot Password?
                    </div>
                </div>


            </form>
        </div>
    );
};

export default Login
