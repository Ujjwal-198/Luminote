import React, { useState } from 'react';
import { IoMdEye, IoMdDownload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { deleteDocument } from '../features/fileSlice.js';

const DocumentCard = ({ file, className = '', showDelete = false }) => {
    const { user, authenticated } = useSelector((state) => state.user);
    const [viewCount, setViewCount] = useState(file.views || 0);
    const [downloadCount, setDownloadCount] = useState(file.downloads || 0);
    const [showViewer, setShowViewer] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const handleView = () => {
        // Increment view count for all files when modal opens
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/files/view/${file.nodeId}`, {
            method: 'GET',
            credentials: 'include'
        }).then(() => {
            setViewCount(prev => prev + 1);
        }).catch(console.error);
        setShowViewer(true);
        setIsLoading(true);
    };

    const handleDownload = () => {
        // Let backend handle download count increment
        window.open(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/files/download/${file.nodeId}`, '_blank');
        setDownloadCount(prev => prev + 1);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this document?')) {
            dispatch(deleteDocument(file.nodeId));
        }
    };

    return (
        <>
            <div className={`flex flex-col w-80 h-[440px] bg-zinc-800 border border-zinc-700 hover:border-orange-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
                {/* Header Section */}
                <div className='flex justify-between items-start mb-3'>
                    <div className='flex-1 min-w-0 overflow-hidden'>
                        {file.subject && (
                            <span className='inline-block px-2 py-1 text-xs bg-zinc-900 text-white rounded-md mb-2 truncate max-w-full'>
                                {file.subject}
                            </span>
                        )}
                        <h3 className='text-lg font-semibold text-white leading-tight mb-1 overflow-hidden wrap-break-word' style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                            {file.title}
                        </h3>
                    </div>
                    {showDelete && user && authenticated && user.id === (file.uploadedBy?._id || file.uploadedBy) && (
                        <button onClick={handleDelete} className='ml-2 p-1 text-red-500 hover:text-red-400 transition duration-300 cursor-pointer'>
                            <MdDelete className='text-xl' />
                        </button>
                    )}
                </div>

                {/* Description Section */}
                <div className='mb-4'>
                    <p className='text-sm text-gray-300 leading-relaxed overflow-hidden' style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                        {file.description}
                    </p>
                </div>

                {/* Details Grid */}
                <div className='space-y-2 mb-4 text-xs text-gray-400'>
                    <div className='flex justify-between items-center'>
                        <span className='truncate max-w-32'>Branch: {file.branch}</span>
                        <span className='ml-2 truncate max-w-20'>{file.course}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className='truncate max-w-32'>Category: {file.category}</span>
                        <span className='ml-2'>{file.size ? (file.size / 1000000).toFixed(1) : '?'} MB</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className='truncate max-w-20'>Year: {file.academicYear}</span>
                        <span className='ml-2 truncate max-w-24'>By: {file.uploadedBy?.name || 'Unknown'}</span>
                    </div>
                    <div className='text-center text-gray-500'>
                        {new Date(file.uploadedAt).toLocaleDateString()}
                    </div>
                </div>

                {/* Stats Section */}
                <div className='flex justify-center gap-6 mb-4 py-2 bg-zinc-900 rounded-lg'>
                    <div className='flex items-center gap-1 text-gray-300'>
                        <IoMdEye className='text-blue-400' />
                        <span className='text-sm'>{viewCount}</span>
                    </div>
                    <div className='flex items-center gap-1 text-gray-300'>
                        <IoMdDownload className='text-green-400' />
                        <span className='text-sm'>{downloadCount}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-2 mt-auto mb-2'>
                    {(() => {
                        const fileExtension = file.name?.split('.').pop().toLowerCase();
                        const isPdf = fileExtension === 'pdf';

                        return (
                            <>
                                <div className='flex-1 relative group'>
                                    <button
                                        onClick={isPdf ? handleView : undefined}
                                        disabled={!isPdf}
                                        className={`w-full py-2 text-sm rounded-lg transition duration-300 font-medium ${isPdf
                                            ? 'border border-orange-600 text-orange-500 hover:bg-orange-600 cursor-pointer hover:text-white'
                                            : 'border border-gray-600 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        View
                                    </button>
                                    {!isPdf && (
                                        <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-zinc-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10'>
                                            Browser preview only supports PDF files
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={handleDownload}
                                    className='flex-1 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 font-medium cursor-pointer'
                                >
                                    Download
                                </button>
                            </>
                        );
                    })()}
                </div>
            </div>

            {/* Document Viewer Modal */}
            {showViewer && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setShowViewer(false)}>
                    <div className="rounded-lg w-11/12 h-5/6 flex flex-col bg-zinc-950" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-200">{file.title}</h3>
                            <button onClick={() => setShowViewer(false)} className="text-gray-400 cursor-pointer hover:text-gray-600">
                                <IoClose size={24} />
                            </button>
                        </div>
                        <div className="flex-1 relative">
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-10">
                                    <div className="text-center text-gray-300">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                                        <p>Loading document...</p>
                                    </div>
                                </div>
                            )}
                            {(() => {
                                const fileExtension = file.name?.split('.').pop().toLowerCase();
                                if (fileExtension === 'pdf') {
                                    return (
                                        <iframe
                                            src={`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/files/view/${file.nodeId}`}
                                            className="w-full h-full border-0"
                                            title={file.title}
                                            onLoad={() => setIsLoading(false)}
                                        />
                                    );
                                } else {
                                    // Hide loading for non-PDF files immediately
                                    setTimeout(() => setIsLoading(false), 100);
                                    return (
                                        <div className="flex flex-col items-center justify-center h-full p-8 text-gray-300">
                                            <div className="text-center">
                                                <div className="text-6xl mb-4">📄</div>
                                                <h4 className="text-xl font-semibold mb-2">Document Preview</h4>
                                                <p className="mb-4">Preview not available for this file type.</p>
                                                <p className="text-sm mb-6">Click download to view the document.</p>
                                                <button
                                                    onClick={() => {
                                                        setShowViewer(false);
                                                        handleDownload();
                                                    }}
                                                    className="bg-orange-600 hover:bg-orange-700 cursor-pointer text-white px-6 py-2 rounded-lg transition duration-300"
                                                >
                                                    Download Document
                                                </button>
                                            </div>
                                        </div>
                                    );
                                }
                            })()
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DocumentCard;