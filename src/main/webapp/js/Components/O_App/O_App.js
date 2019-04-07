import React from 'react'
import './O_App.css'
import A_Button from "../A_Button/A_Button";
import A_Panel from "../A_Panel/A_Panel";

export default class O_App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expr: '',
            input: '0',
            cont_input: false,
            first: 0,
            second: 0
        };
    }

    negate() {
        let inp = this.state.input;
        if(inp[0] === '-') inp = inp.slice(1, inp.length);
        else if(inp !== '0') inp = '-' + inp;
        this.setState({
            input: inp
        });
    }

    backspace() {
        if(!this.state.cont_input || !isFinite(parseFloat(this.state.input))) {
            this.setState({
                input: '0',
                cont_input: true
            });
            return;
        }
        let inp = this.state.input;
        if(inp.length === 1) inp = '0';
        else inp = inp.substr(0, inp.length-1);
        this.setState({
            input: inp
        });
    }

    c() {
        this.setState({
            expr: '',
            input: '0',
            cont_input: false,
            first: 0,
            second: 0
        });
    }

    ce() {
        this.setState({
            input: '0',
            second: '0'
        });
    }

    dot() {
        if(!this.state.cont_input) {
            this.setState({
                input: '0.',
                cont_input: true
            });
            return;
        }
        let inp = this.state.input;
        if(inp[inp.length-1] === '.') return;
        inp += '.';
        this.setState({
            input: inp,
            cont_input: true
        });
    }

    onDigitClick(digit) {
        let inp = this.state.input;
        inp = (inp === '0' || !this.state.cont_input) ? digit : inp + digit;
        this.setState({
            input: inp,
            cont_input: true
        });
    }

    onOperatorClick(operation) {
        debugger;
        if(this.state.expr === '') {
            this.setState({
                expr: this.state.input + ' ' + operation,
                cont_input: false,
                first: this.state.input
            });
        } else {
            let app = this;
            let prevOperation = this.state.expr[this.state.expr.length-1];
            this.setState({
                second: this.state.input,
                cont_input: false,
                expr: this.state.expr + ' ' + this.state.input + ' ' + operation
            }, () => app.eval(prevOperation));
        }
    }

    eval(operation) {
        debugger;
        let operations = {
            '+' : 'sum',
            '-' : 'sub',
            'x' : 'prod',
            '/' : 'div'
        };
        let url = `./service?first=${this.state.first}&second=${this.state.second}&op=${operations[operation]}`;
        let req = new XMLHttpRequest();
        req.open('GET', url);
        let app = this;
        req.onreadystatechange = () => {
            debugger;
            if(req.readyState !== 4) return;
            debugger;

            let res = String(parseFloat(req.responseText));
            app.setState({
                input: res,
                cont_input: false,
                first : res
            });
        };
        req.send();
    }

    equals() {
        if(this.state.expr.length === 0) return;
        let op = this.state.expr[this.state.expr.length-1];
        let app = this;
        this.setState({
            second: this.state.input,
            expr: '',
            cont_input: false
        }, () => app.eval(op));
    }

    render() {
        return (
            <div className={'app'}>
                <A_Panel expr={this.state.expr} input={this.state.input}/>
                <table>
                    <tbody>
                        <tr>
                            <td><A_Button text={'CE'} className={'control-button'} onClick={this.ce.bind(this)}/></td>
                            <td><A_Button text={'C'} className={'control-button'} onClick={this.c.bind(this)}/></td>
                            <td><A_Button text={'<-'} className={'control-button'} onClick={this.backspace.bind(this)}/></td>
                            <td><A_Button text={'/'} className={'operation-button'} onClick={() => this.onOperatorClick('/')}/></td>
                        </tr>
                        <tr>
                            <td><A_Button text={'7'} className={'digit-button'} onClick={() => this.onDigitClick('7')}/></td>
                            <td><A_Button text={'8'} className={'digit-button'} onClick={() => this.onDigitClick('8')}/></td>
                            <td><A_Button text={'9'} className={'digit-button'} onClick={() => this.onDigitClick('9')}/></td>
                            <td><A_Button text={'x'} className={'operation-button'} onClick={() => this.onOperatorClick('x')}/></td>
                        </tr>
                        <tr>
                            <td><A_Button text={'4'} className={'digit-button'} onClick={() => this.onDigitClick('4')}/></td>
                            <td><A_Button text={'5'} className={'digit-button'} onClick={() => this.onDigitClick('5')}/></td>
                            <td><A_Button text={'6'} className={'digit-button'} onClick={() => this.onDigitClick('6')}/></td>
                            <td><A_Button text={'-'} className={'operation-button'} onClick={() => this.onOperatorClick('-')}/></td>
                        </tr>
                        <tr>
                            <td><A_Button text={'1'} className={'digit-button'} onClick={() => this.onDigitClick('1')}/></td>
                            <td><A_Button text={'2'} className={'digit-button'} onClick={() => this.onDigitClick('2')}/></td>
                            <td><A_Button text={'3'} className={'digit-button'} onClick={() => this.onDigitClick('3')}/></td>
                            <td><A_Button text={'+'} className={'operation-button'} onClick={() => this.onOperatorClick('+')}/></td>
                        </tr>
                        <tr>
                            <td><A_Button text={'+/-'} className={'control-button'} onClick={this.negate.bind(this)}/></td>
                            <td><A_Button text={'0'} className={'digit-button'} onClick={() => this.onDigitClick('0')}/></td>
                            <td><A_Button text={'.'} className={'control-button'} onClick={this.dot.bind(this)}/></td>
                            <td><A_Button text={'='} className={'operation-button'} onClick={this.equals.bind(this)}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
