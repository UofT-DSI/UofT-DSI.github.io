// src/pages/Home.tsx
import React, { useState } from 'react';
import StudentCard from '../components/student_card/student_card';
import StudentDetailsModal from '../components/student_details_modal/student_details_modal';
import students from '../data/students.json';
import styles from './home_styles.module.css';
import BackgroundAnimation from '../components/background_animation/background_animation';

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

    const handleSelectStudent = (student: Student) => {
        setSelectedStudent(student);  // Set the selected student to show in the modal
    };

    const handleCloseModal = () => {
        setSelectedStudent(null);  // Clear the selected student when modal is closed
    };

    return (
        <div className={styles.container}>
            <div className={styles.intro_page}>
                <BackgroundAnimation />
                <div className={styles.squircle}>
                    <h1>Welcome to the <strong>Future Proof</strong> Year Book</h1>
                    <h2>Data Sciences Institute</h2>
                </div>
            </div>
            <div className={styles.student_grid}>
                {students.map((student: Student) => (
                    <StudentCard
                        key={student.id}
                        student={student}
                        onSelect={() => handleSelectStudent(student)}
                    />
            ))}
            {selectedStudent && (
                <StudentDetailsModal
                student={selectedStudent}
                onClose={handleCloseModal}
            />
            )}
            </div>
        </div>
    );
};

export default Home;
