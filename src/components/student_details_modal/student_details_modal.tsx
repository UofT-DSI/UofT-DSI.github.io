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

    useEffect(() => {
        const timer = setTimeout(() => setIsActive(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsActive(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const defaultPhotoUrl = "https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg";
    const photoUrl = student.photo || defaultPhotoUrl;

    const toTitleCase = (str: string) => {
        return str.replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    };

    const titleCaseName = toTitleCase(student.name);

    const certificationClasses: { [key: string]: string } = {
        'Data Science Certificate': styles.dataScience,
        'Machine Learning Software Foundations Certificate': styles.machineLearning,
    };

    const buttonClasses: { [key: string]: string } = {
        'Data Science Certificate': styles.buttonDataScience,
        'Machine Learning Software Foundations Certificate': styles.buttonMachineLearning,
    };
    const closeButtonClasses: { [key: string]: string } = {
        'Data Science Certificate': styles.closeButtonDataScience,
        'Machine Learning Software Foundations Certificate': styles.closeButtonMachineLearning,
    };

    const certificationClass = certificationClasses[student.certification] || '';
    const buttonClass = buttonClasses[student.certification] || '';
    const closeButtonClass = closeButtonClasses[student.certification] || '';
    
    const certificationColors: { [key: string]: string } = {
        'Data Science Certificate': 'rgb(171, 19, 104)',
        'Machine Learning Software Foundations Certificate': '#479e8a',
    };

    const borderColor = certificationColors[student.certification] || 'yellow'; // Default color


    return (
        <div className={`${styles.modalOverlay} ${isActive ? styles.modalActive : ''}`} onClick={handleClose}>
            <div className={`${styles.modalContent} ${isActive ? styles.modalContentActive : ''}`} onClick={handleContentClick}>
                <button onClick={handleClose} className={`${styles.closeButton} ${closeButtonClass}`}>×</button>
                <div className={styles.profileContainer}>
                    <div className={styles.leftColumn}>
                        <img
                            src={photoUrl}
                            alt={titleCaseName}
                            className={styles.profileImage}
                            style={{ borderColor: borderColor }}
                        />
                        <p><span className={certificationClass}><strong>Certificate:</strong></span> {student.certification}</p>
                    </div>
                    <div className={styles.rightColumn}>
                        <h1 className={certificationClass}>{titleCaseName}</h1>
                        <p>{student.summary}</p>
                        {student.linkedin && (
                            <a href={student.linkedin} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                                LinkedIn
                            </a>
                        )}
                        {student.github && (
                            <a href={student.github} target="_blank" rel="noopener noreferrer" className={buttonClass}>
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