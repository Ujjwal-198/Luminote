import React from 'react';
import { aktuSyllabus } from '../Constants/AktuSyllabus.js';

const LabManualContainer = ({labManualData}) => {
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5'>
                {
                    labManualData.length > 0 ? (
                        labManualData.map((labManual) => (
                            <div key={labManual.id} className="bg-zinc-800 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <h3 className="text-lg font-semibold mb-2">{labManual.Subject}</h3>
                                <p className="text-gray-300 text-sm mb-2">Code: {labManual.code}</p>
                                <p className="text-gray-400 text-sm">{labManual.Semester}</p>
                                <button className="mt-6 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-full text-sm transition-colors duration-300 cursor-pointer">
                                    Download
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-400 py-10">
                            <p>No lab manuals found for the selected filters.</p>
                        </div>
                    )
                }
            </div>

        </div>
    );
}

export default LabManualContainer;
