import React, { useEffect, useState } from 'react';
import { MdOutlineWavingHand } from "react-icons/md";
import { LiaUniversitySolid } from "react-icons/lia";
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import { handleDeleteUser } from '../features/userSlice.js';
import { useDispatch } from 'react-redux';
import { getDocumentsById } from '../features/fileSlice.js';
import DashboardOverviewCards from '../Components/DashboardOverviewCards.jsx';

const Profile = () => {
    const user = useSelector((state) => state.user.user);
    const { userDocuments } = useSelector((state) => state.files);
    const dispatch = useDispatch();
    const [userStats, setUserStats] = useState({
        totalUploads: 0,
        totalViews: 0,
        totalDownloads: 0,
        contributionScore: 0
    });

    useEffect(() => {
        if (userDocuments && userDocuments.length > 0) {
            const stats = userDocuments.reduce((acc, doc) => {
                acc.totalViews += doc.views || 0;
                acc.totalDownloads += doc.downloads || 0;
                return acc;
            }, { totalViews: 0, totalDownloads: 0 });

            setUserStats({
                totalUploads: userDocuments.length,
                totalViews: stats.totalViews,
                totalDownloads: stats.totalDownloads,
                contributionScore: (userDocuments.length * 10) + (stats.totalViews * 2) + (stats.totalDownloads * 5)
            });
        }
    }, [userDocuments]);

    useEffect(() => {
        if (user && user.id) {
            dispatch(getDocumentsById(user.id));
        }
    }, [dispatch, user]);

    console.log(user);

    const handleDeleteAccountClick = () => {
        if (window.confirm('Are you sure you want to delete your account? This will permanently delete all your data and cannot be undone.')) {
            try {
                dispatch(handleDeleteUser()).unwrap().then(() => {
                    window.location.href = '/';
                }).catch((error) => {
                    console.log(error);
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className='flex flex-col align-middle justify-center items-center w-full bg-zinc-950 px-10 py-5'>
            <div className='flex md:flex-row flex-col gap-5 md:gap-0 align-middle md:justify-between items-start w-full text-gray-50'>
                <div className='flex flex-row gap-5 align-middle justify-start items-start'>
                    <div>
                        <FaRegCircleUser className='text-5xl' />
                    </div>
                    <div className='flex flex-col align-middle justify-center items-start gap-y-1'>
                        <h1 className='text-md font-semibold'>Name: {user.name}</h1>
                        <p className='text-gray-100 text-sm'>Email: {user.email}</p>
                        <button onClick={handleDeleteAccountClick} className='border border-red-500 text-red-500 px-3 py-1 rounded cursor-pointer my-2 text-xs hover:bg-red-600 hover:text-white transition duration-300'>
                            Delete Account
                        </button>
                    </div>
                </div>
                <div className='flex flex-row gap-5 align-middle justify-center items-start'>
                    <div>
                        <LiaUniversitySolid className='text-5xl' />
                    </div>
                    <div className='flex flex-col align-middle justify-center items-start gap-y-1'>
                        <h1 className='text-md font-semibold'>University: {user.university}</h1>
                        <p className='text-gray-100 text-sm'>Course: {user.course}</p>
                        <p className='text-gray-100 text-sm'>Branch: {user.branch}</p>
                    </div>
                </div>
            </div>
            <hr className='w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />

            {/* Dashboard Overview Cards */}
            <div className='w-full'>
                <h2 className='text-2xl font-semibold text-gray-50 mb-6'>Dashboard Overview</h2>
                <DashboardOverviewCards userStats={userStats} />
            </div>
            <div className='flex align-middle justify-center items-center w-full my-10'>
                <h1 className='md:text-4xl text-3xl font-semibold text-gray-200'>More to come</h1>
            </div>
        </div>
    );
}

export default Profile;
