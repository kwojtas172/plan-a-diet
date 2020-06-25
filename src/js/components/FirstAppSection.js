import React from "react";

export default class FirstAppSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            nameErr: "",
        }
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleClick = () => {

        if(this.state.name.length < 3) {
            this.setState({
                nameErr: "Pole wymagane"
            })
        } else {
            this.setState({
                nameErr: "",
                name: "",
            })
            this.props.addName(this.state.name)
        }

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
            
    }

    render() {
        return (
            <div className="first-app-section">
                <h1 className="first-app-section__title-1">Witaj,</h1>
                <h2 className="first-app-section__title-2"> wygląda na to, że jesteś tutaj <br></br> pierwszy raz!</h2>
                <p style={{color:"red", fontSize: ".75rem"}}>{this.state.nameErr}</p>
                <input className="first-app-section__input" type="text" onChange={this.handleChange} value={this.state.name} placeholder="tutaj wpisz jak masz na imię"></input>
                <button className="first-app-section__btn" onClick={this.handleClick}>Gotowe!</button>
                <h2 className="first-app-section__txt">Podaj nam swoje imię, a my zorganizujemy <br></br> dla Ciebie naszą aplikację :)</h2>
            </div>
        )
    }
}
