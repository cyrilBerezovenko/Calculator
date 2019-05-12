import React from 'react'
import './Button.css'

export default class Button extends React.Component {

    constructor(props) {
        super(props);
        let btn = this;

        if (props.pkey !== null) {
            document.addEventListener('keydown', (event) => {
                if (window.wait ||
                    (!Array.isArray(props.pkey) && !(event.key === (props.pkey || props.text))) ||
                    (Array.isArray(props.pkey) && props.pkey.indexOf(event.key) === -1)) return;

                window.wait = true;
                window.clickTimeout = setTimeout(() => window.wait = false, 50);
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
            className: props.className,
            disabled: props.disabled
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            disabled: props.disabled
        });
    }

    render() {
        return (
            <button disabled={this.state.disabled} className={`button ${this.state.className}`} onClick={this.state.onClick}>{this.state.text}</button>
        );
    }
}
