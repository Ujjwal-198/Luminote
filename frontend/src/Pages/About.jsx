import React from 'react';
import { FaBookOpen, FaGithub, FaLinkedin, FaCode, FaUsers, FaCloudUploadAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

const About = () => {
    return (
        <div className='bg-zinc-950 text-gray-200 min-h-screen py-12 px-6'>
            <div className='max-w-6xl mx-auto'>
                {/* Hero Section */}
                <div className='text-center mb-16'>
                    <div className='flex justify-center items-center gap-3 mb-6'>
                        <FaBookOpen className='text-5xl text-orange-500' />
                        <h1 className='text-5xl font-bold text-white'>
                            Lumin<span className='text-orange-500'>o</span>te
                        </h1>
                    </div>
                    <p className='text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
                        Empowering students through collaborative learning and seamless knowledge sharing
                    </p>
                </div>

                {/* App Goals Section */}
                <div className='mb-16'>
                    <h2 className='text-3xl font-bold text-white mb-8 text-center'>Our Mission</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <div className='bg-zinc-900 p-6 rounded-2xl border border-zinc-700 hover:border-orange-500 transition duration-300'>
                            <FaUsers className='text-3xl text-orange-500 mb-4' />
                            <h3 className='text-xl font-semibold text-white mb-3'>Collaborative Learning</h3>
                            <p className='text-gray-400'>
                                Foster a community where students share knowledge, resources, and support each other's academic journey.
                            </p>
                        </div>
                        <div className='bg-zinc-900 p-6 rounded-2xl border border-zinc-700 hover:border-orange-500 transition duration-300'>
                            <FaCloudUploadAlt className='text-3xl text-orange-500 mb-4' />
                            <h3 className='text-xl font-semibold text-white mb-3'>Easy Access</h3>
                            <p className='text-gray-400'>
                                Provide a centralized platform for uploading, discovering, and accessing academic materials anytime, anywhere.
                            </p>
                        </div>
                        <div className='bg-zinc-900 p-6 rounded-2xl border border-zinc-700 hover:border-orange-500 transition duration-300'>
                            <FaBookOpen className='text-3xl text-orange-500 mb-4' />
                            <h3 className='text-xl font-semibold text-white mb-3'>Quality Resources</h3>
                            <p className='text-gray-400'>
                                Curate high-quality educational content including notes, assignments, e-books, and study materials.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Developer Section */}
                <div className='bg-zinc-800 rounded-2xl p-8 border border-zinc-700'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
                        <div>
                            <h2 className='text-3xl font-bold text-white mb-6'>About the Developer</h2>
                            <div className='space-y-4'>
                                <div className='flex items-center gap-3'>
                                    <FaCode className='text-2xl text-orange-500' />
                                    <div>
                                        <h3 className='text-xl font-semibold text-white'>{import.meta.env.VITE_DEVELOPER_NAME || 'Ujjwal Singh'}</h3>
                                        <p className='text-gray-400'>Full Stack Developer</p>
                                    </div>
                                </div>
                                <p className='text-gray-300 leading-relaxed'>
                                    Passionate developer with a love for creating meaningful applications that solve real-world problems.
                                    Luminote represents my journey in full-stack development, showcasing skills in React, Node.js,
                                    MongoDB, and modern web technologies.
                                </p>
                                <p className='text-gray-300 leading-relaxed'>
                                    This project is a hobby endeavor designed to demonstrate my technical capabilities while
                                    contributing to the student community. Every feature has been crafted with attention to
                                    user experience and modern development practices.
                                </p>
                            </div>
                        </div>

                        <div className='bg-zinc-900 p-6 rounded-xl border border-zinc-600'>
                            <h3 className='text-xl font-semibold text-white mb-4'>Tech Stack</h3>
                            <div className='grid grid-cols-2 gap-4 mb-6'>
                                <div className='text-sm'>
                                    <p className='text-orange-500 font-medium'>Frontend</p>
                                    <p className='text-gray-400'>React, Redux, Tailwind CSS</p>
                                </div>
                                <div className='text-sm'>
                                    <p className='text-orange-500 font-medium'>Backend</p>
                                    <p className='text-gray-400'>Node.js, Express.js</p>
                                </div>
                                <div className='text-sm'>
                                    <p className='text-orange-500 font-medium'>Database</p>
                                    <p className='text-gray-400'>MongoDB</p>
                                </div>
                                <div className='text-sm'>
                                    <p className='text-orange-500 font-medium'>Storage</p>
                                    <p className='text-gray-400'>MEGA Cloud</p>
                                </div>
                            </div>

                            <div className='flex gap-4'>
                                <a href={import.meta.env.VITE_GITHUB_URL || 'https://github.com/Ujjwal-198'} target='_blank' className='flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300'>
                                    <FaGithub />
                                    <span className='text-sm'>GitHub</span>
                                </a>
                                <a href={import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/ujjwal-singh-b44256271'} target='_blank' className='flex items-center gap-2 px-4 py-2 border border-orange-600 text-orange-500 rounded-lg hover:bg-orange-600 hover:text-white transition duration-300'>
                                    <FaLinkedin />
                                    <span className='text-sm'>LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className='mt-16'>
                    <h2 className='text-3xl font-bold text-white mb-8 text-center'>Key Features</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {[
                            { title: 'Free Access', desc: 'Completely free platform for all students' },
                            { title: 'Instant Upload', desc: 'Upload documents in seconds with metadata' },
                            { title: 'Smart Search', desc: 'Advanced filters by branch, subject, category' },
                            { title: 'Community Driven', desc: 'Built by students, for students worldwide' },
                            { title: 'Document Viewer', desc: 'Preview PDFs and documents in-browser' },
                            { title: 'Progress Tracking', desc: 'Personal dashboard with upload statistics' },
                            { title: 'Mobile Optimized', desc: 'Seamless experience across all devices' },
                            { title: 'Secure Storage', desc: 'Cloud-based storage with reliable access' }
                        ].map((feature, index) => (
                            <div key={index} className='bg-zinc-900 p-4 rounded-xl border border-zinc-700 text-center hover:border-orange-500 transition duration-300'>
                                <h3 className='text-lg font-semibold text-white mb-2'>{feature.title}</h3>
                                <p className='text-gray-400 text-sm'>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className='mt-16 text-center'>
                    <h2 className='text-2xl font-bold text-white mb-4'>Get in Touch</h2>
                    <p className='text-gray-400 mb-6'>
                        Have feedback, suggestions, or want to collaborate? I'd love to hear from you!
                    </p>
                    <div className='flex justify-center'>
                        <a href={`mailto:${import.meta.env.VITE_DEVELOPER_EMAIL || 'kumarujjwalsingh76@gmail.com'}`} className='flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300'>
                            <IoMdMail />
                            Contact Me
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;