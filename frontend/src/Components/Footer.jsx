import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { FaBookOpen } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='bg-zinc-900 border-t border-zinc-700 text-gray-300 py-12 px-6'>
            <div className='max-w-7xl mx-auto'>
                {/* Main Footer Content */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
                    {/* Brand Section */}
                    <div className='space-y-4'>
                        <div className='flex items-center gap-2'>
                            <FaBookOpen className='text-2xl text-orange-500' />
                            <h3 className='text-xl font-bold text-white'>Lumin<span className='text-orange-500'>o</span>te</h3>
                        </div>
                        <p className='text-sm text-gray-400 leading-relaxed'>
                            Empowering students through collaborative learning and knowledge sharing. Access, upload, and discover academic resources.
                        </p>
                        <div className='flex gap-4'>
                            <a href='https://github.com/Ujjwal-198' target='_blank' className='text-gray-400 hover:text-orange-500 transition duration-300'>
                                <FaGithub className='text-xl' />
                            </a>
                            <a href='https://www.linkedin.com/in/ujjwal-singh-b44256271' target='_blank' className='text-gray-400 hover:text-orange-500 transition duration-300'>
                                <FaLinkedin className='text-xl' />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className='space-y-4'>
                        <h4 className='text-lg font-semibold text-white'>Quick Links</h4>
                        <ul className='space-y-2'>
                            <li><Link to='/explore' className='text-sm hover:text-orange-500 transition duration-300'>Explore Documents</Link></li>
                            <li><Link to='/upload' className='text-sm hover:text-orange-500 transition duration-300'>Upload Files</Link></li>
                            <li><Link to='/dashboard' className='text-sm hover:text-orange-500 transition duration-300'>Dashboard</Link></li>
                            <li><Link to='/profile' className='text-sm hover:text-orange-500 transition duration-300'>Profile</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className='space-y-4'>
                        <h4 className='text-lg font-semibold text-white'>Categories</h4>
                        <ul className='space-y-2'>
                            <li><Link to='/explore/notes' className='text-sm hover:text-orange-500 transition duration-300'>Notes</Link></li>
                            <li><Link to='/explore/questionpaper' className='text-sm hover:text-orange-500 transition duration-300'>Question Papers</Link></li>
                            <li><Link to='/explore/ebook' className='text-sm hover:text-orange-500 transition duration-300'>E-Books</Link></li>
                            <li><Link to='/explore/assignment' className='text-sm hover:text-orange-500 transition duration-300'>Assignments</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className='space-y-4'>
                        <h4 className='text-lg font-semibold text-white'>Contact</h4>
                        <div className='space-y-3'>
                            <div className='flex items-center gap-2'>
                                <IoMdMail className='text-orange-500' />
                                <span className='text-sm'>kumarujjwalsingh76@gmail.com</span>
                            </div>
                            <p className='text-sm text-gray-400'>
                                Have questions or suggestions? We'd love to hear from you!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className='border-t border-zinc-700 pt-6'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                        <p className='text-sm text-gray-400'>
                            © 2025 ScholarSync. All rights reserved.
                        </p>
                        <div className='flex gap-6'>
                            <Link to='#' className='text-sm text-gray-400 hover:text-orange-500 transition duration-300'>Privacy Policy</Link>
                            <Link to='#' className='text-sm text-gray-400 hover:text-orange-500 transition duration-300'>Terms of Service</Link>
                            <Link to='/about' className='text-sm text-gray-400 hover:text-orange-500 transition duration-300'>About</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
