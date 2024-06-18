import React from 'react';
import styles from './styles.module.css';  // Make sure this path matches your CSS file location

const LandscapeMessage = () => (
  <div className={styles.landscapeMessage}>
    <video className={styles.video_background} autoPlay loop muted playsInline preload="auto">
      <source src="/videos/background.mp4" type="video/mp4" />
    </video>
    <div className={styles.squircle}>
      <h4>oops...</h4>
      <p>This website only works in portrait mode.</p>
    </div>
  </div>
);

export default LandscapeMessage;