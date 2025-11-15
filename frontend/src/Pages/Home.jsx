import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBookOpen, FaUpload, FaUsers, FaGlobe, FaTimes } from 'react-icons/fa';
import { Button, RecentUploads } from '../Components';

const Home = () => {
    const navigate = useNavigate();
    const { authenticated } = useSelector((state) => state.user);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleUploadClick = () => {
        if (authenticated) {
            navigate('/upload');
        } else {
            setShowAuthModal(true);
        }
    };

    return (
        <div className='bg-zinc-950 text-gray-200 min-h-screen'>
            <div className='max-w-7xl mx-auto px-6 py-12'>
                {/* Hero Section */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16'>
                    {/* Main Hero Card */}
                    <div className='lg:col-span-2 bg-zinc-900 border border-zinc-700 hover:border-orange-500 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300'>
                        <div className='space-y-8'>
                            <div className='flex items-center gap-8 mb-4'>
                                <FaBookOpen className='text-8xl text-orange-500' />
                                <h1 className='text-4xl md:text-5xl font-bold text-white'>
                                    Your Ultimate Study Resource Hub!
                                </h1>
                            </div>
                            <p className='text-gray-300 text-lg leading-relaxed'>
                                Unlock a world of knowledge with <span className='font-semibold text-orange-500'>{import.meta.env.VITE_APP_NAME || 'Luminote'}</span>,
                                the go-to platform where students come together to share and access a treasure trove of study materials.
                                Whether you need notes, question papers, lab manuals, or other resources, our community has you covered.
                            </p>
                            <button
                                onClick={() => navigate("/explore")}
                                className='px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 font-medium shadow-lg cursor-pointer'
                            >
                                Explore Resources
                            </button>
                        </div>
                    </div>

                    {/* Upload Card */}
                    <div className='flex flex-col align-middle items-center justify-center bg-zinc-900 border border-zinc-700 hover:border-orange-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300'>
                        <div className='text-center space-y-4'>
                            <FaUpload className='text-4xl text-orange-500 mx-auto' />
                            <h2 className='text-2xl font-bold text-white'>Share Your Notes</h2>
                            <p className='text-gray-300 text-md leading-relaxed'>
                                Have useful notes, lab files, or past papers? Upload your study materials and help your
                                juniors and classmates learn better. Your contribution could make all the difference!
                            </p>
                            <Button onClick={handleUploadClick} className='px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 font-medium shadow-lg '>
                                Upload Now
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Community Section */}
                <div className='bg-zinc-900 border border-zinc-700 rounded-2xl p-8 mb-16 text-center'>
                    <div className='max-w-4xl mx-auto space-y-6'>
                        <div className='flex items-center justify-center gap-3 mb-4'>
                            <FaUsers className='text-3xl text-orange-500' />
                            <h2 className='text-3xl font-bold text-white'>Join the {import.meta.env.VITE_APP_NAME || 'Luminote'} Community</h2>
                        </div>
                        <div className='space-y-3 text-gray-300'>
                            <p className='text-lg'>Be part of a vibrant community of learners and educators who share their knowledge and expertise.</p>
                            <p>Join us today and start sharing your notes, lab files, and past papers with fellow students. Let's learn together!</p>
                        </div>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'>
                            <button
                                onClick={() => navigate('/register')}
                                className='px-8 py-3 border border-orange-600 text-orange-500 rounded-lg hover:bg-orange-600 hover:text-white transition duration-300 font-medium   cursor-pointer'
                            >
                                Register
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className='px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 font-medium  cursor-pointer'
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
                    {[
                        {
                            icon: <FaBookOpen className='text-3xl text-orange-500' />,
                            title: 'Diverse Resources',
                            description: 'Access notes, past papers, lab manuals, and more—all in one place.'
                        },
                        {
                            icon: <FaUsers className='text-3xl text-orange-500' />,
                            title: 'Student-Driven',
                            description: 'Built by students, for students—join a growing network of learners.'
                        },
                        {
                            icon: <FaGlobe className='text-3xl text-orange-500' />,
                            title: 'Free & Accessible',
                            description: 'Get started instantly with our user-friendly platform.'
                        },
                        {
                            icon: <FaUpload className='text-3xl text-orange-500' />,
                            title: 'Quick Upload',
                            description: 'Upload files instantly and help others learn better.'
                        }
                    ].map((feature, index) => (
                        <div key={index} className='bg-zinc-900 border border-zinc-700 hover:border-orange-500 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300'>
                            <div className='mb-4'>{feature.icon}</div>
                            <h3 className='text-xl font-semibold text-white mb-3'>{feature.title}</h3>
                            <p className='text-gray-300 text-sm leading-relaxed'>{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className='border-t border-zinc-700 mb-16'></div>

                {/* Recent Uploads Section */}
                <div className='flex align-middle justify-center items-center'>
                    <RecentUploads />
                </div>

                {/* Authentication Modal */}
                {showAuthModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setShowAuthModal(false)}>
                        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-white">Authentication Required</h3>
                                <button onClick={() => setShowAuthModal(false)} className="text-gray-400 hover:text-gray-300 cursor-pointer">
                                    <FaTimes size={20} />
                                </button>
                            </div>
                            <div className="text-center space-y-4">
                                <FaUpload className="text-4xl text-orange-500 mx-auto" />
                                <p className="text-gray-300 leading-relaxed">
                                    Please create an account or sign in to share your study materials with the community.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <button
                                        onClick={() => {
                                            setShowAuthModal(false);
                                            navigate('/register');
                                        }}
                                        className="flex-1 px-6 py-3 border border-orange-600 text-orange-500 rounded-lg hover:bg-orange-600 hover:text-white transition duration-300 font-medium cursor-pointer"
                                    >
                                        Create Account
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowAuthModal(false);
                                            navigate('/login');
                                        }}
                                        className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 font-medium cursor-pointer"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;