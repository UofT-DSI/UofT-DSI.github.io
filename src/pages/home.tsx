import React, { useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
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

    const handleArrowClick = () => {
        window.scrollBy({
            top: 700,
            left: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.intro_page}>
                <video className={styles.video_background} autoPlay loop muted preload="auto">
                    <source src="/background.mp4" type="video/mp4" />
                </video>
                <div className={styles.squircle}>
                    <img src="/logo.png" alt="Logo" className={styles.logo} />
                    <h1>Say Hello to our Future Proofed Talent</h1>
                    <h4>Machine Learning Software Foundations</h4>
                    <h4>and Data Science Certificates</h4>
                </div>
                <img src="arrow_down.png" alt="Downward Arrow" className={styles.bounce_arrow} onClick={handleArrowClick}></img>
            </div>
            <div className={styles.student_grid}>
                {students.map((student: Student) => (
                    <StudentCard
                        key={student.id}
                        student={student}
                        onSelect={() => setSelectedStudent(student)}
                    />
                ))}
                {selectedStudent && (
                    <StudentDetailsModal
                        student={selectedStudent}
                        onClose={() => setSelectedStudent(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;