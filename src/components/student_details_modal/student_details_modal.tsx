import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface StudentDetailsModalProps {
    student: {
        id: string;
        name: string;
        email: string;
        skills: string;
        image_url: string;
        description: string;
        links: { title: string; url: string; }[];
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

    return (
        <div className={`${styles.modalOverlay} ${isActive ? styles.modalActive : ''}`}>
            <div className={`${styles.modalContent} ${isActive ? styles.modalContentActive : ''}`}>
                <button onClick={handleClose} className={styles.closeButton}>×</button>
                <h2>{student.name}</h2>
                <div className={styles.profileContainer}>
                    <div className={styles.leftColumn}>
                        <img src={student.image_url} alt={student.name} className={styles.profileImage} />
                        <p>Email: <a href={`mailto:${student.email}`}>{student.email}</a></p>
                        <p>Certificate: {student.skills}</p>
                    </div>
                    <div className={styles.rightColumn}>
                        <p>{student.description}</p>
                        <div className={styles.links}>
                            {student.links.map((link, index) => (
                                <p key={index}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.title}
                                    </a>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Add more details or interactive elements as needed */}
            </div>
        </div>
    );
};

export default StudentDetailsModal;
