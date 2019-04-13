import React from 'react'
import './A_Panel.css'

export default function A_Panel(props) {

    let s = '';
    L: {
        let inp = props.input;
        if(inp.indexOf('e') !== -1 || !isFinite(parseFloat(inp))) break L;
        let dot = inp.indexOf('.');

        if(dot !== -1) inp = inp.slice(0, dot);

        for (let i = inp.length - 1; i >= 0; i--) {
            s = inp[i] + s;
            if ((inp.length - i) % 3 === 0) s = ' ' + s;
        }
        s = s.trim();
        if(dot !== -1) s += props.input.slice(dot);
    }
    return (
        <div className='panel'>
            <p id='expr'>{props.expr}</p>
            <p id='input'>{s || props.input}</p>
        </div>
    )
}
