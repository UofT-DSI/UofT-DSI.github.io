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
    // Set a default photo if none is provided
    const defaultPhotoUrl = "https://thenerdy.com/wp-content/uploads/2018/11/70821-LEGO-LEGO-Movie-2-Emmet-and-Bennys-Build-and-Fix-Workshop-01.jpg"; // Replace with your actual default photo path
    const photoUrl = student.photo || defaultPhotoUrl;

    return (
        <div className={styles.student_card} onClick={onSelect}>
            <img src={photoUrl} alt={student.name} className={styles.profile_image} />
            <h2>{student.name}</h2>
            <p>Certificate: {student.certification}</p>
        </div>
    );
};

export default StudentCard;