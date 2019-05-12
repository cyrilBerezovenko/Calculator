import React from 'react'
import './MenuButton.css'

export default function MenuButton(props) {

    return (
        <button className={'menu-button' + (props.app.state.mode === props.mode ? ' menu-button-selected' : '')} onClick={
            () => {
                if(props.app.state.mode === props.mode) return;
                props.app.c();
                props.app.setState({mode: props.mode});
            }
        }>{props.mode}</button>
    );
}
