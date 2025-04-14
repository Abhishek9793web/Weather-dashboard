import React from 'react';
import './SearchBar.css';

function SearchBar({ value, setValue, onSearch, onKeyDown }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="Enter city name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
            />
            <button className="search-button" onClick={onSearch}>
                Search
            </button>
        </div>
    );
}

export default SearchBar;
