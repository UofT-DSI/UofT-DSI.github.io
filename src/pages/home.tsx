import React, { useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import IntroPage from '../components/intro_page/intro_page';
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



    return (
        <div className={styles.container}>
            <IntroPage></IntroPage>
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