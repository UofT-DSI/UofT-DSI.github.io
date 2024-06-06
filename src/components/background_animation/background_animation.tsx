import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { createNoise2D } from 'simplex-noise';
import styles from './styles.module.css';

const BackgroundAnimation: React.FC = () => {
  const animationRef = useRef<HTMLDivElement>(null);
  const noise2D = createNoise2D();

  useEffect(() => {
    const circles = animationRef.current?.querySelectorAll(`.${styles.circle}`);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const maxTrailsPerCircle = 50; // Max number of trail elements per circle

    if (circles) {
      circles.forEach((circle, index) => {
        gsap.set(circle, {
          x: width / 2,
          y: height / 2
        });

        // Create a unique trail container for each circle
        const trailsContainer = document.createElement('div');
        trailsContainer.classList.add(styles.trails_container);
        animationRef.current?.appendChild(trailsContainer);

        // Create and pool trail elements for each circle
        const trailElements: HTMLDivElement[] = [];
        for (let i = 0; i < maxTrailsPerCircle; i++) {
          const trail = document.createElement('div');
          trail.classList.add(styles.trail);
          trailsContainer.appendChild(trail);
          trailElements.push(trail);
        }

        let trailIndex = 0;
        let time = 0;
        const noiseOffsetX = index * 10; // Unique offset for each circle
        const noiseOffsetY = index * 10; // Unique offset for each circle

        const animateCircle = () => {
          let trailTime = 0; // Separate time for trail creation
          gsap.ticker.add(() => {
            // Increment time for circle movement more slowly
            time += 0.001;

            // Increment trail time for trail spacing
            trailTime += 0.002;

            // Calculate new positions using Perlin noise
            const x = width / 2 + noise2D(time + noiseOffsetX, 0) * width / 2;
            const y = height / 2 + noise2D(0, time + noiseOffsetY) * height / 2;
            gsap.set(circle, { x, y });

            // Create trail at intervals defined by trailTime increment
            if (trailTime >= 0.01) { // Adjust this value to control trail frequency
              const trail = trailElements[trailIndex];
              gsap.set(trail, {
                x,
                y,
                opacity: 1 // Reset opacity for reuse
              });
              trail.classList.remove(styles.fade);
              void trail.offsetWidth; // Trigger reflow for CSS animation restart
              trail.classList.add(styles.fade);

              trailIndex = (trailIndex + 1) % maxTrailsPerCircle; // Cycle through trail elements
              trailTime = 0; // Reset trailTime to start spacing again
            }
          });
        };

        animateCircle();
      });
    }
  }, []);

  return (
    <div ref={animationRef} className={styles.background_animation}>
      {[...Array(20)].map((_, i) => (
        <div key={i} className={styles.circle}></div>
      ))}
    </div>
  );
};

export default BackgroundAnimation;