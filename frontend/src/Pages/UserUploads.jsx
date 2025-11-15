import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDocumentsById } from '../features/fileSlice.js';
import { useState, useEffect } from 'react';
import { DocumentCard, Button } from '../Components';
import { FaUser, FaUpload } from 'react-icons/fa';
import noUploadsYet from '../assets/noUploadsYet.png';
import { Pagination } from '../Components';

const UserUploads = () => {

    const { user, loading } = useSelector((state) => state.user);
    const { userDocuments: notes, userLoading: notesLoading, uploadSuccess } = useSelector((state) => state.files);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const documentsPerPage = parseInt(import.meta.env.VITE_DOCUMENTS_PER_PAGE) || 9;
    const totalPages = Math.ceil(notes.length / documentsPerPage);
    const indexOfLastDocument = currentPage * documentsPerPage;
    const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
    const currentDocuments = notes.slice(indexOfFirstDocument, indexOfLastDocument);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        if (user?.id) {
            dispatch(getDocumentsById(user.id));
        }
    }, [user, dispatch, uploadSuccess]);
    console.log(notes);



    return (
        <div className='flex flex-col align-middle justify-center items-center p-10 w-full text-gray-200 bg-zinc-950'>
            <div className='text-center mb-12'>
                <div className='flex items-center justify-center gap-3 mb-4'>
                    <FaUser className='text-4xl text-orange-500' />
                    <h1 className='text-4xl font-bold text-white'>My Uploads</h1>
                </div>
                <p className='text-gray-400 max-w-2xl mx-auto'>
                    Manage and view all the study materials you've shared with the community.
                </p>
            </div>
            {
                notes && notes.length > 0 ? (
                    <div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 align-middle items-stretch justify-center p-4 w-full'>
                            {
                                currentDocuments.map((note) => (
                                    <DocumentCard key={note._id} file={note} showDelete={true} />
                                ))
                            }
                        </div>
                        {totalPages > 1 && (
                            <Pagination
                                pages={totalPages}
                                page={currentPage}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                ) : (
                    <div className='flex flex-col text-gray-200 gap-5 align-middle justify-center items-center p-10 rounded-xl bg-zinc-900 w-full'>
                        <div className='flex align-middle justify-center items-center w-full mb-3'>
                            <h1 className='text-2xl'>No Uploads Yet</h1>
                        </div>
                        <div>
                            <img src={noUploadsYet} alt="No Uploads" className='w-60 mx-auto rounded-xl shadow' />
                        </div>
                        <div className='flex flex-col gap-2 align-middle justify-center items-center w-full'>
                            <p>You have not uploaded any files yet</p>
                            <p>Upload a file to get started</p>
                        </div>
                        <div className='flex align-middle justify-center items-center w-full'>
                            <Button onClick={() => window.location.href = '/upload'}>Upload</Button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default UserUploads;
