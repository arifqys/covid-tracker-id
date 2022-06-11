import React from 'react'
import styles from './ModeToggle.module.css'

const ModeToggle = ({ onClick, isDarkMode }) => (
    <div className={styles.toggle}>
    <span role="img" aria-label="light">☀️</span>
    <input type="checkbox" id="toggle-switch" onClick={onClick} checked={isDarkMode} />
    <label htmlFor="toggle-switch"></label>
    <span role="img" aria-label="dark">🌙</span>
  </div>
)

export default ModeToggle;