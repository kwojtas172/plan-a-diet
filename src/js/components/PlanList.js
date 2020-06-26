import React, { Component } from 'react';
import '../../scss/_plan-list.scss';

class PlanList extends Component {
    state = {
        data: [],
        description: [],
        id: [],
        name: [],
        weekNumber: "",
        isEditInput: false,
        editInputValue: "",
        recipeId: 0,
        display: "none",
        nameErr: "",
        weekNumberErr: "",
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
        meals: ["śniadanie", "drugie śniadanie", "zupa", "drugie danie", "kolacja"],
        weekdays: [{ pl: "poniedziałek", en: "monday" }, { pl: "wtorek", en: "tuesday" }, { pl: "środa", en: "wednesday" }, { pl: "czwartek", en: "thursday" }, { pl: "piątek", en: "friday" }, { pl: "sobota", en: "saturday" }, { pl: "niedziela", en: "sunday" }],
        recipes: [],
        isSuccess: false,
        displayMsg: "block",
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/schedules/")
            .then(response => response.json())
            .then(data => {
                data.forEach(el =>
                    this.setState({
                        description: el.description,
                        id: el.id,
                        name: el.name,
                        weekNumber: el.weekNumber,
                        monday: el.monday,
                        tuesday: el.tuesday,
                        wednesday: el.wednesday,
                        thursday: el.thursday,
                        friday: el.friday,
                        saturday: el.saturday,
                        sunday: el.sunday
                    }));
                this.setState({
                    data: data,
                });
                console.log(this.state.data);
            });

        fetch("http://localhost:3000/recipes/")
            .then(res => res.json())
            .then(recipes => {
                console.log(recipes)
                this.setState({
                    recipes
                })
            });
    };

    handleDeleteRecipe = (e) => {
        const tempArr = [...this.state.data];
        tempArr.forEach((el, id) => {
            if (+e.target.dataset.id === id) {
                tempArr.splice(id, 1)
                this.setState({
                    recipeId: el.id
                }, () => {
                    fetch(`http://localhost:3000/schedules/${this.state.recipeId}`, {
                        method: 'DELETE',
                    })
                        .then(resp => resp.json())
                        .then(data => console.log(data))
                })
            }
        });
        this.setState({
            data: tempArr
        });
    };

    handelEditRecipe = (e) => {
        const tempArr = [...this.state.data];
        tempArr.forEach((el, id) => {
            if (+e.target.dataset.id === id) {
                this.setState({
                    isEditInput: !this.state.isEditInput,
                    recipeId: el.id,
                    name: el.name,
                    description: el.description,
                    weekNumber: el.weekNumber,
                    monday: el.monday,
                    tuesday: el.tuesday,
                    wednesday: el.wednesday,
                    thursday: el.thursday,
                    friday: el.friday,
                    saturday: el.saturday,
                    sunday: el.sunday
                })
            }
        })
    };

    handleClick = () => {
        this.setState({
            display: "block",
        })
    };

    handleCloseMsg = () => {
        this.setState({
            displayMsg: "none"
        })
    };

    validate = () => {

        let nameErr = "";
        let weekNumberErr = "";

        const { name, weekNumber } = this.state

        if (!name.length) {
            nameErr = "Pole wymagane"
        }

        if (!weekNumber.length) {
            weekNumberErr = "Pole wymagane"
        }

        if (parseFloat(weekNumber) < 1 || parseFloat(weekNumber) > 52) {
            weekNumberErr = "Nieprawidłowa wartość pola"
        }

        if (nameErr || weekNumberErr) {
            this.setState({ nameErr, weekNumberErr })
            return false;
        }

        return true
    };

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
        };

        if (isValid) {
            const tempArr = [...this.state.data];
            tempArr.forEach(el => {
                if (el.id === this.state.recipeId) {
                    el.name = this.state.name;
                    el.description = this.state.description;
                    el.weekNumber = this.state.weekNumber;
                    el.monday = this.state.monday;
                    el.tuesday = this.state.tuesday;
                    el.wednesday = this.state.wednesday;
                    el.thursday = this.state.thursday;
                    el.friday = this.state.friday;
                    el.saturday = this.state.saturday;
                    el.sunday = this.state.sunday
                }
            });
            this.setState({
                data: tempArr,
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
                displayMsg: "block",
                isEditInput: false,
            })


            fetch(`http://localhost:3000/schedules/${this.state.recipeId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
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
                display: "block",
            })
        }
    };

    handleValue = (weekday, index) => {

        if (weekday === "monday") {
            return this.state.monday[index]
        }

        if (weekday === "tuesday") {
            return this.state.tuesday[index]
        }

        if (weekday === "wednesday") {
            return this.state.wednesday[index]
        }

        if (weekday === "thursday") {
            return this.state.thursday[index]
        }

        if (weekday === "friday") {
            return this.state.friday[index]
        }

        if (weekday === "saturday") {
            return this.state.saturday[index]
        }

        if (weekday === "sunday") {
            return this.state.sunday[index]
        }
    };

    planMealSelected = (e, index, weekday) => {
        const val = e.target.value;

        if (e.target.id === weekday) {
            this.setState(prevState => {
                const newState = prevState[weekday].slice();
                newState[index] = val;
                return {
                    [weekday]: newState
                };
            });
        }
    };

    formChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    render() {
        return (
            <div className="plan-list__container">
                <div className="plans-header">
                    <p>Lista Planow</p>
                    <span class="fas fa-plus-square"></span>
                </div>
                {this.state.isEditInput && <form className="modal__popup-add-schedule__form" onSubmit={(e) => this.closeAndSave(e, this.state.name, this.state.description, this.state.weekNumber, this.state.monday, this.state.tuesday, this.state.wednesday, this.state.thursday, this.state.friday, this.state.saturday, this.state.sunday)}>
                    <header className="modal__popup-add-schedule__form__header">
                        <h1 className="modal__popup-add-schedule__form__header__title">Nowy plan</h1>
                        <button className="modal__popup-add-schedule__form__header__btn" type="submit">Zapisz i zamknij</button>
                    </header>
                    <span className="modal__popup-add-schedule__form__division"></span>
                    <p style={{ fontSize: "1rem", color: "red" }}>{this.state.nameErr}</p>
                    <div className="modal__popup-add-schedule__form__row">
                        <label className="modal__popup-add-schedule__form__label" htmlFor="name">Nazwa planu</label>
                        <input maxLength="50" type="text" id="name" value={this.state.name} onChange={this.formChange}></input>
                    </div>
                    <div className="modal__popup-add-schedule__form__row">
                        <label className="modal__popup-add-schedule__form__label" htmlFor="description">Opis planu</label>
                        <textarea maxLength="360" id="description" value={this.state.description} onChange={this.formChange}></textarea>
                    </div>
                    <p style={{ fontSize: "1rem", color: "red" }}>{this.state.weekNumberErr}</p>
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
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </form>}
                <div className="plans-info">
                    <p className="plans__info__id">ID</p>
                    <p className="plans__info__name">NAZWA</p>
                    <p className="plans__info__description">OPIS</p>
                    <p className="plans__info__week">TYDZIEN</p>
                    <p className="plans__info__action">AKCJE</p>
                </div>
                <div className="plans__list">
                    <div className="plans plans__id">
                        {this.state.data.map(el => {
                            return <span className="plans__id">{el.id}</span>
                        })}
                    </div>
                    <div className="plans plans__name">
                        {this.state.data.map(el => {
                            return <span className="plans__name">{el.name}</span>
                        })}
                    </div>
                    <div className="plans plans__description">
                        {this.state.data.map(el => {
                            return <span className="plans__description">{el.description}</span>
                        })}
                    </div>
                    <div className="plans plans__week">
                        {this.state.data.map(el => {
                            return <span className="plans__week">{el.weekNumber}</span>
                        })}
                    </div>
                    <div className="plans__action">
                        {this.state.data.map((el, id) => {
                            return (
                                <div className="plans__action">
                                    <span
                                        data-id={id}
                                        class="far fa-edit"
                                        onClick={this.handelEditRecipe}>
                                    </span>
                                    <span
                                        data-id={id}
                                        class="far fa-trash-alt"
                                        onClick={this.handleDeleteRecipe}>
                                    </span>
                                </div>)
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default PlanList;