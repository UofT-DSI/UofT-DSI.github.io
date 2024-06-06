import React, { useState } from 'react';
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

    const handleSelectStudent = (student: Student) => {
        setSelectedStudent(student);  // Set the selected student to show in the modal
    };

    const handleCloseModal = () => {
        setSelectedStudent(null);  // Clear the selected student when modal is closed
    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                {/* Placeholders for sorting and filtering options */}
                <p>Sorting</p>
                <button className={styles.sidebutton} onClick={() => console.log('Sort by Name')}>Sort by Name</button>
                <button className={styles.sidebutton} onClick={() => console.log('Sort by Certification')}>Sort by Certification</button>
                <p>Have Linkedin?</p>
                <button className={styles.sidebutton} onClick={() => console.log('Sort by Name')}>Yes</button>
                <button className={styles.sidebutton} onClick={() => console.log('Sort by Name')}>No</button>
                <p>Have GitHub?</p>
                <button className={styles.sidebutton} onClick={() => console.log('Sort by Name')}>Yes</button>
                <button className={styles.sidebutton} onClick={() => console.log('Sort by Name')}>No</button>
                
                {/* Add more sorting and filtering options as needed */}
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