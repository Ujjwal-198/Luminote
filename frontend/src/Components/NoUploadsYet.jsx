import React from 'react';
import noUploadsYet from '../assets/noUploadsYet.png';
import { Button } from '../Components';
const NoUploadsYet = () => {
    return (
        <div className='flex flex-col align-middle justify-center items-center gap-5 w-full rounded-xl shadow bg-zinc-900 p-10'>
            <div>
                <img src={noUploadsYet} alt="No Uploads" className='w-60 mx-auto rounded-xl shadow' />
            </div>
            <div className='flex flex-col align-middle items-center justify-center'>
                <p>No uploads have been made yet to this category</p>
                <p>Be the first to upload a file!</p>
            </div>
            <div className='flex align-middle items-center justify-center'>
                <Button onClick={() => window.location.href = '/upload'}>Upload</Button>
            </div>
        </div>
    );
}

export default NoUploadsYet;
