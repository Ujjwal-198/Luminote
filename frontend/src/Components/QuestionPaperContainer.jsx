import React from 'react';
import { QuestionPaperData } from "../Constants/QuestionPaperData.js";

const QuestionPaperContainer = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
                {QuestionPaperData.length > 0 ? (

                    QuestionPaperData.map((questionPaper) => (
                        <div key={questionPaper.id} className="bg-zinc-800 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-lg font-semibold mb-2">{questionPaper.Subject}</h3>
                            <p className="text-gray-300 text-sm mb-2">Code: {questionPaper.code}</p>
                            <p className="text-gray-400 text-sm">{questionPaper.Semester}</p>
                            <button className="mt-6 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-full text-sm transition-colors duration-300 cursor-pointer">
                                Download
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-400 py-10">
                        <p>No question papers found for the selected filters.</p>
                    </div>
                )}
            </div>
            {QuestionPaperData.length === 0 ? (
                <div className="col-span-full text-center text-gray-400 py-10">
                    <p>No question papers found for the selected filters.</p>
                </div>
            ) : null}
            {QuestionPaperData.length === 0 && (
                <div className="col-span-full text-center text-gray-400 py-10">
                    <p>No question papers found for the selected filters.</p>
                </div>
            )}
        </div>
    );
}

export default QuestionPaperContainer;
