import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { MdOutlineWavingHand, MdKeyboardArrowRight } from "react-icons/md";
import { FaBookOpen, FaUpload, FaUser, FaUniversity } from "react-icons/fa";
import { Button, DocumentCard, RecentUploads } from '../Components';
import { Explore } from './index.js';
import { getDocumentsById } from '../features/fileSlice.js';
import uploadNotesIllustrations from '../assets/uploadNotesIllustrations.png';

const Dashboard = () => {
    const { user } = useSelector((state) => state.user);
    const { userDocuments: notes, userLoading: notesLoading, uploadSuccess } = useSelector((state) => state.files);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const userId = user?.id || user?._id;
        if (userId) {
            dispatch(getDocumentsById(userId));
        }
    }, [user, dispatch, uploadSuccess]);

    return (
        <div className='bg-zinc-950 min-h-screen'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8'>
                    <div className='bg-zinc-900 border border-zinc-700 rounded-2xl p-4 sm:p-6 shadow-lg'>
                        <div className='flex items-center gap-3 mb-4'>
                            <MdOutlineWavingHand className='text-3xl text-orange-500' />
                            <div>
                                <h1 className='text-xl sm:text-2xl font-bold text-white'>Welcome Back!</h1>
                                <p className='text-gray-300'>{user?.name || user?.email || 'User'}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 text-gray-400'>
                            <FaUser className='text-orange-500' />
                            <span className='text-sm'>Ready to share knowledge today?</span>
                        </div>
                    </div>

                    <div className='bg-zinc-900 border border-zinc-700 rounded-2xl p-4 sm:p-6 shadow-lg'>
                        <div className='flex items-center gap-3 mb-4'>
                            <FaUniversity className='text-3xl text-orange-500' />
                            <h2 className='text-lg sm:text-xl font-semibold text-white'>Academic Info</h2>
                        </div>
                        <div className='space-y-2 text-sm'>
                            <p className='text-gray-300'>
                                <span className='text-gray-400'>University:</span> {user?.university}
                            </p>
                            <p className='text-gray-300'>
                                <span className='text-gray-400'>Course:</span> {user?.course}
                            </p>
                            <p className='text-gray-300'>
                                <span className='text-gray-400'>Branch:</span> {user?.branch}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='border-t border-zinc-700 mb-8'></div>

                <div className='bg-zinc-900 border border-zinc-700 rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8 shadow-lg'>
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6'>
                        <div className='flex items-center gap-3'>
                            <FaBookOpen className='text-2xl text-orange-500' />
                            <h2 className='text-xl sm:text-2xl font-bold text-white'>Your Uploaded Documents</h2>
                        </div>
                        {notes.length > 0 && (
                            <Link
                                to="/dashboard/userUploads"
                                className='flex items-center gap-2 text-sm text-orange-500 hover:text-orange-400 transition duration-300'
                            >
                                Manage All <MdKeyboardArrowRight />
                            </Link>
                        )}
                    </div>

                    {notesLoading ? (
                        <div className="text-center text-gray-400 py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                            <p>Loading your uploads...</p>
                        </div>
                    ) : Array.isArray(notes) && notes.length > 0 ? (
                        <div className='space-y-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {notes.slice(0, 6).map((note) => (
                                    <DocumentCard key={note._id} file={note} />
                                ))}
                            </div>
                            <div className='flex items-center justify-center text-center w-full'>
                                <Button
                                    onClick={() => navigate('/upload')}
                                    className='flex items-center gap-2 rounded-lg font-semibold px-4 py-1'
                                >
                                    <FaUpload />
                                    Upload More Documents
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className='text-center py-12'>
                            <div className='max-w-md mx-auto'>
                                <img
                                    src={uploadNotesIllustrations}
                                    alt="Upload documents"
                                    className='w-48 mx-auto mb-6 rounded-xl shadow-lg'
                                />
                                <h3 className='text-lg sm:text-xl font-semibold text-white mb-3'>No Documents Yet</h3>
                                <p className='text-gray-400 mb-6'>
                                    Start sharing your knowledge with the community by uploading your first document.
                                </p>
                                <Button
                                    onClick={() => navigate('/upload')}
                                    className='flex items-center gap-2 mx-auto'
                                >
                                    <FaUpload />
                                    Upload Your First Document
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <div className='mb-6 sm:mb-8 flex justify-center items-center'>
                    <RecentUploads />
                </div>

                <div className='border-t border-zinc-700 mb-8'></div>

                <div className='text-center mb-6 sm:mb-8'>
                    <div className='flex items-center justify-center gap-3 mb-4'>
                        <FaBookOpen className='text-3xl text-orange-500' />
                        <h2 className='text-2xl sm:text-4xl font-bold text-white'>Explore Resources</h2>
                    </div>
                    <p className='text-gray-400 max-w-2xl mx-auto'>
                        Discover a vast collection of study materials shared by students from various universities and courses.
                    </p>
                </div>
                <Explore />
            </div>
        </div>
    );
};

export default Dashboard;