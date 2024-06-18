import React, { useState } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import IntroPage from '../components/intro_page/intro_page';
import ParticipantCard from '../components/participant_card/participant_card';
import ParticipantDetailsModal from '../components/participant_details_modal/participant_details_modal';
import participants from '../data/participants.json';
import styles from './home_styles.module.css';

interface Participant {
    id: string;
    name: string;
    certification: string;
    photo: string;
    summary: string;
    linkedin: string;
    github: string;
}

const Home: React.FC = () => {
    const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);



    return (
        <div className={styles.container}>
            <IntroPage></IntroPage>
            
            <div className={styles.participant_grid}>
                <h1>June 19th, 2024 - Virtual Networking Event Attendees</h1>
                {participants.map((participant: Participant) => (
                    <ParticipantCard
                        key={participant.id}
                        participant={participant}
                        onSelect={() => setSelectedParticipant(participant)}
                    />
                ))}
                {selectedParticipant && (
                    <ParticipantDetailsModal
                        participant={selectedParticipant}
                        onClose={() => setSelectedParticipant(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;