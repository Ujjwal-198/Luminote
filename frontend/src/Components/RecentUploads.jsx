import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDocuments } from '../features/fileSlice';
import { Button, DocumentCard } from './index.js';
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

const RecentUploads = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { documents, loading } = useSelector((state) => state.files);

    useEffect(() => {
        dispatch(getDocuments({})).unwrap();
    }, [dispatch]);

    // Get recent uploads (last 5 documents)
    const recentFiles = Array.isArray(documents) ? documents.slice(0, 6) : [];
    console.log(recentFiles);


    return (
        <div className='flex flex-col align-middle justify-center items-center'>
            <div className='flex align-middle justify-start items-start w-full my-3'>
                <h1 className='text-4xl text-gray-200 font-semibold'>Recent Uploads</h1>
            </div>
            {recentFiles.length > 6 && <div className='flex align-middle justify-end items-end w-full my-3'>
                <Link to="/allUploads" className='flex flex-row align-middle justify-center items-center gap-2 text-sm text-orange-500 hover:text-orange-600 transition duration-200 cursor-pointer'>
                    View All <MdKeyboardArrowRight />
                </Link>
            </div>}
            {
                loading ? (
                    <div className='flex align-middle justify-center items-center text-center text-gray-400 py-10'>Loading recent uploads...</div>
                ) : recentFiles.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center align-middle justify-center p-4 w-full'>
                        {recentFiles.map((file) => (
                            <DocumentCard className='bg-zinc-800' key={file._id} file={file} />
                        ))}
                    </div>
                ) : (
                    <div className='text-center text-gray-400 py-10'>
                        <h1 className='text-xl'>No Recent Uploads</h1>
                    </div>
                )
            }
            {
                recentFiles.length >= 6 && <div className='flex align-middle justify-center items-center w-full my-3'>
                    <Button onClick={() => navigate('/allUploads')} className='flex align-middle justify-center items-center w-full gap-2 rounded-lg text-md font-semibold' >
                        View All <MdKeyboardArrowRight />
                    </Button>
                </div>
            }
        </div>

    );
}

export default RecentUploads;
