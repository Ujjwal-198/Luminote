import React from 'react';
import unauthorizedIllustration from '../assets/UnauthorizedIllustration.png';
import { Button } from '../Components';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {

    const navigate = useNavigate();

    return (
        <div className='flex align-middle justify-center items-center min-h-screen bg-zinc-950 text-gray-100'>
            <div className='flex flex-col align-middle justify-center items-center gap-y-5 bg-zinc-800 rounded-2xl p-5 md:mx-2 mx-10 px-10'>
                <img src={unauthorizedIllustration} alt="unauthorized" className='w-96' />
                <h1 className='text-4xl font-bold text-center'>Unauthorized</h1>
                <p className='text-center'>You are not authorized to access this page.</p>
                <div className='flex justify-center'>
                    <Button onClick={() => navigate('/')}>Reload</Button>
                </div>
            </div>
        </div>
    );
}

export default Unauthorized;
