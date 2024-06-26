import React from 'react';
import styles from './styles.module.css';

interface ParticipantCardProps {
    participant: {
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

const ParticipantCard: React.FC<ParticipantCardProps> = ({ participant, onSelect }) => {
    // Set a default photo if none is provided
    const defaultPhotoUrl = "https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg"; // Replace with your actual default photo path
    const photoUrl = participant.photo || defaultPhotoUrl;

    // Function to convert string to Title Case
    const toTitleCase = (str: string) => {
        return str.replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    };

    // Ensure the participant's name is always in Title Case
    const titleCaseName = toTitleCase(participant.name);

    const certificationColors: { [key: string]: string } = {
        'Data Science Certificate': 'rgb(171, 19, 104)',
        'Machine Learning Software Foundations Certificate': '#479e8a',
    };

    const borderColor = certificationColors[participant.certification] || 'yellow'; // Default color

    return (
        <div className={styles.participant_card} onClick={onSelect}>
            <img
                src={photoUrl}
                alt={titleCaseName}
                className={styles.profile_image}
                style={{ borderColor: borderColor }}
            />
            <h2>{titleCaseName}</h2>
            <p>{participant.certification}</p>
        </div>
    );
};

export default ParticipantCard;