import React from "react";

export default class AppMainSection1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleClick = () => {

        const user = {
            name: this.state.name
        }

        const url = `http://localhost:3000/user`;
        fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
            .then(resp => resp.json())
            .then(json => console.log(json))
    
    }

    render() {
        return (
            <div className="app-main-section-1">
                <h1 className="app-main-section-1__title">Witaj,</h1>
                <h2 className="app-main-section-1__title"> wygląda na to, że jesteś tutaj <br></br> pierwszy raz!</h2>
                <input className="app-main-section-1__input" type="text" onChange={this.handleChange} value={this.state.name} placeholder="tutaj wpisz jak masz na imię"></input>
                <button className="app-main-section-1__btn" onClick={this.handleClick}>Gotowe!</button>
                <p className="app-main-section-1__txt">Podaj nam swoje imię, a my zorganizujemy <br></br> dla Ciebie naszą aplikację :)</p>
            </div>
        )
    }
}