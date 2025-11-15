import React from 'react';
import { FileUploader } from '../Components';

const Upload = () => {
    return (
        <div className='flex flex-col gap-y-10 align-middle justify-center items-center p-10 bg-zinc-950'>
            <div>
                <h1 className='text-5xl font-semibold text-white'>Lumin<span className='text-orange-500'>o</span>te</h1>
            </div>
            <div className='w-full'>
                <FileUploader />
            </div>
        </div>
    );
}

export default Upload;
