import React from 'react'
import ArrayBar from './ArrayBar'

import './App.css';

function ArrayContainer(props) {
    const {array, colors} = props
    return (
        <div className="array-container">
            {
                array.map((value, index) => {
                return <ArrayBar color={colors[index]} w={70/array.length} h={value} m={15/array.length} key={index} />
                })
            }
        </div>
        
    )
}
// w={(0.92 * containerWidth)/array.length}
export default ArrayContainer