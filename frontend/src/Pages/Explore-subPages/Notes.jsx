import React from 'react';
import { useState } from 'react';
import { aktuSyllabus } from '../../Constants/AktuSyllabus.js';
import SearchAndFilter from '../../Components/SearchAndFilter.jsx';
import Pagination from '../../Components/Pagination.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getDocuments } from '../../features/fileSlice';
import { DocumentCard, NothingFound } from '../../Components/index.js';

const Notes = () => {
    const dispatch = useDispatch();
    const { documents, loading } = useSelector(state => state.files);

    const [branchFilter, setBranchFilter] = useState('All');
    const [academicSessionFilter, setAcademicSessionFilter] = useState('All');
    const [subjectFilter, setSubjectFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    React.useEffect(() => {
        dispatch(getDocuments({ category: 'Notes' }));
    }, [dispatch]);

    console.log('Documents:', documents);
    console.log('Sample document:', documents[0]);
    console.log('Environment URL:', import.meta.env.VITE_API_URL);

    // Branch mapping for short and long forms
    const branchMapping = {
        'CS': ['CS', 'Computer Science', 'Computer Science Engineering'],
        'CSE': ['CSE', 'Computer Science Engineering', 'Computer Science'],
        'IT': ['IT', 'Information Technology'],
        'ECE': ['ECE', 'Electronics and Communication Engineering', 'Electronics & Communication'],
        'EE': ['EE', 'Electrical Engineering', 'Electrical'],
        'ME': ['ME', 'Mechanical Engineering', 'Mechanical'],
        'CE': ['CE', 'Civil Engineering'],
        'Civil': ['Civil', 'Civil Engineering', 'CE']
    };

    // Creates an array of branch options by spreading the keys of aktuSyllabus object and adding 'All' at the start
    const branches = ['All', ...Object.keys(aktuSyllabus)];



    // Helper function to check if branch matches
    const branchMatches = (documentBranch, filterBranch) => {
        if (filterBranch === 'All') return true;
        const possibleMatches = branchMapping[filterBranch] || [filterBranch];
        return possibleMatches.some(match =>
            documentBranch.toLowerCase().includes(match.toLowerCase()) ||
            match.toLowerCase().includes(documentBranch.toLowerCase())
        );
    };

    // Use real documents from backend
    const allNotes = documents.map(doc => {
        const downloadUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/files/download/${doc.nodeId}`;
        const viewUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/files/view/${doc.nodeId}`;

        console.log(`Document: ${doc.title}, NodeId: ${doc.nodeId}`);
        console.log(`Download URL: ${downloadUrl}`);
        console.log(`View URL: ${viewUrl}`);

        return {
            id: doc._id,
            title: doc.title,
            branch: doc.branch,
            academicSession: doc.academicYear || 'All',
            subject: doc.title,
            downloadUrl,
            viewUrl,
            university: doc.university,
            course: doc.course,
            uploadedBy: doc.uploadedBy,
            views: doc.views || 0,
            downloads: doc.downloads || 0,
            description: doc.description,
            uploadedAt: doc.uploadedAt,
            category: doc.category,
            academicYear: doc.academicYear,
            size: doc.size,
            nodeId: doc.nodeId
        };
    });

    const filteredNotes = allNotes.filter(note =>
        branchMatches(note.branch, branchFilter) &&
        (academicSessionFilter === 'All' || note.academicSession === academicSessionFilter) &&
        (subjectFilter === 'All' || note.subject.toLowerCase().includes(subjectFilter.toLowerCase())) &&
        (searchTerm === '' || note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.subject.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const [currentPage, setCurrentPage] = useState(1);
    const notesPerPage = 9;
    const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
    const startIndex = (currentPage - 1) * notesPerPage;
    const endIndex = startIndex + notesPerPage;
    const paginatedNotes = filteredNotes.slice(startIndex, endIndex);

    const handleFilterChange = () => {
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='flex flex-col align-middle justify-start p-10 bg-zinc-950 min-h-screen w-full'>
            <div>
                <SearchAndFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    branchFilter={branchFilter}
                    setBranchFilter={setBranchFilter}
                    academicSessionFilter={academicSessionFilter}
                    setAcademicSessionFilter={setAcademicSessionFilter}
                    subjectFilter={subjectFilter}
                    setSubjectFilter={setSubjectFilter}
                    onFilterChange={handleFilterChange}
                    searchPlaceholder="Search Notes"
                />
            </div>
            {loading ? (
                <div className="text-center text-gray-400 py-10">Loading documents...</div>
            ) : (
                <div className='flex align-middle justify-center items-center w-full'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center align-middle justify-center px-2 py-10 md:px-10 w-full'>
                        {
                            paginatedNotes.map((note) => (
                                <DocumentCard className='bg-zinc-800' key={note.id} file={note} />
                            ))
                        }
                    </div>
                </div>
            )}

            {/* Pagination */}
            {filteredNotes.length > notesPerPage && <Pagination
                pages={totalPages}
                page={currentPage}
                onPageChange={handlePageChange}
            />}


            {/* Results info */}
            <div className="text-center text-gray-400 text-sm mt-4">
                Showing {startIndex}-{Math.min(startIndex + notesPerPage, filteredNotes.length)} of {filteredNotes.length} notes
            </div>
        </div>
    );
}

export default Notes;
