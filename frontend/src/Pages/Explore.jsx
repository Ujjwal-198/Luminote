import React from 'react';
import { ExploreCard } from '../Components';
import { Link } from 'react-router-dom';

const Explore = () => {
    return (
        <div className="flex items-center justify-center bg-zinc-950 text-white w-full align-middle min-h-screen py-10 px-5">
            {/* Explore Page Cards container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Each card container */}
                {[
                    {
                        title: 'Notes',
                        description:
                            'Dive into a world of subject-specific notes, organized by topics and semesters. Access handwritten or typed versions rated by peers for quality.',
                        link: '/explore/notes',
                    },
                    {
                        title: 'Question Papers',
                        description:
                            'Master your exams with past papers, mock tests, and solved solutions. Filter by university or year to find the perfect study aid.',
                        link: '/explore/questionpaper',
                    },
                    {
                        title: 'Lab Manuals',
                        description:
                            'Get hands-on with experiment guides, safety tips, and diagrams. Explore course-specific manuals for a seamless lab experience.',
                        link: '/explore/labmanual',
                    },
                    {
                        title: 'Assignments',
                        description:
                            'Boost your grades with completed assignments, templates, and peer reviews. Stay on track with deadline-tagged resources.',
                        link: '/explore/assignment',
                    },
                    {
                        title: 'Study Guides',
                        description:
                            'Ace your revisions with summaries, cheat sheets, and flashcards. Unlock exam tips from top students to stay ahead.',
                        link: '/explore/studyguide',
                    },
                    {
                        title: 'E-Books and Textbooks',
                        description:
                            'Access free e-books, chapter-wise uploads, and annotated texts. Searchable content to find exactly what you need.',
                        link: '/explore/ebook',
                    },
                    {
                        title: 'Lectures',
                        description:
                            'Access recorded lectures, live session notes, and professor presentations. Stay updated with course content.',
                        link: '/explore/lecture',
                    },
                    {
                        title: 'Slides & PPTs',
                        description:
                            'Browse presentation slides, PowerPoint files, and visual learning materials from various courses.',
                        link: '/explore/slides',
                    },
                    {
                        title: 'Syllabus',
                        description:
                            'Find complete course syllabi, curriculum outlines, and academic requirements for all subjects.',
                        link: '/explore/syllabus',
                    },
                    {
                        title: 'Practice Materials',
                        description:
                            'Enhance your skills with practice problems, worksheets, and exercise sets for better understanding.',
                        link: '/explore/practice',
                    },
                    {
                        title: 'Practical Work',
                        description:
                            'Access practical session guides, experiment procedures, and hands-on learning materials.',
                        link: '/explore/practical',
                    },
                    {
                        title: 'Tutorial Work',
                        description:
                            'Get tutorial solutions, step-by-step guides, and interactive learning resources.',
                        link: '/explore/tutorial',
                    },
                    {
                        title: 'Essays & Reports',
                        description:
                            'Explore academic essays, research reports, and writing samples for reference and inspiration.',
                        link: '/explore/essays',
                    },
                    {
                        title: 'Misc. Materials',
                        description:
                            'Explore syllabi, project reports, slides, and revision timetables. A catch-all for unique study resources.',
                        link: '/explore/misc',
                    },
                ].map((card, i) => (
                    <div key={i} className="grow basis-[300px] max-w-[320px] flex justify-center">
                        <ExploreCard {...card} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Explore;
