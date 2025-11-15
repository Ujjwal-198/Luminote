import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { FaBookOpen } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleLogout, logout } from '../features/userSlice.js';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { authenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogoutClick = async () => {
        try {
            await dispatch(handleLogout()).unwrap();
        } catch (error) {
            console.log(error);
        } finally {
            navigate('/');
            dispatch(logout());
        }
    };

    const closeMenu = () => setIsOpen(false);

    return (
        <header className='sticky top-0 z-50 bg-zinc-900 border-b border-zinc-700 text-gray-200'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-14'>
                    {/* Logo */}
                    <Link
                        to={authenticated ? '/dashboard' : '/'}
                        className='flex items-center gap-2 text-2xl font-bold text-white hover:text-orange-500 transition duration-300'
                    >
                        <FaBookOpen className='text-orange-500' />
                        <div>Lumin<span className='text-orange-500'>o</span>te</div>

                    </Link>

                    {/* Desktop Navigation */}
                    <nav className='hidden md:flex items-center gap-8'>
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                `text-md font-medium transition duration-300 ${isActive ? 'text-orange-500' : 'text-gray-300 hover:text-orange-500'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to='/explore'
                            className={({ isActive }) =>
                                `text-md font-medium transition duration-300 ${isActive ? 'text-orange-500' : 'text-gray-300 hover:text-orange-500'
                                }`
                            }
                        >
                            Explore
                        </NavLink>
                        {authenticated && (
                            <NavLink
                                to='/dashboard'
                                className={({ isActive }) =>
                                    `text-md font-medium transition duration-300 ${isActive ? 'text-orange-500' : 'text-gray-300 hover:text-orange-500'
                                    }`
                                }
                            >
                                Dashboard
                            </NavLink>
                        )}
                        <NavLink
                            to='/about'
                            className={({ isActive }) =>
                                `text-md font-medium transition duration-300 ${isActive ? 'text-orange-500' : 'text-gray-300 hover:text-orange-500'
                                }`
                            }
                        >
                            About
                        </NavLink>
                    </nav>

                    {/* Desktop Auth Buttons */}
                    <div className='hidden md:flex items-center gap-4'>
                        {authenticated ? (
                            <>
                                <button
                                    onClick={() => navigate('/profile')}
                                    className='px-4 py-1 text-sm border border-orange-600 text-orange-500 rounded-lg hover:bg-orange-600 hover:text-white transition duration-300  cursor-pointer'
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={handleLogoutClick}
                                    className='px-4 py-1 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300  cursor-pointer'
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate('/login')}
                                    className='px-4 py-1 text-sm border border-orange-600 text-orange-500 rounded-lg hover:bg-orange-600 hover:text-white transition duration-300  cursor-pointer'
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate('/register')}
                                    className='px-4 py-1 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300  cursor-pointer'
                                >
                                    Register
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className='md:hidden p-2 text-gray-300 hover:text-orange-500 transition duration-300'
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <RxCross2 className='text-xl' /> : <RxHamburgerMenu className='text-xl' />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className='md:hidden border-t border-zinc-700 py-4'>
                        <nav className='flex flex-col gap-2'>
                            <NavLink
                                to='/'
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `px-4 py-2 text-sm rounded-lg transition duration-300 ${isActive ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-zinc-800 hover:text-orange-500'
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to='/explore'
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `px-4 py-2 text-sm rounded-lg transition duration-300 ${isActive ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-zinc-800 hover:text-orange-500'
                                    }`
                                }
                            >
                                Explore
                            </NavLink>
                            {authenticated && (
                                <NavLink
                                    to='/dashboard'
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `px-4 py-2 text-sm rounded-lg transition duration-300 ${isActive ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-zinc-800 hover:text-orange-500'
                                        }`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            )}
                            <NavLink
                                to='/about'
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `px-4 py-2 text-sm rounded-lg transition duration-300 ${isActive ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-zinc-800 hover:text-orange-500'
                                    }`
                                }
                            >
                                About
                            </NavLink>

                            {/* Mobile Auth Buttons */}
                            <div className='flex flex-col gap-2 mt-4 px-4'>
                                {authenticated ? (
                                    <>
                                        <button
                                            onClick={() => { navigate('/profile'); closeMenu(); }}
                                            className='w-full px-4 py-2 text-sm border border-orange-600 text-orange-500 rounded-lg hover:bg-orange-600 hover:text-white transition duration-300'
                                        >
                                            Profile
                                        </button>
                                        <button
                                            onClick={() => { handleLogoutClick(); closeMenu(); }}
                                            className='w-full px-4 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300'
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => { navigate('/login'); closeMenu(); }}
                                            className='w-full px-4 py-2 text-sm border border-orange-600 text-orange-500 rounded-lg hover:bg-orange-600 hover:text-white transition duration-300'
                                        >
                                            Login
                                        </button>
                                        <button
                                            onClick={() => { navigate('/register'); closeMenu(); }}
                                            className='w-full px-4 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300'
                                        >
                                            Register
                                        </button>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
