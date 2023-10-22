import Login from "@/components/auth/Login";
import SignUp from "@/components/auth/SignUp";
import ForgotPassword from "@/components/auth/forgotPassword";
import VerifyOtp from "@/components/auth/verifyOtp";
import Head from "next/head";
import { useState } from "react";
type Props = {};

const Auth: React.FC<Props> = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNo: "",
        isNewUser: false,
        verified: true,
        forgotPassword: false
    });

    const handleSignup = () => {
        // e.preventDefault()
        // setForm(prev => ({ ...prev, verified: false }))

    };
    const handleLogin = () => {
        // e.preventDefault()
    };

    const onChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        //update form state
        setForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <>
            <Head>
                <title>rentn authentication</title>
                <meta
                    name="description"
                    content="login or signup to rentn"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    href="/rentnLogo.svg"
                />
            </Head>

            <section className="w-full flex-grow sm:flex overflow-hidden">
                {/* first half of the page */}
                <div className="relative hidden sm:flex sm:flex-col sm:w-[45%] sm:gap-10 bg-black text-white ">
                    <div className="flex justify-center items-center w-full h-8">
                        <h1 className="text-lg font-semibold">
                            rent'n
                        </h1>
                    </div>
                    <p className="px-5 sm:text-lg">
                        Sign up as a house owner and upload houses for
                        rent
                    </p>

                    <div className="relative flex flex-1 w-full ">
                        {/* <img className='absolute top-10 left-0 z-[-1]' src='/sun 1.svg' />
                    <div className='relative w-full'>
                        <img className='absolute left-0 bottom-0 z-10 w-full bg-white' src='/footer-image.svg' />
                    </div> */}
                    </div>
                </div>

                <div className="flex w-full sm:w-[55%] justify-center items-center">
                    <section className="w-full">
                        {/* heading for large screens */}

                        <div className="hidden sm:w-full sm:flex sm:justify-center text-xs">
                            <div className="my-4">
                                {(!form.forgotPassword && form.verified) ? (
                                    <>
                                        <span
                                            className={`transition-all cursor-pointer ${!form.isNewUser
                                                ? "text-base font-bold underline"
                                                : "text-xs"
                                                }`}
                                            onClick={() =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    isNewUser: false, forgotPassword: false
                                                }))
                                            }
                                        >
                                            Log in
                                        </span>
                                        <span className="mx-1 text-base">|</span>

                                        <span
                                            className={`transition-all  cursor-pointer ${!form.isNewUser
                                                ? "text-xs"
                                                : "text-base font-bold underline"
                                                }`}
                                            onClick={() =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    isNewUser: true, forgotPassword: false
                                                }))
                                            }
                                        >
                                            Sign up
                                        </span>
                                    </>
                                ) : (form.verified ? (
                                    <span
                                        className='transition-all cursor-pointer text-base font-bold'
                                    >
                                        Reset Password
                                    </span>
                                ) : (
                                    <span
                                        className='transition-all cursor-pointer text-base font-bold'
                                    >
                                        Verify OTP
                                    </span>
                                )

                                )}
                            </div>
                        </div>

                        {/* heading for mobile devices */}
                        <div className="sm:hidden w-full flex justify-center items-center h-8 text-lg font-bold my-2">
                            {(form.isNewUser && !form.forgotPassword) && "Sign up"}
                            {(!form.isNewUser && !form.forgotPassword) && "Log in"}
                            {(form.forgotPassword && !form.isNewUser) && 'Reset Password'}
                            {(!form.verified) && 'Verify OTP'}

                        </div>

                        {/* form section */}
                        {(form.isNewUser && !form.forgotPassword && form.verified) && (
                            <SignUp
                                form={form}
                                setForm={setForm}
                                handleSignup={handleSignup}
                                onChange={onChange}
                            />
                        )}
                        {(!form.isNewUser && !form.forgotPassword && form.verified) && (
                            <Login
                                form={form}
                                setForm={setForm}
                                handleLogin={handleLogin}
                                onChange={onChange}
                            />
                        )}
                        {(!form.verified) && (<VerifyOtp setForm={setForm} />)}
                        {(form.forgotPassword) && (
                            <ForgotPassword
                                form={form}
                                setForm={setForm}
                                onChange={onChange}
                            />
                        )}
                    </section>
                </div>
            </section>
        </>
    );
};

export default Auth;