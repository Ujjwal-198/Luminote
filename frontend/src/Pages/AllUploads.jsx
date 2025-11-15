import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loading } from '../Components';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDocuments } from '../features/fileSlice';
import { DocumentCard } from '../Components';
import { Pagination } from '../Components';
import { FaBookOpen } from 'react-icons/fa';

const AllUploads = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { documents, loading } = useSelector((state) => state.files);
    console.log(documents);

    const documentsPerPage = parseInt(import.meta.env.VITE_DOCUMENTS_PER_PAGE) || 9;
    const totalDocuments = documents.length;
    const totalPages = Math.ceil(totalDocuments / documentsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * documentsPerPage;
    const endIndex = startIndex + documentsPerPage;
    const paginatedDocuments = documents.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        dispatch(getDocuments({})).unwrap();
    }, [dispatch]);

    return (
        <div className='flex flex-col align-middle justify-center items-center p-10 w-full text-gray-200 bg-zinc-950'>
            <div className='text-center mb-12'>
                    <div className='flex items-center justify-center gap-3 mb-4'>
                        <FaBookOpen className='text-4xl text-orange-500' />
                        <h1 className='text-4xl font-bold text-white'>All Uploads</h1>
                    </div>
                    <p className='text-gray-400 max-w-2xl mx-auto'>
                        Explore our complete collection of study materials shared by students from universities worldwide.
                    </p>
                </div>
            {
                loading ? (
                    <Loading />
                ) :
                    <div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 align-middle items-stretch justify-center p-4 w-full'>
                            {paginatedDocuments.map((file) => (
                                <DocumentCard key={file._id} file={file} />
                            ))}
                        </div>
                        {
                            totalPages > 1 && <Pagination
                                pages={totalPages}
                                page={currentPage}
                                onPageChange={handlePageChange}
                            />
                        }

                    </div>
            }
        </div>
    );
}

export default AllUploads;
