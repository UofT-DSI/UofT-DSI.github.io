import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

// Define the Student interface
interface Student {
    id: string;
    name: string;
    certification: string;
    photo: string;
    summary: string;
    linkedin: string;
    github: string;
}

// Define the props for StudentDetailsModal
interface StudentDetailsModalProps {
    student: Student;
    onClose: () => void;
}

const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({ student, onClose }) => {
    const [isActive, setIsActive] = useState(false);

    // Effect to handle the modal activation delay
    useEffect(() => {
        const timer = setTimeout(() => setIsActive(true), 10);
        return () => clearTimeout(timer);
    }, []);

    // Function to handle closing the modal with a delay for animations
    const handleClose = () => {
        setIsActive(false);
        setTimeout(onClose, 300);
    };

    // Prevent click events from propagating to the overlay
    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // Default photo URL if none is provided
    const defaultPhotoUrl = "https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg";
    const photoUrl = student.photo || defaultPhotoUrl;

    // Function to convert string to Title Case
    const toTitleCase = (str: string) => {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    };

    const titleCaseName = toTitleCase(student.name);

    // Define the styles and colors for different certification types
    const certificationTypes = {
        'Data Science Certificate': {
            textClass: styles.dataScience,
            buttonClass: styles.buttonDataScience,
            closeButtonClass: styles.closeButtonDataScience,
            borderColor: 'rgb(171, 19, 104)'
        },
        'Machine Learning Software Foundations Certificate': {
            textClass: styles.machineLearning,
            buttonClass: styles.buttonMachineLearning,
            closeButtonClass: styles.closeButtonMachineLearning,
            borderColor: '#479e8a'
        }
    } as const;

    // Define the type for the keys of certificationTypes
    type CertificationType = keyof typeof certificationTypes;

    // Get the styles for the current certification or use default values
    const currentStyles = certificationTypes[student.certification as CertificationType] || {
        textClass: '',
        buttonClass: '',
        closeButtonClass: '',
        borderColor: 'yellow'
    };

    return (
        <div className={`${styles.modalOverlay} ${isActive ? styles.modalActive : ''}`} onClick={handleClose}>
            <div className={`${styles.modalContent} ${isActive ? styles.modalContentActive : ''}`} onClick={handleContentClick}>
                <button onClick={handleClose} className={`${styles.closeButton} ${currentStyles.closeButtonClass}`}>×</button>
                <div className={styles.profileContainer}>
                    <div className={styles.leftColumn}>
                        <img
                            src={photoUrl}
                            alt={titleCaseName}
                            className={styles.profileImage}
                            style={{ borderColor: currentStyles.borderColor }}
                        />
                        <p><span className={currentStyles.textClass}><strong>Certificate:</strong></span> {student.certification}</p>
                    </div>
                    <div className={styles.rightColumn}>
                        <h1 className={currentStyles.textClass}>{titleCaseName}</h1>
                        <p>{student.summary}</p>
                        {student.linkedin && (
                            <a href={student.linkedin} target="_blank" rel="noopener noreferrer" className={currentStyles.buttonClass}>
                                LinkedIn
                            </a>
                        )}
                        {student.github && (
                            <a href={student.github} target="_blank" rel="noopener noreferrer" className={currentStyles.buttonClass}>
                                Github
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetailsModal;