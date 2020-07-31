import React from 'react'

import './App.css';


function ArrayBar(props) {
    const {w, h, m, color} = props
    return (
        <div
        className = "array-bar"
        style={{
            width: `${w}%`,
            height: h,
            backgroundColor: color,
            margin: `0 ${m}%`
        }}
        >
        </div>
        
    )
}

export default ArrayBar