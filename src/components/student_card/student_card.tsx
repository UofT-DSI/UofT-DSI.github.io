import React from 'react';
import styles from './styles.module.css';

interface StudentCardProps {
    student: {
        id: string;
        name: string;
        certification: string;
        photo: string;
        summary: string;
        linkedin: string;
        github: string;
    };
    onSelect: () => void;
}


const StudentCard: React.FC<StudentCardProps> = ({ student, onSelect }) => {
    return (
        <div className={styles.student_card} onClick={onSelect}>
            <img src={student.photo} alt={student.name} className={styles.profile_image} />
            <h2>{student.name}</h2>
            <p>Certificate: {student.certification}</p>
        </div>
    );
};

export default StudentCard;