import React, { useState, useEffect } from 'react';
import { FaCode, FaTimes, FaGithub, FaUser, FaKey } from 'react-icons/fa';
import { MdExplore } from 'react-icons/md';

const WelcomeModal = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has seen the modal before
        const hasSeenWelcome = localStorage.getItem('luminote-welcome-seen');
        if (!hasSeenWelcome) {
            setIsVisible(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('luminote-welcome-seen', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-md w-full shadow-2xl">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-zinc-700">
                    <div className="flex items-center gap-3">
                        <FaCode className="text-2xl text-orange-500" />
                        <h2 className="text-xl font-bold text-white">Welcome to Luminote</h2>
                    </div>
                    <button 
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-300 transition duration-200"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="text-center space-y-3">
                        <p className="text-gray-300 leading-relaxed">
                            This is a <span className="text-orange-500 font-semibold">hobby project</span> built to demonstrate 
                            a modern academic document sharing platform.
                        </p>
                        
                        <div className="bg-zinc-800 border border-zinc-600 rounded-lg p-4 space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <MdExplore className="text-orange-500" />
                                <span className="font-medium">Explore with demo credentials:</span>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <FaUser className="text-xs" />
                                    <span>Email: demo@luminote.com</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <FaKey className="text-xs" />
                                    <span>Password: demo123</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500">
                            Or create your own account to test all features including file uploads and downloads.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center p-6 border-t border-zinc-700">
                    <a 
                        href="https://github.com/Ujjwal-198" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-orange-500 transition duration-200"
                    >
                        <FaGithub />
                        <span>View Source</span>
                    </a>
                    
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-200 text-sm font-medium"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeModal;