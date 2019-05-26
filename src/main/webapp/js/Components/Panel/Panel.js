import React from 'react'
import './Panel.css'

export default class Panel extends React.Component {

    constructor(props) {
        super(props);

        props.base[16] = Panel.processInput(props.base[16], 4);
        props.base[8] = Panel.processInput(props.base[8], 3);
        props.base[2] = Panel.processInput(props.base[2], 4);

        this.state = {
            input: Panel.processInput(props.input, 3),
            expr: props.expr,
            base: props.base,
            mode: props.mode
        }
    }

    static processInput(inp, len) {

        if(!inp) return;
        if(inp.indexOf('e') !== -1 || !isFinite(parseInt(inp, 16))) return inp;

        let s = '';
        let dotstr = '';
        let dot = inp.indexOf('.');
        if (dot !== -1) {
            dotstr = inp.slice(dot, inp.length);
            inp = inp.slice(0, dot);
        }

        for (let i = inp.length - 1; i >= 0; i--) {
            s = inp[i] + s;
            if ((inp.length - i) % len === 0) s = ' ' + s;
        }
        s = s.trim();
        if (s[0] === '-' && s[1] === ' ') s = s[0] + s.slice(2);

        return s + dotstr;
    }

    componentWillReceiveProps(nextProps) {
        let pr = {...nextProps};
        debugger;
        if(this.state.input !== pr.input)
            pr.input = Panel.processInput(pr.input, 3);

        if(this.state.base !== pr.base) {
            if(this.state.base[16] !== pr.base[16])
                pr.base[16] = Panel.processInput(pr.base[16], 4);
            if(this.state.base[8] !== pr.base[8])
                pr.base[8] = Panel.processInput(pr.base[8], 3);
            if(this.state.base[2] !== pr.base[2])
                pr.base[2] = Panel.processInput(pr.base[2], 4);
        }
        this.setState(pr);
    }

    render() {
        let programmerDiv = '';
        if(this.state.mode === 'Programmer')
            programmerDiv = (
                <div>
                    <p className='base'><span>HEX</span> {this.state.base[16]}</p>
                    <p className='base'><span>DEC</span> {this.state.input}</p>
                    <p className='base'><span>OCT</span> {this.state.base[8]}</p>
                    <p className='base'><span>BIN</span> {this.state.base[2]}</p>
                </div>
            );

        return (
            <div className='panel'>
                <p id='expr'>{this.state.expr}</p>
                <p id='input'>{this.state.input}</p>
                {programmerDiv}
            </div>
        )
    }
}
