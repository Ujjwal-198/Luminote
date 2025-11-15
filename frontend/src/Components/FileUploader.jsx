import React, { useState } from 'react';
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Button from './Button';
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import useNotesStore from '../store/notesStore.js';
import useDocumentsStore from '../store/documentsStore.js';
import { FaFileAlt } from "react-icons/fa";

const FileUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const navigate = useNavigate();
    const { documents, setDocuments } = useDocumentsStore();

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles((prev) => [...prev, ...files]);
    };

    const handleNextClick = () => {
        const filesWithId = selectedFiles.map((file, index) => ({
            id: Date.now() + index,
            name: file.name,
            size: file.size,
            type: file.type,
            file: file  // Keep original file object
        }));
        setDocuments(filesWithId);
        navigate('/uploadDetails');
    }


    return (
        <div className='flex flex-col align-middle items-center gap-y-4 min-h-screen'>

            <div className='flex flex-col gap-y-5 align-middle justify-center items-center border border-dashed p-10 w-full border-gray-600 bg-zinc-900 rounded-xl'>
                <div className='flex flex-col align-middle items-center gap-y-2 justify-center'>
                    <IoMdCloudUpload className='text-4xl text-gray-100' />
                    <h1 className='text-gray-100 md:text-2xl text-xl md:font-medium'>Drag & Drop File</h1>
                </div>
                <p className='text-gray-100 text-sm'>Or If you want to upload a file</p>
                <label className='bg-orange-600 px-4 py-2 rounded-full text-sm cursor-pointer hover:shadow-lg transition duration-300 text-white hover:bg-orange-700'>
                    Choose File
                    <input
                        type='file'
                        multiple='true'
                        className='hidden'
                        accept='.pdf, .doc, .docx'
                        onChange={(e) => {
                            handleFileChange(e);
                        }}
                    />
                </label>

                <p className='text-gray-100 text-sm'>Only upload PDF, DOC, DOCX files.</p>
            </div>
            <div className='flex flex-col align-middle items-start gap-y-2 w-full px-5'>

                {
                    selectedFiles.length === 0 ? (
                        <div className=' flex align-middle justify-center items-center w-full my-5'>
                            <h1 className='text-2xl text-center align-middle justify-center text-white'>No Files Selected</h1>
                        </div>
                    ) : (<div className='flex flex-col align-middle justify-center items-center w-full gap-5'>
                        <h1 className='text-gray-100 text-2xl font-medium my-4'>Selected Files</h1>
                        <div className='flex flex-col gap-y-2 w-full'>
                            {selectedFiles.map((file, index) => (
                                <div key={index} className='flex flex-row justify-between items-center w-full bg-zinc-900 p-2 px-5 rounded-lg'>
                                    <div className='flex flex-row gap-x-3 text-gray-100 align-middle items-center justify-center'>
                                        <FaFileAlt className='text-xl' />
                                        <div className='flex flex-col gap-1 align-middle justify-center items-start'>
                                            <p className='text-sm font-medium'>{file.name}</p>
                                            <p className='text-xs'>{(file.size / 1000000).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <MdDelete onClick={() => {
                                        setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
                                    }} className='text-gray-100 text-2xl cursor-pointer transition duration-200 hover:text-red-500' />
                                </div>
                            ))}
                        </div>
                        <div className='flex md:flex-row flex-col gap-x-8 gap-y-4 my-5 align-middle md:justify-end justify-center items-end w-full'>
                            {/* <Button className='flex gap-2 align-middle items-center text-gray-50'><IoMdCloudUpload className='text-xl text-gray-100' />Upload More</Button> */}
                            <Button onClick={handleNextClick} className='flex gap-3 align-middle items-center justify-center text-gray-50'>Next<FaArrowRight className='text-gray-100 font-semibold text-md' /></Button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
}

export default FileUploader; 
