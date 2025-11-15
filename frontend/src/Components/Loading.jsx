import React from 'react';

const Loading = () => {
    return (
        <div className='flex items-center align-middle justify-center bg-zinc-950 min-h-screen'>
            <div className='bg-zinc-800 p-8 rounded-lg shadow-lg flex flex-col items-center gap-4 px-10'>
                <h2 className='text-white text-2xl font-semibold'>Loading...</h2>
                <p className='text-gray-400 text-sm text-center my-1 '>Hold on, we're working on it</p>
                <div className='w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin'></div>
            </div>
        </div>
    );
}

export default Loading;
