import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";

const ExploreCard = ({ title, description, link }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-between bg-zinc-900 text-white p-6 rounded-2xl w-[300px] h-[250px] shadow-md hover:shadow-lg transition duration-300 hover:scale-101 inset-shadow-2xs inset-shadow-black">
            <div>
                <h1 className="text-lg font-semibold mb-2">{title}</h1>
                <p className="text-sm text-gray-300">{description}</p>
            </div>
            <div>
                <button
                    onClick={() => link && navigate(link)}
                    className="flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 px-8 py-2 rounded-lg cursor-pointer transition duration-300 hover:shadow shadow-gray-500 text-sm"
                >
                    Explore <FaArrowRightLong />
                </button>
            </div>
        </div>
    );
};

export default ExploreCard;
