import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaBookOpen, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin, clearError } from '../features/userSlice.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error: loginError } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const clearErrorOnInput = () => {
        if (loginError) {
            dispatch(clearError());
        }
    };

    const onSubmit = async (data) => {
        try {
            await dispatch(handleLogin(data)).unwrap();
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
        reset();
    }

    return (
        <div className='bg-zinc-950 min-h-screen flex items-center justify-center px-6 py-12'>
            <div className='max-w-md w-full'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <div className='flex items-center justify-center gap-3 mb-4'>
                        <FaBookOpen className='text-3xl text-orange-500' />
                        <h1 className='text-3xl font-bold text-white'>
                            {import.meta.env.VITE_APP_NAME || 'Lumin'}<span className='text-orange-500'>{import.meta.env.VITE_APP_NAME ? import.meta.env.VITE_APP_NAME.charAt(5) || 'o' : 'o'}</span>{import.meta.env.VITE_APP_NAME ? import.meta.env.VITE_APP_NAME.slice(6) || 'te' : 'te'}
                        </h1>
                    </div>
                    <p className='text-gray-400'>Welcome back! Sign in to your account</p>
                </div>

                {/* Login Form */}
                <div className='bg-zinc-800 border border-zinc-700 rounded-2xl p-8 shadow-lg'>
                    <div className='flex items-center gap-3 mb-6'>
                        <FaSignInAlt className='text-2xl text-orange-500' />
                        <h2 className='text-2xl font-semibold text-white'>Sign In</h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                        <div>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-300 mb-2'>
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register('email', { required: 'Email is required' })}
                                onChange={(e) => {
                                    clearErrorOnInput();
                                    register('email').onChange(e);
                                }}
                                className='w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-300'
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className='block text-sm font-medium text-gray-300 mb-2'>
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register('password', { required: 'Password is required' })}
                                onChange={(e) => {
                                    clearErrorOnInput();
                                    register('password').onChange(e);
                                }}
                                className='w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-300'
                                placeholder="Enter your password"
                            />
                            {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
                        </div>

                        {loginError && (
                            <div className='bg-red-900/20 border border-red-500/50 rounded-lg p-3'>
                                <p className='text-red-400 text-sm'>{loginError}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className='w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-orange-800 disabled:cursor-not-allowed transition duration-300 font-medium'
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className='mt-6 text-center'>
                        <p className='text-gray-400 text-sm'>
                            Don't have an account?{' '}
                            <Link to="/register" className='text-orange-500 hover:text-orange-400 font-medium transition duration-300'>
                                Create one here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;