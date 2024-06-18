import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import IntroPage from '../components/intro_page/intro_page';
import ParticipantCard from '../components/participant_card/participant_card';
import ParticipantDetailsModal from '../components/participant_details_modal/participant_details_modal';
import participants from '../data/participants.json';
import LandscapeMessage from '../components/landscape_message/landscape_message';
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
    const [isLandscape, setIsLandscape] = useState(false);

    useEffect(() => {
        const handleOrientationChange = () => {
          const isMobile = window.innerWidth < 768;
          const isLandscape = window.innerWidth > window.innerHeight;
          setIsLandscape(isMobile && isLandscape);
        };
    
        handleOrientationChange(); // Initial check
        window.addEventListener('resize', handleOrientationChange);
    
        return () => {
          window.removeEventListener('resize', handleOrientationChange);
        };
      }, []);
    

    return (
        <div className={styles.container}>
            {isLandscape && <LandscapeMessage />}
            {! isLandscape && (
                <div>
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
            )}
        </div>
    );
};

export default Home;