import React from 'react';
import { FaSearch, FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NothingFound = ({ category = 'documents', hasFilters = false }) => {
    const navigate = useNavigate();
    const { authenticated } = useSelector((state) => state.user);

    return (
        <div className='flex flex-col items-center justify-center py-16 px-6'>
            <div className='max-w-md text-center space-y-6'>
                <div className='text-6xl mb-4'>
                    {hasFilters ? '🔍' : '📚'}
                </div>
                <h3 className='text-2xl font-bold text-white'>
                    {hasFilters ? 'No Results Found' : `No ${category} Available`}
                </h3>
                <p className='text-gray-400 leading-relaxed'>
                    {hasFilters
                        ? 'Try adjusting your search filters or browse all available documents.'
                        : `Be the first to contribute ${category} to help fellow students learn and grow.`
                    }
                </p>
                <div className='flex flex-col sm:flex-row gap-3 pt-4 align-middle justify-center items-center'>
                    {hasFilters && (
                        <button
                            onClick={() => window.location.reload()}
                            className='flex items-center justify-center gap-2 px-6 py-3 border border-zinc-600 text-gray-300 rounded-lg hover:bg-zinc-700 transition duration-300'
                        >
                            <FaSearch />
                            Clear Filters
                        </button>
                    )}
                    {authenticated ? (
                        <button
                            onClick={() => navigate('/upload')}
                            className='flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300'
                        >
                            <FaUpload />
                            Upload {category}
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className='flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300'
                        >
                            Login to Upload
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NothingFound;