// src/pages/Home.tsx
import React, { useState } from 'react';
import StudentCard from '../components/student_card/student_card';
import StudentDetailsModal from '../components/student_details_modal/student_details_modal';
import students from '../data/students.json';
import styles from './home_styles.module.css';

interface Student {
    id: string;
    name: string;
    email: string;
    skills: string;
    image_url: string;
    description: string;
    links: { title: string; url: string; }[];
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
    );
};

export default Home;
