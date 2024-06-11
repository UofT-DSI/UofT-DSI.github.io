import React, { useEffect } from 'react';
import styles from './styles.module.css';

const IntroPage: React.FC = () => {
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const squircle = document.querySelector(`.${styles.squircle}`) as HTMLElement;

        const handleMouseMove = (event: MouseEvent) => {
            if (!squircle) return;

            const { clientX, clientY } = event;
            const { left, top, width, height } = squircle.getBoundingClientRect();

            // Calculate the center of the squircle
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            // Calculate the mouse position relative to the center of the squircle
            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;

            // Calculate the rotation angles
            const rotateX = -(deltaY / height) * 10; // Adjust the multiplier for more or less tilt
            const rotateY = (deltaX / width) * 10; // Adjust the multiplier for more or less tilt

            // Apply the transformation
            squircle.style.transition = ''; // Reset transition
            squircle.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            // Clear the previous timeout and set a new one
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                // Smoothly transition back to the original state
                squircle.style.transition = 'transform 1s ease-out'; // Set the transition
                squircle.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }, 3000); // Adjust the timeout duration as needed
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timeoutId);
        };
    }, []);

    const handleArrowClick = () => {
        window.scrollBy({
            top: 700,
            left: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={styles.intro_page}>
            <video className={styles.video_background} autoPlay loop muted preload="auto">
                <source src="/background.mp4" type="video/mp4" />
            </video>
            <div className={styles.squircle}>
                <img src="/logo.png" alt="Logo" className={styles.logo} />
                <h1>Say Hello to our Future Proofed Talent</h1>
                <h4>Machine Learning Software Foundations</h4>
                <h4>and Data Science Certificates</h4>
            </div>
            <img src="arrow_down.png" alt="Downward Arrow" className={styles.bounce_arrow} onClick={handleArrowClick} />
        </div>
    );
};

export default IntroPage;