import { signUpType } from "dto/form.dto";
import { Dispatch, SetStateAction } from "react";

type Props = {
    form: signUpType;
    setForm: Dispatch<SetStateAction<signUpType>>;
    handleSignup: () => void;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
};
const SignUp = ({
    form,
    handleSignup,
    onChange,
    setForm,
}: Props) => {


    return (
        <div className="relative px-4 w-full sm:flex sm:justify-center">
            <form
                className="relative w-full h-[70vh] max-w-xl flex flex-col gap-5"
                onSubmit={handleSignup}
            >
                <>
                    {/* <label htmlFor='email' className='text-xs font-semibold'>FIRST NAME</label>
                    <input
                        className='max-w-xl h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none'
                        type='text'
                        name='firstName'
                        value={form.firstName}
                        placeholder='Enter Your email'
                        required
                        onChange={onChange}
                    />

                    <label htmlFor='password' className='text-xs font-semibold'>LAST NAME</label>
                    <input
                        className='max-w-xl h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none'
                        type='text'
                        name='lastName'
                        placeholder='Enter Your last name'
                        required
                        value={form.lastName}
                        onChange={onChange}
                    />
                    <label htmlFor='password' className='text-xs font-semibold'>PHONE NO</label>
                    <input
                        className='max-w-xl h-8 p-1 text-xs border-b border-b-black  placeholder:text-xs placeholder:ml-1 focus:outline-none'
                        type='text'
                        name='phoneNo'
                        placeholder='Enter Your phone number'
                        required
                        value={form.phoneNo}
                        onChange={onChange}
                    /> */}
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
                        value={form.confirmPassword}
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
