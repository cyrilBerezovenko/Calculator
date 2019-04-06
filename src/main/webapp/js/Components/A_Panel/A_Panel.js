import React from 'react'
import './A_Panel.css'

export default function A_Panel(props) {
    return (
        <div className='panel'>
            <p id='expr'>{props.expr}</p>
            <p id='input'>{props.input}</p>
        </div>
    )
}
