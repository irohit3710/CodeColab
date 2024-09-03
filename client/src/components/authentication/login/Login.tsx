import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { convertToBase64 } from '@/utils/helper';
import avatar from '@/assets/profile.png'
import Lottie from 'lottie-react';
import Animation from '@/assets/loginSignupAnimation2.json'

import styles from '../../../styles/Username.module.css'
import { useTransition } from '@react-spring/web';
export default function Login() {

    const navigate = useNavigate()
    const [file, setFile] = useState<any>()


    /** formik doensn't support file upload so we need to create this handler */
    const onUpload = async (e: any) => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }

    const transitions = useTransition(true, {
        from: { opacity: 0, transform: 'translateX(-100px)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(100px)' },
        config: { duration: 1000 },
    });

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
                    <div className={`${styles.glass} min-h-[90vh] min-w-[40vw] shadow-lg pb-5 w-[45%] pt-[3em]`}>

                        <div className="title flex flex-col items-center">
                            <h4 className='text-5xl font-bold text-orange-500'>Login</h4>
                            <span className='py-4 text-xl w-2/3 text-center text-black'>
                                Happy to welcome you again!
                            </span>
                        </div>

                        <div className='py-1'>
                            <div className="textbox flex flex-col items-center gap-6">
                                <input className={`${styles.textbox} text-black  focus:shadow-lg duration-700 outline-none`} type="text" placeholder='Email*' />
                                {/* <input className={`${styles.textbox} text-black  focus:shadow-lg duration-700 outline-none`} type="text" placeholder='Username*' /> */}
                                <input className={`${styles.textbox} text-black  focus:shadow-lg duration-700 outline-none`} type="text" placeholder='Password*' />
                                <button className={`${styles.btn} bg-orange-400 hover:bg-orange-600 duration-700`} >Login</button>
                            </div>

                            <div className="text-center py-4 pb-6">
                                <span className='text-gray-500'>New Member, Register? <Link className='text-orange-500' to="/register">Register Now</Link></span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

