import React from 'react'
import './App.css'
import Button from "../Button/Button";
import Panel from "../Panel/Panel";
import MenuButton from "../MenuButton/MenuButton";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expr: '',
            input: '0',
            cont_input: false,
            first: 0,
            second: 0,
            op: undefined,
            base: {2: 0, 8: 0, 10: 0, 16: 0},
            mode: 'Standard',
            error: false,
            max_digits: 15
        };
    }

    componentDidUpdate(prevProps, prevState) {
        window.textFit(document.querySelector('#input'));

        if(this.state.error || ((prevState.input === this.state.input || this.state.mode !== 'Programmer')
            && !(prevState.mode !== 'Programmer' && this.state.mode === 'Programmer'))) return;

        let app = this;

        let callbackfn = function() {
            if(this.readyState !== 4) return;
            let base = JSON.parse(this.responseText);
            console.log(base);
            app.setState({
                base: base
            });
        };

        let url = `./service?args=${this.state.input}&args=2&args=8&args=16&op=convert&mode=PROGRAMMER`;
        let req = new XMLHttpRequest();
        req.open('GET', url);
        req.onreadystatechange = callbackfn.bind(req);
        req.send();
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
        if(inp === '-') inp = '0';
        this.setState({
            input: inp
        });
    }

    c() {
        return new Promise((resolve, reject) => {
            this.setState({
                expr: '',
                input: '0',
                cont_input: false,
                first: 0,
                second: 0,
                op: undefined,
                base: {2: 0, 8: 0, 10: 0, 16: 0},
                error: false
            }, () => resolve());
        })
    }

    ce() {
        this.setState({
            input: '0',
            first: 0
        });
    }

    dot() {
        if(this.state.mode === 'Programmer') return;
        if(!this.state.cont_input) {
            this.setState({
                input: '0.',
                cont_input: true
            });
            return;
        }
        let inp = this.state.input;
        if(inp.indexOf('.') !== -1) return;
        inp += '.';
        this.setState({
            input: inp,
            cont_input: true
        });
    }

    onDigitClick(digit) {
        debugger;
        let inp = this.state.input;
        if(this.state.error) {
            this.c();
            return;
        }
        if(this.state.cont_input && inp.length >= this.state.max_digits) return;
        inp = (inp === '0' || !this.state.cont_input) ? digit : inp + digit;
        this.setState({
            input: inp,
            cont_input: true
        });
    }

    onOperatorClick(operation) {
        if(!this.state.op) {
            this.setState({
                expr: this.state.input + ' ' + operation,
                cont_input: false,
                first: this.state.input,
                op: operation
            });
        } else {
            if(!this.state.cont_input || this.state.expr.length === 0) {
                let expr = this.state.expr;
                if(expr.length === 0) expr = this.state.input + ' ' + operation;
                else expr = expr.slice(0, expr.length-1) + operation;
                this.setState({
                    expr: expr,
                    op: operation,
                    first: this.state.input
                });
                return;
            }
            let app = this;
            let prevOperation = this.state.op;
            this.setState({
                second: this.state.input,
                cont_input: false,
                expr: this.state.expr + ' ' + this.state.input + ' ' + operation,
                op: operation
            }, () => app.eval(prevOperation));
        }
    }

    eval(operation) {
        let operations = {
            '+' : 'sum',
            '-' : 'sub',
            'x' : 'prod',
            '/' : 'div'
        };
        let url = `./service?args=${this.state.first}&args=${this.state.second}&op=${operations[operation]}&mode=${this.state.mode.toUpperCase()}`;

        let req = new XMLHttpRequest();
        req.open('GET', url);
        let app = this;
        req.onreadystatechange = () => {
            if(req.status === 400) {
                app.setState({
                    input: "Invalid input",
                    cont_input: false,
                    error: true
                });
                return;
            }

            if(req.readyState !== 4) return;

            let res = req.responseText;
            app.setState({
                input: res,
                cont_input: false,
                first : res
            });
        };
        req.send();
    }

    equals() {
        if(!this.state.op) return;
        let app = this;
        this.setState({
            first: (this.state.cont_input && this.state.expr === '') ? this.state.input : this.state.first,
            second: this.state.expr === '' ? this.state.second : this.state.input,
            expr: '',
            cont_input: false
        }, () => app.eval(app.state.op));
    }

    render() {
        return (
            <div className={'app'}>
                <div id='menu'>
                    <MenuButton mode='Standard' app={this}/>
                    <MenuButton mode='Programmer' app={this}/>
                </div>
                <div id='calculator'>
                    <Panel expr={this.state.expr} input={this.state.input} base={this.state.base} mode={this.state.mode}/>
                    <table>
                        <tbody>
                        <tr>
                            <td><Button pkey={'Delete'} text={'CE'} className={'control-button'} onClick={this.ce.bind(this)}/></td>
                            <td><Button pkey={'c'} text={'C'} className={'control-button'} onClick={this.c.bind(this)}/></td>
                            <td><Button pkey={'Backspace'} text={'<-'} className={'control-button'} onClick={this.backspace.bind(this)}/></td>
                            <td><Button text={'/'} className={'operation-button'} onClick={() => this.onOperatorClick('/')}/></td>
                        </tr>
                        <tr>
                            <td><Button text={'7'} className={'digit-button'} onClick={() => this.onDigitClick('7')}/></td>
                            <td><Button text={'8'} className={'digit-button'} onClick={() => this.onDigitClick('8')}/></td>
                            <td><Button text={'9'} className={'digit-button'} onClick={() => this.onDigitClick('9')}/></td>
                            <td><Button pkey={'*'} text={'x'} className={'operation-button'} onClick={() => this.onOperatorClick('x')}/></td>
                        </tr>
                        <tr>
                            <td><Button text={'4'} className={'digit-button'} onClick={() => this.onDigitClick('4')}/></td>
                            <td><Button text={'5'} className={'digit-button'} onClick={() => this.onDigitClick('5')}/></td>
                            <td><Button text={'6'} className={'digit-button'} onClick={() => this.onDigitClick('6')}/></td>
                            <td><Button text={'-'} className={'operation-button'} onClick={() => this.onOperatorClick('-')}/></td>
                        </tr>
                        <tr>
                            <td><Button text={'1'} className={'digit-button'} onClick={() => this.onDigitClick('1')}/></td>
                            <td><Button text={'2'} className={'digit-button'} onClick={() => this.onDigitClick('2')}/></td>
                            <td><Button text={'3'} className={'digit-button'} onClick={() => this.onDigitClick('3')}/></td>
                            <td><Button text={'+'} className={'operation-button'} onClick={() => this.onOperatorClick('+')}/></td>
                        </tr>
                        <tr>
                            <td><Button pkey={'n'} text={'+/-'} className={'control-button'} onClick={this.negate.bind(this)}/></td>
                            <td><Button text={'0'} className={'digit-button'} onClick={() => this.onDigitClick('0')}/></td>
                            <td><Button pkey={['.', ',']} text={'.'} disabled={this.state.mode === 'Programmer'} className={'control-button'} onClick={this.dot.bind(this)}/></td>
                            <td><Button pkey={['=', 'Enter']} text={'='} className={'operation-button'} onClick={this.equals.bind(this)}/></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
