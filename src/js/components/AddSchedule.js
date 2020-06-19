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
            planMeals: [],
            monday: [],
            tuesday: [],
            wednesday: [],
            thrusday: [],
            friday: [],
            saturday: [],
            sunday: [],
            meals: ["śniadanie", "drugie śniadanie", "zupa", "drugie danie", "kolacja"],
            weekdays: ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"],
            recipes:[]
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
            display: "block"
        })
    }

    validate = () => {

        let nameErr = "";
        let weekNumberErr = "";

        const {name, weekNumber} = this.state

        if(!name.length) {
            nameErr = "Pole wymagane"
        }

        if (weekNumber < "1" || weekNumber > "52") {
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

    planMealSelected = (e, index) => {
        const val = e.target.value;

        if(e.target.id === "poniedziałek") {
            this.setState(prevState => {
                const newState = prevState.monday.slice();
                newState[index] = val;
                return {
                    monday: newState
                };
            }, () => {
                console.log(this.state.monday, this.state.planMeals)
            });
        }     
        
        if(e.target.id === "wtorek") {
            this.setState(prevState => {
                const newState = prevState.tuesday.slice();
                newState[index] = val;
                return {
                    tuesday: newState
                };
            });
        } 

        if(e.target.id === "środa") {
            this.setState(prevState => {
                const newState = prevState.wednesday.slice();
                newState[index] = val;
                return {
                    wednesday: newState
                };
            });
        } 

        if(e.target.id === "czwartek") {
            this.setState(prevState => {
                const newState = prevState.thrusday.slice();
                newState[index] = val;
                return {
                    thrusday: newState
                };
            });
        } 

        if(e.target.id === "piątek") {
            this.setState(prevState => {
                const newState = prevState.friday.slice();
                newState[index] = val;
                return {
                    friday: newState
                };
            });
        } 

        if(e.target.id === "sobota") {
            this.setState(prevState => {
                const newState = prevState.saturday.slice();
                newState[index] = val;
                return {
                    saturday: newState
                };
            });
        } 

        if(e.target.id === "niedziela") {
            this.setState(prevState => {
                const newState = prevState.sunday.slice();
                newState[index] = val;
                return {
                    sunday: newState
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
                    <form className="modal__popup-add-schedule__form" onSubmit={(e) => this.closeAndSave(e, this.state.name, this.state.description, this.state.weekNumber, this.state.monday, this.state.tuesday, this.state.wednesday, this.state.thrusday, this.state.friday, this.state.saturday, this.state.sunday)}>
                        <header className="modal__popup-add-schedule__form__header">
                            <h1 className="modal__popup-add-schedule__form__header__title">Nowy plan</h1>
                            <button className="modal__popup-add-schedule__form__header__btn">Zapisz i zamknij</button>
                        </header>
                        <span className="modal__popup-add-schedule__form__division"></span>
                        <p style={{fontSize:"1rem", color:"red"}}>{this.state.nameErr}</p>
                        <div className="modal__popup-add-schedule__form__row">
                            <label className="modal__popup-add-schedule__form__label" htmlFor="name">Nazwa planu</label>
                            <input maxlength="50" type="text" id="name" value={this.state.name} onChange={this.formChange}></input>   
                        </div>
                        <div className="modal__popup-add-schedule__form__row">
                            <label className="modal__popup-add-schedule__form__label" htmlFor="description">Opis planu</label>
                            <textarea maxlength="360" id="description" value={this.state.description} onChange={this.formChange}></textarea>
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
                                   <tr key={weekday}>
                                       <th>{weekday}</th>
                                        {this.state.meals.map((meal, index) => {
                                            return (
                                                <td key={meal}>
                                                <select onChange={(e) => this.planMealSelected(e, index)} id={weekday}>
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
        </div>
        )
    }
}



