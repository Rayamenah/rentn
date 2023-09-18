import { signUpType } from "dto/form.dto";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
    form: signUpType
    setForm: Dispatch<SetStateAction<signUpType>>;
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

const Login = ({ form, onChange, setForm }: Props) => {

    const [email, setOtp] = useState('')
    const handleSubmit = () => {

    }
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
                    value={form.email}
                    onChange={onChange}
                />

                <div className='flex mt-8 max-w-xl w-full justify-center border-none sm:absolute sm:left-0 sm:bottom-10'>
                    <input
                        className='cursor-pointer max-w-xl w-[70%] p-3 bg-black text-white border-none rounded-md'
                        type='submit'
                        value='Log in'
                    />
                </div>
                <div className='sm:hidden w-full flex justify-center text-xs'>Login
                    <span
                        className='ml-1 text-gray-700 underline cursor-pointer'
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
            </form >
        </div >
    )
}

export default Login