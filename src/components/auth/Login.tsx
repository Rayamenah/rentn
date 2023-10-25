import { signUpType } from "dto/form.dto";
import { Dispatch, SetStateAction } from "react";

type Props = {
    form: signUpType;
    setForm: Dispatch<SetStateAction<signUpType>>;
    handleLogin: () => void;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Login = ({
    form,
    handleLogin,
    onChange,
    setForm,
}: Props) => {
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
                    value={form.email}
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
                    value={form.password}
                    onChange={onChange}
                />

                <div className="flex flex-col gap-5 mt-8 max-w-xl w-full items-center border-none absolute left-0 bottom-5">
                    <input
                        className="cursor-pointer max-w-xl w-[70%] p-3 bg-black text-white border-none rounded-md"
                        type="submit"
                        value="Log in"
                    />
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

export default Login;
