import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { handleSignup, clearError } from '../features/userSlice.js';
import { useNavigate, Link } from 'react-router-dom';
import { FaBookOpen, FaUser, FaUniversity, FaCheck, FaArrowRight, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';

function Step1({ register, errors, clearErrorOnInput }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='space-y-6'>
            <div className='text-center mb-6'>
                <div className='flex items-center justify-center gap-2 mb-2'>
                    <FaUser className='text-2xl text-orange-500' />
                    <h2 className='text-2xl font-semibold text-white'>Personal Details</h2>
                </div>
                <p className='text-gray-400 text-sm'>Tell us about yourself</p>
            </div>

            <div className='space-y-4'>
                <div>
                    <label htmlFor="name" className='block text-sm font-medium text-gray-300 mb-2'>Full Name</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: "Name is required" })}
                        onChange={(e) => {
                            clearErrorOnInput();
                            register('name').onChange(e);
                        }}
                        className='w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-300'
                        placeholder="Enter your full name"
                    />
                    {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className='block text-sm font-medium text-gray-300 mb-2'>Email Address</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", { required: "Email is required" })}
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
                    <label htmlFor="password" className='block text-sm font-medium text-gray-300 mb-2'>Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            {...register("password", { required: "Password is required" })}
                            onChange={(e) => {
                                clearErrorOnInput();
                                register('password').onChange(e);
                            }}
                            className='w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-300'
                            placeholder="Create a password"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
                </div>
            </div>
        </div>
    );
}

function Step2({ register, errors, clearErrorOnInput }) {
    return (
        <div className='space-y-6'>
            <div className='text-center mb-6'>
                <div className='flex items-center justify-center gap-2 mb-2'>
                    <FaUniversity className='text-2xl text-orange-500' />
                    <h2 className='text-2xl font-semibold text-white'>Academic Details</h2>
                </div>
                <p className='text-gray-400 text-sm'>Your educational information</p>
            </div>

            <div className='space-y-4'>
                <div>
                    <label htmlFor="university" className='block text-sm font-medium text-gray-300 mb-2'>University/College</label>
                    <input
                        type="text"
                        id="university"
                        {...register("university", { required: "University name is required" })}
                        className='w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-300'
                        placeholder="Enter your university/college name"
                    />
                    {errors.university && <p className='text-red-500 text-sm mt-1'>{errors.university.message}</p>}
                </div>

                <div>
                    <label htmlFor="course" className='block text-sm font-medium text-gray-300 mb-2'>Course</label>
                    <input
                        type="text"
                        id="course"
                        {...register("course", { required: "Course is required" })}
                        className='w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-300'
                        placeholder="e.g., B.Tech, M.Tech, BCA"
                    />
                    {errors.course && <p className='text-red-500 text-sm mt-1'>{errors.course.message}</p>}
                </div>

                <div>
                    <label htmlFor="branch" className='block text-sm font-medium text-gray-300 mb-2'>Branch/Specialization</label>
                    <input
                        type="text"
                        id="branch"
                        {...register("branch", { required: "Branch is required" })}
                        className='w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-300'
                        placeholder="e.g., Computer Science, IT, ECE"
                    />
                    {errors.branch && <p className='text-red-500 text-sm mt-1'>{errors.branch.message}</p>}
                </div>
            </div>
        </div>
    );
}

function Step3({ getValues }) {
    const userData = getValues();

    return (
        <div className='space-y-6'>
            <div className='text-center mb-6'>
                <div className='flex items-center justify-center gap-2 mb-2'>
                    <FaCheck className='text-2xl text-orange-500' />
                    <h2 className='text-2xl font-semibold text-white'>Confirm Details</h2>
                </div>
                <p className='text-gray-400 text-sm'>Review your information before creating account</p>
            </div>

            <div className='space-y-4'>
                <div className='bg-zinc-900 border border-zinc-600 rounded-lg p-4'>
                    <h3 className='font-semibold text-white mb-3 flex items-center gap-2'>
                        <FaUser className='text-orange-500' />
                        Personal Information
                    </h3>
                    <div className='space-y-2 text-sm'>
                        <p><span className='text-gray-400'>Name:</span> <span className='text-gray-200'>{userData.name}</span></p>
                        <p><span className='text-gray-400'>Email:</span> <span className='text-gray-200'>{userData.email}</span></p>
                    </div>
                </div>

                <div className='bg-zinc-900 border border-zinc-600 rounded-lg p-4'>
                    <h3 className='font-semibold text-white mb-3 flex items-center gap-2'>
                        <FaUniversity className='text-orange-500' />
                        Academic Information
                    </h3>
                    <div className='space-y-2 text-sm'>
                        <p><span className='text-gray-400'>University:</span> <span className='text-gray-200'>{userData.university}</span></p>
                        <p><span className='text-gray-400'>Course:</span> <span className='text-gray-200'>{userData.course}</span></p>
                        <p><span className='text-gray-400'>Branch:</span> <span className='text-gray-200'>{userData.branch}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Register = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const { register, handleSubmit, formState: { errors }, trigger, getValues, setValue, watch } = useForm({
        mode: 'onChange'
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authenticated, loading, error } = useSelector((state) => state.user);

    const clearErrorOnInput = () => {
        if (error) {
            dispatch(clearError());
        }
    };

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    useEffect(() => {
        if (authenticated) {
            navigate('/dashboard');
        }
    }, [authenticated, navigate]);

    const validateAndNext = async () => {
        let fieldsToValidate = [];
        if (currentStep === 0) {
            fieldsToValidate = ['name', 'email', 'password'];
        } else if (currentStep === 1) {
            fieldsToValidate = ['university', 'course', 'branch'];
        }

        const isValid = await trigger(fieldsToValidate);
        if (isValid) {
            setCurrentStep(currentStep + 1);
        }
    };

    const onSubmit = async (data) => {
        console.log('Form data being submitted:', data);
        try {
            await dispatch(handleSignup(data)).unwrap();
            navigate('/dashboard');
        } catch (error) {
            console.log('Signup error:', error);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <Step1 register={register} errors={errors} clearErrorOnInput={clearErrorOnInput} />;
            case 1:
                return <Step2 register={register} errors={errors} clearErrorOnInput={clearErrorOnInput} />;
            case 2:
                return <Step3 getValues={getValues} />;
            default:
                return <Step1 register={register} errors={errors} clearErrorOnInput={clearErrorOnInput} />;
        }
    };

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
                    <p className='text-gray-400'>Join our community of learners</p>
                </div>

                {/* Progress Indicator */}
                <div className='flex items-center justify-center mb-8'>
                    {[0, 1, 2].map((step) => (
                        <div key={step} className='flex items-center'>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                step <= currentStep 
                                    ? 'bg-orange-600 text-white'
                                    : 'bg-zinc-700 text-gray-400'
                                }`}>
                                {step + 1}
                            </div>
                            {step < 2 && (
                                <div className={`w-12 h-1 mx-2 ${
                                    step < currentStep ? 'bg-orange-600' : 'bg-zinc-700'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Form */}
                <div className='bg-zinc-800 border border-zinc-700 rounded-2xl p-8 shadow-lg'>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {renderStep()}

                        {error && (
                            <div className='bg-red-900/20 border border-red-500/50 rounded-lg p-3 mt-6'>
                                <p className='text-red-400 text-sm'>{error}</p>
                            </div>
                        )}

                        <div className='flex justify-between items-center mt-8'>
                            <button
                                type="button"
                                onClick={() => setCurrentStep(currentStep - 1)}
                                className={`flex items-center gap-2 px-4 py-2 border border-zinc-600 text-gray-300 rounded-lg hover:bg-zinc-700 transition duration-300 ${
                                    currentStep === 0 ? 'invisible' : ''
                                    }`}
                            >
                                <FaArrowLeft />
                                Back
                            </button>

                            {currentStep < 2 ? (
                                <button
                                    type="button"
                                    onClick={validateAndNext}
                                    className='flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300'
                                >
                                    Next
                                    <FaArrowRight />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className='flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-orange-800 disabled:cursor-not-allowed transition duration-300'
                                >
                                    {loading ? 'Creating Account...' : 'Create Account'}
                                    <FaArrowRight />
                                </button>
                            )}
                        </div>
                    </form>

                    <div className='mt-6 text-center'>
                        <p className='text-gray-400 text-sm'>
                            Already have an account?{' '}
                            <Link to="/login" className='text-orange-500 hover:text-orange-400 font-medium transition duration-300'>
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;