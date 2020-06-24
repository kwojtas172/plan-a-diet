import React, { Component } from 'react'

export default class FormToSubscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            isSubmit: false
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            isSubmit: true
        })
    }
    
    render() {
        return (
            <section className="form-subscription">
                <div className="form-subscription__wrapper wrapper">
                    <h3 className="form-subscription__title">
                        Lorem ipsum dolor sit amet
                    </h3>
                    <form className="form-subscription__form" onSubmit={this.handleSubmit} >
                        <input className="form-subscription__form__input" value={this.state.inputValue} onChange={e => this.setState({inputValue: e.target.value, isSubmit: false})} />
                        <button type="submit" className="form-subscription__form__btn">Lorem</button>
                    </form>
                </div>
                {this.state.isSubmit && <p className="form-subscription__info">You have subscribed to newsletter!</p>}
            </section>
        )
    }
}
