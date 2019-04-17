import React from 'react'
import './A_Button.css'

export default class A_Button extends React.Component {

    constructor(props) {
        super(props);
        let btn = this;

        if (props.pkey !== null) {
            document.addEventListener('keydown', (event) => {
                if (document.wait ||
                    (!Array.isArray(props.pkey) && !(event.key === (props.pkey || props.text))) ||
                    (Array.isArray(props.pkey) && props.pkey.indexOf(event.key) === -1)) return;

                document.wait = true;
                setTimeout(() => document.wait = false, 20);
                props.onClick();

                if(btn.state.className.indexOf('active') !== -1) return;
                let cl = btn.state.className === 'operation-button' ? ' op-active' : ' active';
                btn.setState({
                    className: btn.state.className + cl
                }, () => {
                    setTimeout(() => btn.setState({
                        className: btn.state.className.replace(cl, '')
                    }), 50);
                });
            });
        }
        this.state = {
            text: props.text,
            onClick: props.onClick,
            className: props.className
        }
    }

    render() {
        return (
            <button className={`button ${this.state.className}`} onClick={this.state.onClick}>{this.state.text}</button>
        );
    }
}
