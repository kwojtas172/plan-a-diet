import React, { Component } from 'react';

export default class AddSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: "none",
            name: "",
            nameErr: "",
            description: "",
            weekNumber: "",
            weekNumberErr: "",
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
            meals: ["śniadanie", "drugie śniadanie", "zupa", "drugie danie", "kolacja"],
            weekdays: [{pl:"poniedziałek", en:"monday"}, {pl:"wtorek", en:"tuesday"}, {pl: "środa", en: "wednesday"}, {pl:"czwartek", en: "thursday"}, {pl: "piątek", en:"friday"}, {pl: "sobota", en:"saturday"}, {pl: "niedziela", en: "sunday"}],
            recipes:[], 
            isSuccess: false,
            displayMsg: "block",
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/recipes/")
        .then(res => res.json())
        .then(recipes => {
            console.log(recipes)
            this.setState({
                recipes
            })
        })
    }

    handleClick = () => {
        this.setState({
            display: "block",
        })
    }

    handleCloseMsg = () => {
        this.setState({
            displayMsg: "none"
        })
        
    }

    validate = () => {

        let nameErr = "";
        let weekNumberErr = "";

        const {name, weekNumber} = this.state

        if(!name.length) {
            nameErr = "Pole wymagane"
        }

        if(!weekNumber.length) {
            weekNumberErr = "Pole wymagane"
        }

        if (parseFloat(weekNumber) < 1 ||  parseFloat(weekNumber) > 52) {
            weekNumberErr = "Nieprawidłowa wartość pola"
        }

        if(nameErr || weekNumberErr) {
            this.setState({nameErr, weekNumberErr})
            return false;
        } 

        return true
    }


    closeAndSave = (e, name, description, weekNumber, monday, tuesday, wednesday, thursday, friday, saturday, sunday) => {

        e.preventDefault()
        const isValid = this.validate()
        const data = {
            name,
            description,
            weekNumber,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
        }

        if(isValid) {
            this.setState({
                display: "none",
                name: "",
                nameErr: "",
                description: "",
                weekNumber: "",
                weekNumberErr: "",
                monday: ["", "", "", "", ""],
                tuesday: ["", "", "", "", ""],
                wednesday: ["", "", "", "", ""],
                thursday: ["", "", "", "", ""],
                friday: ["", "", "", "", ""],
                saturday: ["", "", "", "", ""],
                sunday: ["", "", "", "", ""],
                isSuccess: true,
                displayMsg: "block"
            })


            fetch("http://localhost:3000/schedules/", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"},
                body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        } else {
            this.setState({
                display: "block"
            })
        } 
    }

    handleValue = (weekday, index) => {

        if(weekday === "monday") {
            return this.state.monday[index]
        }

        if(weekday === "tuesday") {
            return this.state.tuesday[index]
        }

        if(weekday === "wednesday") {
            return this.state.wednesday[index]
        }

        if(weekday === "thursday") {
            return this.state.thursday[index]
        }

        if(weekday === "friday") {
            return this.state.friday[index]
        }

        if(weekday === "saturday") {
            return this.state.saturday[index]
        }

        if(weekday === "sunday") {
            return this.state.sunday[index]
        }

    }

    planMealSelected = (e, index, weekday) => {
        const val = e.target.value;

        if(e.target.id === weekday) {
            this.setState(prevState => {
                const newState = prevState[weekday].slice();
                newState[index] = val;
                return {
                    [weekday]: newState
                };
            });
        }   
    }

    formChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        return (
            <div className="modal">
                <button className="modal__btn" onClick={this.handleClick}>
                    <i class="far fa-plus-square"></i>
                    <span>Dodaj plan</span>
                </button>
                <div className="modal__popup-add-schedule" style={{display:this.state.display}}>
                    <form className="modal__popup-add-schedule__form" onSubmit={(e) => this.closeAndSave(e, this.state.name, this.state.description, this.state.weekNumber, this.state.monday, this.state.tuesday, this.state.wednesday, this.state.thursday, this.state.friday, this.state.saturday, this.state.sunday)}>
                        <header className="modal__popup-add-schedule__form__header">
                            <h1 className="modal__popup-add-schedule__form__header__title">Nowy plan</h1>
                            <button className="modal__popup-add-schedule__form__header__btn">Zapisz i zamknij</button>
                        </header>
                        <span className="modal__popup-add-schedule__form__division"></span>
                        <p style={{fontSize:"1rem", color:"red"}}>{this.state.nameErr}</p>
                        <div className="modal__popup-add-schedule__form__row">
                            <label className="modal__popup-add-schedule__form__label" htmlFor="name">Nazwa planu</label>
                            <input maxLength="50" type="text" id="name" value={this.state.name} onChange={this.formChange}></input>   
                        </div>
                        <div className="modal__popup-add-schedule__form__row">
                            <label className="modal__popup-add-schedule__form__label" htmlFor="description">Opis planu</label>
                            <textarea maxLength="360" id="description" value={this.state.description} onChange={this.formChange}></textarea>
                        </div>
                        <p style={{fontSize:"1rem", color:"red"}}>{this.state.weekNumberErr}</p>
                        <div className="modal__popup-add-schedule__form__row">
                            <label className="modal__popup-add-schedule__form__label" htmlFor="weekNumber">Numer tygodnia</label>
                            <input type="number" id="weekNumber" value={this.state.weekNumber} onChange={this.formChange}></input>
                        </div>                    
                        <span className="modal__popup-add-schedule__form__division modal__popup-add-schedule__form__division-shorter"></span>
                        <table className="modal__popup-add-schedule__form__table">
                            <thead>
                                <tr>
                                    <th></th>
                                   {this.state.meals.map(meal => {
                                       return <th key={meal}>{meal}</th>
                                   })}
                                </tr>
                            </thead> 
                        <tbody>
                           {this.state.weekdays.map(weekday => {
                               return (
                                   <tr key={weekday.en}>
                                       <th>{weekday.pl}</th>
                                        {this.state.meals.map((meal, index) => {
                                            return (
                                                <td key={meal}>
                                                <select value={this.handleValue(weekday.en, index)} onChange={(e) => this.planMealSelected(e, index, weekday.en)} id={weekday.en}>
                                                    <option>Wybierz</option>
                                                    {this.state.recipes.map(recipe => {
                                                    return <option key={recipe.id} value={recipe.name}>{recipe.name}</option>
                                                    })}
                                                </select>
                                            </td>
                                            )})}
                                   </tr>
                               )
                           })}
                        </tbody>
                    </table>
                </form>                  
            </div>
           { this.state.isSuccess && <div className="modal__success-msg" style={{display:this.state.displayMsg}}>
                <i className="far fa-check-circle"></i>
                <span>Twój plan został zapisany!</span>
                <button className="modal__success-msg__btn" onClick={this.handleCloseMsg}><i className="fas fa-times"></i></button>
            </div> } 
        </div>
        )
    }
}



