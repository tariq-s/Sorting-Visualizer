import React from 'react'

import './App.css';

function ButtonSection(props) {
    const {sorts} = props

    return (
        <div className="button-section">
            <div className="d-flex justify-content-center">
                <button className="button" onClick={() => window.location.reload(false)}>Generate New Array</button><br/>
            </div>
            <div className="d-flex justify-content-center">
                <button className="button" onClick={sorts.merge}>Merge Sort</button>
                <button className="button" onClick={sorts.insertion}>Insertion Sort</button>
                <button className="button" onClick={sorts.cocktail}>Cocktail Sort</button>
                <button className="button" onClick={sorts.bubble}>Bubble Sort</button>
            </div>
        </div>
        
    )
}

export default ButtonSection