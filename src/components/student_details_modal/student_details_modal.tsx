import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface StudentDetailsModalProps {
    student: {
        id: string;
        name: string;
        certification: string;
        photo: string;
        summary: string;
        linkedin: string;
        github: string;
    };
    onClose: () => void;
}

const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({ student, onClose }) => {
    
    const [isActive, setIsActive] = useState(false);

    // Simulate the modal opening with a delay for transitions
    useEffect(() => {
        const timer = setTimeout(() => setIsActive(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsActive(false); // Trigger the close animations
        setTimeout(() => {
            onClose(); // Actually remove the modal from the DOM after animations
        }, 300); // Match your longest transition time
    };

    // Prevent click events from propagating to the overlay
    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className={`${styles.modalOverlay} ${isActive ? styles.modalActive : ''}`} onClick={handleClose}>
            <div className={`${styles.modalContent} ${isActive ? styles.modalContentActive : ''}`} onClick={handleContentClick}>
                <button onClick={handleClose} className={styles.closeButton}>×</button>
                <div className={styles.profileContainer}>
                    <div className={styles.leftColumn}>
                        <img src={student.photo} alt={student.name} className={styles.profileImage} />
                        <p><strong>Certificate:</strong> {student.certification}</p>
                    </div>
                    <div className={styles.rightColumn}>
                        <h1>{student.name}</h1>
                        <p>{student.summary}</p>
                        {student.linkedin && (
                            <a href={student.linkedin} target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                        )}
                        {student.github && (
                            <a href={student.github} target="_blank" rel="noopener noreferrer">
                                Github
                            </a>
                        )}
                    </div>
                </div>
                {/* Add more details or interactive elements as needed */}
            </div>
        </div>
    );
};

export default StudentDetailsModal;
