import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
const NotesContainer = ({ notesData }) => {

    


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
            {notesData.length > 0 ? (
                notesData.map((note) => (
                    <div key={note.id} className="bg-zinc-800 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex justify-between items-start mb-3">
                            <span className=" text-xs px-2 bg-zinc-900 py-1 rounded">{note.branch}</span>
                            <span className="text-yellow-400 text-sm">★ {note.rating}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{note.subject.name}</h3>
                        <p className="text-gray-300 text-sm mb-2">Code: {note.subject.code}</p>
                        <p className="text-gray-400 text-sm">{note.semester}</p>
                        <button className="mt-6 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-full text-sm transition-colors duration-300 cursor-pointer">
                            Download
                        </button>
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center text-gray-400 py-10">
                    <p>No notes found for the selected filters.</p>
                </div>
            )}
        </div>
    );
}

export default NotesContainer;
