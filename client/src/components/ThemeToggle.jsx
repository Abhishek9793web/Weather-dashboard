import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ isDarkMode, onToggle }) => {
    return (
        <button
            className="btn btn-outline-secondary theme-toggle"
            onClick={onToggle}
            aria-label="Toggle theme"
        >
            {isDarkMode ? (
                <i className="bi bi-sun-fill"></i>
            ) : (
                <i className="bi bi-moon-fill"></i>
            )}
        </button>
    );
};

export default ThemeToggle;
