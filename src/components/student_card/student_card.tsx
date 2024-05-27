// src/components/student_card/student_card.tsx
import React from 'react';
import styles from './styles.module.css';

interface StudentCardProps {
    student: {
        id: string;
        name: string;
        email: string;
        skills: Array<string>;
        image_url: string; // Assuming this property holds the image URL
    };
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
    return (
        <div className={styles.student_card}>
            <img src={student.image_url} alt={student.name} className={styles.profile_image} />
            <h2>{student.name}</h2>
            <p>Email: {student.email}</p>
            <ul>
                {student.skills.map(skill => <li key={skill}>{skill}</li>)}
            </ul>
            <div className={styles.additional_info}>
                <p>About: More detailed information here...</p>
                <p>Links: Relevant links here...</p>
                <p>Github Contribution: Details here...</p>
            </div>
        </div>
    );
};

export default StudentCard;