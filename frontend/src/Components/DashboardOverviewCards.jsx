import React from 'react';
import { IoMdCloudUpload, IoMdEye, IoMdDownload, IoMdTrophy } from "react-icons/io";
import { FaFileAlt, FaCalendarAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';

const DashboardOverviewCards = ({ userStats }) => {
    const { user } = useSelector((state) => state.user);

    const cards = [
        {
            title: 'Total Uploads',
            value: userStats?.totalUploads || 0,
            icon: <IoMdCloudUpload className='text-3xl text-orange-500' />,
            description: 'Documents uploaded',
            bgColor: 'bg-zinc-900',
            borderColor: 'border-orange-500'
        },
        {
            title: 'Total Views',
            value: userStats?.totalViews || 0,
            icon: <IoMdEye className='text-3xl text-blue-500' />,
            description: 'Times viewed',
            bgColor: 'bg-zinc-900',
            borderColor: 'border-blue-500'
        },
        {
            title: 'Total Downloads',
            value: userStats?.totalDownloads || 0,
            icon: <IoMdDownload className='text-3xl text-green-500' />,
            description: 'Times downloaded',
            bgColor: 'bg-zinc-900',
            borderColor: 'border-green-500'
        },
        {
            title: 'Contribution Score',
            value: userStats?.contributionScore || 0,
            icon: <IoMdTrophy className='text-3xl text-yellow-500' />,
            description: 'Points earned',
            bgColor: 'bg-zinc-900',
            borderColor: 'border-yellow-500'
        }
    ];

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-8'>
            {cards.map((card, index) => (
                <div
                    key={index}
                    className={`${card.bgColor} ${card.borderColor} border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105`}
                >
                    <div className='flex items-center justify-between mb-4'>
                        <div className='flex items-center gap-3'>
                            {card.icon}
                            <div>
                                <h3 className='text-gray-200 text-sm font-medium'>{card.title}</h3>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-3xl font-bold text-white mb-1'>
                            {formatNumber(card.value)}
                        </span>
                        <span className='text-gray-400 text-xs'>
                            {card.description}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardOverviewCards;