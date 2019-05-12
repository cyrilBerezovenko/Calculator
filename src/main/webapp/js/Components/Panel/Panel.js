import React from 'react'
import './Panel.css'

export default class Panel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            input: Panel.processInput(props.input),
            expr: props.expr,
            base: props.base,
            mode: props.mode
        }
    }

    static processInput(inp) {

        if(inp.indexOf('e') !== -1 || !isFinite(parseFloat(inp))) return inp;

        let s = '';
        let dot = inp.indexOf('.');
        if (dot !== -1) {
            inp = inp.slice(0, dot);
            s = inp.slice(dot);
        }

        for (let i = inp.length - 1; i >= 0; i--) {
            s = inp[i] + s;
            if ((inp.length - i) % 3 === 0) s = ' ' + s;
        }
        s = s.trim();
        if (s[0] === '-' && s[1] === ' ') s = s[0] + s.slice(2);

        return s;
    }

    componentWillReceiveProps(nextProps) {
        let pr = {...nextProps};
        if(this.state.input !== pr.input)
            pr.input = Panel.processInput(pr.input);
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
