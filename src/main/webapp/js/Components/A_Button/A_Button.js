import React from 'react'
import './A_Button.css'

export default function A_Button(props) {
    return (
        <button className={'button ' + props.className} onClick={props.onClick}>{props.text}</button>
    )
}
