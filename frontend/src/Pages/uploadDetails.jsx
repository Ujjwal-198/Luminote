import React from 'react';
import useNotesStore from '../store/notesStore.js';
import useDocumentsStore from '../store/documentsStore.js';
import { useForm } from 'react-hook-form';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaFileAlt } from "react-icons/fa";
import universities from '../Constants/universities_50_full.json';
import { Button } from "../Components";
import { IoMdCloudUpload } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { uploadFiles, clearUploadSuccess, setUploadProgress } from '../features/fileSlice';

const UploadDetails = () => {
    const { documents, removeDocument } = useDocumentsStore();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'onChange'
    });
    const navigate = useNavigate();
    const categories = ['Lecture', 'Notes', 'Slides', 'Syllabus', 'Question papers', 'Reference books', 'Lab Manuals', 'PPTs', 'Practice materials', 'Practical', 'Summaries', 'Mandatory assignments', 'Tutorial work', 'Essays', 'Other'];
    const academicYears = ['2025-26', '2024-25', '2023-24', '2022-23', '2021-22', '2020-21', '2019-20', '2018-19', '2017-18', '2016-17'];

    const { user, authenticated, loading, error } = useSelector((state) => state.user);
    const { loading: fileLoading, uploadSuccess, error: fileError, uploadProgress, currentFile } = useSelector(state => state.files);
    const dispatch = useDispatch();
    console.log('User from uploadDetails:', user);

    React.useEffect(() => {
        if (documents.length === 0) {
            navigate('/upload');
        }
    }, [documents, navigate]);

    React.useEffect(() => {
        if (uploadSuccess) {
            navigate('/dashboard');
            dispatch(clearUploadSuccess());
        }
    }, [uploadSuccess, navigate, dispatch]);


    const onSubmit = async (data) => {
        console.log('=== FRONTEND SUBMIT ===');
        console.log('Form data:', data);
        console.log('Documents from store:', documents);

        const formData = new FormData();
        formData.append('university', data.university);
        formData.append('course', data.course);
        formData.append('branch', data.branch);
        formData.append('userId', user.id);

        const documentsData = {};
        documents.forEach(fileWrapper => {
            const actualFile = fileWrapper.file; // Get the actual File object
            console.log('Adding file to FormData:', actualFile.name, 'Size:', actualFile.size);
            console.log('File type:', typeof actualFile, 'Is File:', actualFile instanceof File);
            formData.append('files', actualFile);
            documentsData[actualFile.name] = {
                title: data.documents[fileWrapper.id].title,
                category: data.documents[fileWrapper.id].category,
                academicYear: data.documents[fileWrapper.id].academicYear,
                subject: data.documents[fileWrapper.id].subject || '',
                description: data.documents[fileWrapper.id].description,
                uploadedBy: user.name,
            };
        });

        formData.append('documents', JSON.stringify(documentsData));
        console.log('Documents metadata:', documentsData);

        // Debug FormData
        for (let [key, value] of formData.entries()) {
            console.log('FormData entry:', key, typeof value === 'object' ? 'File object' : value);
        }

        dispatch(uploadFiles(formData));
    }

    return (
        <div className='flex flex-col align-middle justify-center items-center py-10 md:px-20 px-10 bg-zinc-950 text-gray-50 w-full'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-5 align-middle justify-center items-center text-gray-50 w-full'>
                <div>
                    <h1 className='text-2xl font-semibold'>Upload Details</h1>
                </div>
                <div className='flex flex-col align-middle items-center my-5 md:mx-0 mx-5 gap-y-3 w-full'>
                    <div className='flex md:flex-row flex-col items-start align-middle justify-start md:w-md w-full gap-y-2'>
                        <p className='text-sm  md:w-1/3 w-full text-gray-200'>University/College</p>
                        <input
                            className='w-full md:w-2/3 border text-sm border-gray-500 rounded-xl px-4 py-1 focus:outline-none focus:border-gray-800 transition duration-200 text-gray-200'
                            placeholder='Enter Your University'
                            type='text'
                            {...register('university', { required: true })}
                            list='universities'
                            defaultValue={user?.university || ''}
                        />
                    </div>
                    {errors.university && <span className="text-red-600 text-xs">University is required</span>}
                    <div className='flex md:flex-row flex-col items-start align-middle justify-start md:w-md w-full gap-y-2'>
                        <p className='text-sm md:w-1/3 w-full text-gray-200'>Course</p>
                        <input
                            className='w-full md:w-2/3 border text-sm border-gray-500 rounded-xl px-4 py-1 focus:outline-none focus:border-gray-800 transition duration-200 text-gray-200'
                            placeholder='Enter Your Course'
                            type='text'
                            {...register('course', { required: true })}
                            list='courses'
                            defaultValue={user?.course || ''}
                        />
                    </div>
                    {errors.course && <span className="text-red-600 text-xs">Course is required</span>}
                    <div className='flex md:flex-row flex-col items-start align-middle justify-start md:w-md w-full gap-y-2'>
                        <p className='text-sm md:w-1/3 w-full text-gray-200'>Branch</p>
                        <input
                            className='w-full md:w-2/3 border text-sm border-gray-500 rounded-xl px-4 py-1 focus:outline-none focus:border-gray-800 transition duration-200 text-gray-200'
                            placeholder='Enter Your Branch'
                            type='text'
                            {...register('branch', { required: true })}
                            defaultValue={user?.branch || ''}
                        />
                    </div>
                    {errors.branch && <span className="text-red-600 text-xs">Branch is required</span>}
                </div>
                {fileLoading && (
                    <div className="w-full max-w-md mx-auto py-6">
                        <div className="text-center text-orange-500 mb-4">
                            {currentFile ? `Uploading: ${currentFile}` : 'Preparing upload...'}
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                            <div
                                className="bg-orange-500 h-3 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                        <div className="text-center text-sm text-gray-400">
                            {uploadProgress}% Complete
                        </div>
                    </div>
                )}
                {fileError && <div className="text-center text-red-500 py-4">{fileError}</div>}

                <div className='flex flex-col gap-y-5 align-middle justify-center items-center w-full '>
                    {
                        documents.length > 0 && documents.map((file) => {
                            return (
                                <div className='flex flex-col align-middle items-center gap-y-2 py-4 border border-gray-600 rounded-xl w-full px-10' key={file.id}>
                                    <div className='flex align-middle justify-between items-center w-full'>
                                        <div className='flex gap-3 text-gray-100 align-middle justify-center items-center'>
                                            <FaFileAlt className='text-xl' />
                                            <div className='flex flex-col align-middle justify-center items-start'>
                                                <h1 className='font-md'>{file.name}</h1>
                                                <p className='text-sm'>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                        <button onClick={() => removeDocument(file)} className='flex align-middle justify-center items-center cursor-pointer'>
                                            <MdDelete className='text-2xl hover:text-red-500 transition duration-200' />
                                        </button>
                                    </div>
                                    <hr className='border border-gray-700 my-2 mx-10 w-full' />
                                    <div className='flex flex-col align-middle items-start w-full my-3'>
                                        <div className='flex flex-col gap-y-3 align-middle items-start w-full'>
                                            <div className='flex flex-col md:flex-row align-middle items-start md:items-center gap-2 w-full'>
                                                <p className='w-full md:w-1/4 text-sm'>Title</p>
                                                <input
                                                    className='text-sm w-2/4 border border-gray-600 rounded-xl px-4 py-1 focus:outline-none focus:border-gray-800 transition duration-200'
                                                    placeholder='Title'
                                                    type='text'
                                                    {...register(`documents.${file.id}.title`, { required: true })}
                                                    defaultValue={file.name?.split('.')[0] || ''}
                                                />
                                                {errors.documents?.[file.id]?.title && <span className='text-red-500 text-xs md:mx-3'>Title is required</span>}
                                            </div>
                                            <div className='flex flex-col md:flex-row align-middle items-start md:items-center gap-2 w-full'>
                                                <p className='w-full md:w-1/4 text-sm'>Category</p>
                                                <select
                                                    defaultValue=""
                                                    className="text-sm w-full md:w-2/4 border border-gray-500 rounded-xl px-4 py-1 focus:outline-none focus:border-gray-800 transition duration-200 bg-zinc-900 text-gray-300"
                                                    {...register(`documents.${file.id}.category`, { required: true })}
                                                >
                                                    <option value="" disabled hidden>
                                                        Please select
                                                    </option>
                                                    {categories.map((category) => (
                                                        <option key={category} value={category}>
                                                            {category}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.documents?.[file.id]?.category && <span className='text-red-600 text-xs md:mx-3'>Category is required</span>}
                                            </div>
                                            <div className='flex flex-col md:flex-row align-middle items-start md:items-center gap-2 w-full'>
                                                <p className='w-full md:w-1/4 text-sm'>Academic Year</p>
                                                <select
                                                    defaultValue=''
                                                    className='text-sm w-full md:w-2/4 border border-gray-500 rounded-xl px-4 py-1 focus:outline-none focus:border-gray-800 transition duration-200 bg-zinc-900 text-gray-300'
                                                    {...register(`documents.${file.id}.academicYear`, { required: true })}
                                                >
                                                    <option value="" disabled hidden>
                                                        Please select
                                                    </option>
                                                    {academicYears.map((year) => {
                                                        return (
                                                            <option key={year} value={year}>{year}</option>
                                                        )
                                                    })}
                                                </select>
                                                {errors.documents?.[file.id]?.academicYear && <span className='text-red-600 text-xs md:mx-3'>Academic Year is required</span>}                                            </div>
                                            <div className='flex flex-col md:flex-row align-middle items-start md:items-center gap-2 w-full'>
                                                <p className='w-full md:w-1/4 text-sm'>Subject</p>
                                                <input
                                                    className='text-sm w-full md:w-2/4 border border-gray-500 rounded-xl px-4 py-1 focus:outline-none focus:border-gray-800 transition duration-200 bg-zinc-900 text-gray-300'
                                                    placeholder='Optional'
                                                    type='text'
                                                    {...register(`documents.${file.id}.subject`)}
                                                />
                                            </div>
                                            <div className='flex flex-col md:flex-row align-middle items-start md:items-center gap-2 w-full'>
                                                <p className='w-full md:w-1/4 text-sm'>Description</p>
                                                <textarea
                                                    className='text-sm w-full md:w-2/4 border border-gray-500 rounded-xl px-4 py-2 focus:outline-none focus:border-gray-800 transition duration-200 bg-zinc-900 text-gray-300'
                                                    placeholder='Description'
                                                    rows='3'
                                                    {...register(`documents.${file.id}.description`, { required: true })}
                                                >
                                                </textarea>
                                                {errors.documents?.[file.id]?.description && <span className='text-red-600 text-xs md:mx-3'>Description is required</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='flex justify-end mt-6 w-full'>
                    <Button
                        type='submit'
                        disabled={fileLoading}
                        className='flex align-middle justify-center items-center gap-x-2 disabled:bg-gray-500'
                    >
                        {fileLoading ? 'Uploading...' : 'Upload Documents'}
                        <IoMdCloudUpload className='text-xl' />
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default UploadDetails;