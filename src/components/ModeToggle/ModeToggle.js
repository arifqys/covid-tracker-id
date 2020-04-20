import React from 'react';
import styles from './ModeToggle.module.css';

const ModeToggle = (props) => (
    <div className={styles.toggle}>
    <span role="img" aria-label="light">☀️</span>
    <input type="checkbox" id="toggle-switch" onClick={props.clicked} />
    <label htmlFor="toggle-switch"></label>
    <span role="img" aria-label="dark">🌙</span>
  </div>
)

export default ModeToggle;