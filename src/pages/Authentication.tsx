import Login from "@/components/auth/Login";
import SignUp from "@/components/auth/SignUp";
import Head from "next/head";
import { useState } from "react";
type Props = {};

const Authentication: React.FC<Props> = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNo: "",
        isNewUser: false,
    });

    const handleSignup = () => {
        // e.preventDefault()
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
                    href="/favicon.ico"
                />
            </Head>

            <section className="w-full h-[90vh] sm:flex overflow-hidden">
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
                            <div className="my-4   ">
                                <span
                                    className={`transition-all text-xs cursor-pointer ${!form.isNewUser
                                            ? "text-sm font-bold underline"
                                            : ""
                                        }`}
                                    onClick={() =>
                                        setForm((prev) => ({
                                            ...prev,
                                            isNewUser: false,
                                        }))
                                    }
                                >
                                    Login
                                </span>
                                <span className="mx-1 text-base">|</span>

                                <span
                                    className={`transition-all text-xs cursor-pointer ${!form.isNewUser
                                            ? ""
                                            : "text-sm font-bold underline"
                                        }`}
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
                        </div>

                        {/* heading for mobile devices */}
                        <div className="sm:hidden w-full flex justify-center items-center h-8 text-lg font-bold my-2">
                            {form.isNewUser ? "Sign Up" : "Log in"}
                        </div>

                        {/* form section */}
                        {form.isNewUser && (
                            <SignUp
                                form={form}
                                setForm={setForm}
                                handleSignup={handleSignup}
                                onChange={onChange}
                            />
                        )}
                        {!form.isNewUser && (
                            <Login
                                form={form}
                                setForm={setForm}
                                handleLogin={handleLogin}
                                onChange={onChange}
                            />
                        )}
                    </section>
                </div>
            </section>
        </>
    );
};

export default Authentication;
