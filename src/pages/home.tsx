// src/pages/Home.tsx
import React, { useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import StudentCard from '../components/student_card/student_card';
import StudentDetailsModal from '../components/student_details_modal/student_details_modal';
import students from '../data/students.json';
import styles from './home_styles.module.css';

interface Student {
    id: string;
    name: string;
    certification: string;
    photo: string;
    summary: string;
    linkedin: string;
    github: string;
}

const Home: React.FC = () => {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const { width } = useWindowSize();
    const isMobile = width < 768;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        centerMode: true,
        focusOnSelect: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '20px',
    };

    return (
        <div>
            {isMobile ? (
                <div className={styles.sliderContainer}>
                
                    {students.map((student: Student) => (
                        <div key={student.id}>
                            <StudentCard
                                student={student}
                                onSelect={() => setSelectedStudent(student)}
                            />
                        </div>
                    ))}
                    
                </div>
            ) : (
                <div className={styles.student_grid}>
                    {students.map((student: Student) => (
                        <StudentCard
                            key={student.id}
                            student={student}
                            onSelect={() => setSelectedStudent(student)}
                        />
                    ))}
                </div>
            )}
            {selectedStudent && (
                <StudentDetailsModal
                    student={selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                />
            )}
        </div>
    );
};

export default Home;