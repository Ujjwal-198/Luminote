import React from 'react';
import { useState } from 'react';
import { aktuSyllabus } from '../../Constants/AktuSyllabus.js';
import SearchAndFilter from '../../Components/SearchAndFilter.jsx';
import Pagination from '../../Components/Pagination.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getDocuments } from '../../features/fileSlice';
import { DocumentCard, NothingFound } from '../../Components/index.js';

const Tutorial = () => {
    const dispatch = useDispatch();
    const { documents, loading } = useSelector(state => state.files);

    const [branchFilter, setBranchFilter] = useState('All');
    const [academicSessionFilter, setAcademicSessionFilter] = useState('All');
    const [subjectFilter, setSubjectFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    React.useEffect(() => {
        dispatch(getDocuments({ category: 'Tutorial work' }));
    }, [dispatch]);

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

    const branches = ['All', ...Object.keys(aktuSyllabus)];

    const branchMatches = (documentBranch, filterBranch) => {
        if (filterBranch === 'All') return true;
        const possibleMatches = branchMapping[filterBranch] || [filterBranch];
        return possibleMatches.some(match =>
            documentBranch.toLowerCase().includes(match.toLowerCase()) ||
            match.toLowerCase().includes(documentBranch.toLowerCase())
        );
    };

    const availableSubjects = ['All', ...new Set(
        documents
            .map(doc => doc.subject || doc.title)
            .filter(subject => subject && subject.trim() !== '')
    )];

    const allTutorial = documents.map(doc => ({
        id: doc._id,
        title: doc.title,
        branch: doc.branch,
        academicSession: doc.academicYear || 'All',
        subject: doc.subject || doc.title,
        downloadUrl: `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/files/download/${doc.nodeId}`,
        viewUrl: `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/files/view/${doc.nodeId}`,
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
        nodeId: doc.nodeId,
        name: doc.name
    }));

    const filteredTutorial = allTutorial.filter(tutorial =>
        branchMatches(tutorial.branch, branchFilter) &&
        (academicSessionFilter === 'All' || tutorial.academicSession === academicSessionFilter) &&
        (subjectFilter === 'All' || tutorial.subject === subjectFilter) &&
        (searchTerm === '' ||
            tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tutorial.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tutorial.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const [currentPage, setCurrentPage] = useState(1);
    const tutorialPerPage = parseInt(import.meta.env.VITE_DOCUMENTS_PER_PAGE) || 9;
    const totalPages = Math.ceil(filteredTutorial.length / tutorialPerPage);
    const startIndex = (currentPage - 1) * tutorialPerPage;
    const endIndex = startIndex + tutorialPerPage;
    const paginatedTutorial = filteredTutorial.slice(startIndex, endIndex);

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
                    searchPlaceholder="Search Tutorial Work"
                    availableSubjects={availableSubjects}
                />
            </div>
            {loading ? (
                <div className="text-center text-gray-400 py-10">Loading documents...</div>
            ) : filteredTutorial.length === 0 ? (
                <NothingFound
                    category="tutorial work"
                    hasFilters={branchFilter !== 'All' || academicSessionFilter !== 'All' || subjectFilter !== 'All' || searchTerm !== ''}
                />
            ) : (
                <div className='flex align-middle justify-center items-center w-full'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center align-middle justify-center px-2 py-10 md:px-10 w-full'>
                        {
                            paginatedTutorial.map((tutorial) => (
                                <DocumentCard className='bg-zinc-800' key={tutorial.id} file={tutorial} />
                            ))
                        }
                    </div>
                </div>
            )}

            {filteredTutorial.length > tutorialPerPage && <Pagination
                pages={totalPages}
                page={currentPage}
                onPageChange={handlePageChange}
            />}

            {filteredTutorial.length > 0 && (
                <div className="text-center text-gray-400 text-sm mt-4">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredTutorial.length)} of {filteredTutorial.length} tutorial work
                </div>
            )}
        </div>
    );
}

export default Tutorial;