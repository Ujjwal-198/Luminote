import React from 'react';
import { IoIosSearch } from "react-icons/io";
import { aktuSyllabus } from '../Constants/AktuSyllabus.js';

const SearchAndFilter = ({
    searchTerm,
    setSearchTerm,
    branchFilter,
    setBranchFilter,
    academicSessionFilter,
    setAcademicSessionFilter,
    subjectFilter,
    setSubjectFilter,
    onFilterChange,
    searchPlaceholder = "Search Notes",
    availableSubjects = ['All']
}) => {
    const branches = ['All', ...Object.keys(aktuSyllabus)];
    const academicSessions = ['All', '2024-25', '2025-26', '2026-27', '2027-28'];
    const subjects = availableSubjects;

    const handleFilterChange = (filterType, value) => {
        if (filterType === 'branch') setBranchFilter(value);
        if (filterType === 'academicSession') setAcademicSessionFilter(value);
        if (filterType === 'subject') setSubjectFilter(value);
        if (onFilterChange) onFilterChange();
    };

    return (
        <div className='flex flex-col gap-3 p-5 bg-zinc-950'>
            {/* Search Bar */}
            <div className='flex gap-2 justify-center items-center align-middle rounded-md w-full'>
                <div className='flex align-middle justify-center items-center gap-2 w-full'>
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="py-2 px-4 border text-white bg-zinc-800 border-gray-300 rounded-md w-md md:w-96 sm:w-64 text-sm focus:outline-none focus:ring focus:ring-orange-500"
                    />
                    <button className="bg-orange-600 hover:bg-orange-700 p-2 rounded-full cursor-pointer transition duration-300 hover:shadow shadow-gray-500 text-sm">
                        <IoIosSearch className='text-white text-xl font-semibold' />
                    </button>
                </div>
            </div>

            {/* Filter Options */}
            <div className='flex justify-center items-center gap-5 mt-5 text-gray-100'>
                <select
                    value={branchFilter}
                    onChange={(e) => handleFilterChange('branch', e.target.value)}
                    className="py-2 px-4 border border-gray-300 bg-zinc-800 text-white rounded-md md:w-48 sm:w-10 w-32 text-sm focus:outline-none focus:ring focus:ring-orange-500"
                >
                    {branches.map((branch) => (
                        <option className='bg-zinc-800' key={branch} value={branch}>
                            {branch}
                        </option>
                    ))}
                </select>

                <select
                    value={academicSessionFilter}
                    onChange={(e) => handleFilterChange('academicSession', e.target.value)}
                    className="py-2 px-4 border border-gray-300 bg-zinc-800 text-white rounded-md md:w-48 w-32 text-sm focus:outline-none focus:ring focus:ring-orange-500"
                >
                    {academicSessions.map((session) => (
                        <option className='bg-zinc-800' key={session} value={session}>
                            {session}
                        </option>
                    ))}
                </select>

                <select
                    value={subjectFilter}
                    onChange={(e) => handleFilterChange('subject', e.target.value)}
                    className="py-2 px-4 border border-gray-300 bg-zinc-800 text-white rounded-md md:w-48 w-32 text-sm focus:outline-none focus:ring focus:ring-orange-500"
                >
                    {subjects.map((subject) => (
                        <option className='bg-zinc-800' key={subject} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchAndFilter;