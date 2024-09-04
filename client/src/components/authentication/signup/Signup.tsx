import  { useState } from 'react'
import { Link } from 'react-router-dom'
import  { Toaster } from 'react-hot-toast';
import { convertToBase64 } from '@/utils/helper';
import avatar from '@/assets/profile.png'
import Lottie from 'lottie-react';
import Animation from '@/assets/loginSignupAnimation2.json'
// import OtpInput from 'react-otp-input';

import styles from '../../../styles/Username.module.css'
import OTPInput from 'react-otp-input';
export default function Signup() {

    // const navigate = useNavigate()
    const [otpCompoment, setOtpCompoment] = useState<boolean>(false);
    const [file, setFile] = useState<any>()


    /** formik doensn't support file upload so we need to create this handler */
    const onUpload = async (e: any) => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }

    const registerHandler = () => {
        setOtpCompoment(!otpCompoment);
    }

    return (
        <>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="mx-0 flex flex-row items-center justify-evenly bg-white">
                <div className='flex flex-col px-10 justify-center items-center'>
                    <div className='text-black mb-3'>
                        <span className='text-4xl font-bold mx-2 text-orange-500'>Code</span>
                        <span className='text-4xl font-bold mx-2 text-purple-500'>Colab</span>
                    </div>
                    <div>
                        <Lottie
                            animationData={Animation}
                            loop={true}
                        />
                    </div>
                </div>
                <div className='flex justify-center items-center h-screen min-w-[40vw] px-10'>
                    {otpCompoment ? <OtpInputComponent /> : <RegisterInputCard file={file} onUpload={onUpload} avatar={avatar} registerHandler={registerHandler} />}
                </div>
            </div>
        </>
    )
}


const RegisterInputCard = ({ file, onUpload, avatar, registerHandler }: any) => {
    return (
        <div className={`${styles.glass} min-h-[90vh] min-w-[40vw] shadow-lg pb-5`} style={{ width: "45%", paddingTop: '3em' }}>

            <div className="title flex flex-col items-center">
                <h4 className='text-5xl font-bold text-orange-500'>Register</h4>
                <span className='py-4 text-xl w-2/3 text-center text-black'>
                    Happy to join you!
                </span>
            </div>

            <div className='py-1'>
                <div className='profile flex justify-center py-4 '>
                    <label htmlFor="profile" className='cursor-pointer'>
                        <img src={file || avatar} className="profile_img w-32 h-32 border-black border-2 rounded-full" alt="avatar" />
                    </label>

                    <input onChange={onUpload} type="file" id='profile' name='profile' />
                </div>

                <div className="textbox flex flex-col items-center gap-6">
                    <input className={`${styles.textbox} text-black  focus:shadow-lg duration-700 outline-none`} type="text" placeholder='Email*' />
                    <input className={`${styles.textbox} text-black  focus:shadow-lg duration-700 outline-none`} type="text" placeholder='Username*' />
                    <input className={`${styles.textbox} text-black  focus:shadow-lg duration-700 outline-none`} type="text" placeholder='Password*' />
                    <button className={`${styles.btn} bg-orange-400 hover:bg-orange-600 duration-700`} type='submit' onClick={registerHandler}>Register</button>
                </div>

                <div className="text-center py-4 pb-6">
                    <span className='text-gray-500'>Already Register? <Link className='text-orange-500' to="/login">Login Now</Link></span>
                </div>

            </div>

        </div>
    )
}

const OtpInputComponent = () => {
    const [otp, setOtp] = useState<any>('');

    return (
        <div className={`${styles.glass} min-h-[90vh] min-w-[40vw] shadow-lg pb-5`} style={{ width: "45%", paddingTop: '3em' }}>

            <div className="title flex flex-col items-center">
                <h4 className='text-5xl font-bold text-orange-500'>OTP Verification</h4>
                <span className='py-4 text-xl w-2/3 text-center text-black'>
                    Verify OTP to proceed further.
                </span>
            </div>
            <p className='text-black border border-black rounded-md p-2 w-fit cursor-pointer hover:bg-slate-300 duration-700 '>Back</p>

            <div className='py-1 text-black w-full h-full text-4xl'>
                <p className='text-lg p-3'>Enter OTP</p>
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                    shouldAutoFocus={true}
                    containerStyle={{}}

                />
                <p className='underline text-black  py-3 text-sm'>Resend OTP</p>
            </div>
        </div>
    )
}

