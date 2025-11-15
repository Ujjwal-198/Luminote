import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Loading } from '../Components';
import { LuUserRoundPlus } from "react-icons/lu";
import SignupIllustration from '../assets/SignupIllustration.png';
import { handleSignup } from '../features/userSlice.js';
import { useNavigate } from 'react-router-dom';
const Signup = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, authenticated, loading, error } = useSelector((state) => state.user);
    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);
    useEffect(() => {
        if (authenticated) {
            navigate('/dashboard');
        }
    }, [authenticated, navigate]);

    const onSubmit = async (data) => {
        console.log('Form Data from Signup', data);
        try {
            await dispatch(handleSignup(data)).unwrap();
            navigate('/dashboard');

        } catch (error) {
            console.log(error);
        }
        // reset();
    }


    // if (loading) {
    //     return <Loading />;
    // }



    return (
        <div className='flex align-middle justify-center items-center min-h-screen bg-zinc-950 gap-x-10'>
            <div className='flex align-middle justify-center items-center bg-zinc-800 gap-x-10 rounded-xl shadow-2xs px-10 py-5'>
                <div className='hidden md:flex align-middle items-center'>
                    <img src={SignupIllustration} alt="Signup" className='w-85' />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col align-middle justify-center items-start gap-y-3 bg-zinc-800 rounded-xl'>
                    <div className='flex gap-x-3 my-3 align-middle items-center justify-center'>
                        <LuUserRoundPlus className='text-2xl text-white' />
                        <h1 className='text-2xl text-white font-semibold'>Signup</h1>
                    </div>
                    <div className='flex flex-col gap-y-2 w-full'>
                        <label className='text-gray-100 text-sm' htmlFor="name">Username</label>
                        <input className='bg-zinc-900 rounded-lg px-4 py-1 w-full text-gray-100 focus:outline-none focus:ring focus:ring-orange-600' type="text" {...register('name', { required: true })} placeholder="Username" />
                    </div>
                    <div className='flex flex-col gap-y-2 w-full'>
                        <label className='text-gray-100 text-sm' htmlFor="email">Email</label>
                        <input className='bg-zinc-900 rounded-lg px-4 py-1 w-full text-gray-100 focus:outline-none focus:ring focus:ring-orange-600' type="email" {...register('email', { required: true })} placeholder="Email" />
                    </div>
                    <div className='flex flex-col gap-y-2 w-full'>
                        <label className='text-gray-100 text-sm' htmlFor="password">Password</label>
                        <input className='bg-zinc-900 rounded-lg px-4 py-1 w-full text-gray-100 focus:outline-none focus:ring focus:ring-orange-600' type="password" {...register('password', { required: true })} placeholder="Password" />
                    </div>
                    {
                        error && (
                            <div className='flex flex-col gap-y-1 w-full'>
                                <p className='text-red-500 text-sm'>{error}</p>
                            </div>
                        )
                    }
                    <div className='my-5'>
                        <Button type="submit" className='text-md px-5'>Signup</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
