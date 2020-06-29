import React, { Component } from 'react'

export default class AddRecipe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            name: "",
            description: "",
            step: "",
            stepID: -1,
            steps: [],
            ingredient: "",
            ingredientID: -1,
            ingredients: [],
            isWarningStep: false,
            isWarningIngredient: false,
            isSucces: false
        }
    }


    handleShow = () => {
        this.setState({
            isShow: true
        })
    }

    handleHide = () => {
        this.setState({
            isShow: false,
            name: "",
            description: "",
            step: "",
            steps: [],
            ingredient: "",
            ingredientID: -1,
            ingredients: [],
            isWarningStep: false,
            isWarningIngredient: false,
            isSucces: true
        })
    }

    hideInfo = () => {
        this.setState({
            isSucces: false
        })
    }

    addToSteps = e => {
        e.preventDefault();
        if (this.state.step) {
            if(this.state.stepID === -1) {
                this.setState({
                    steps: [...this.state.steps, this.state.step],
                    step: "",
                    isWarningStep: false
                })
            } 
            if(this.state.stepID >= 0) {
                let tempArr = [...this.state.steps];
                tempArr[this.state.stepID] = this.state.step;
                this.setState({
                    steps: tempArr,
                    step: "",
                    stepID: -1
                })
            }
        }

    }

    addToIngredients = e => {

        e.preventDefault();
        if (this.state.ingredient) {
            if(this.state.ingredientID === -1) {
                this.setState({
                    ingredients: [...this.state.ingredients, this.state.ingredient],
                    ingredient: ""
                })
            } 
            if(this.state.ingredientID >= 0) {
                let tempArr = [...this.state.ingredients];
                tempArr[this.state.ingredientID] = this.state.ingredient;
                this.setState({
                    ingredients: tempArr,
                    ingredient: "",
                    ingredientID: -1
                })
            }
        }
    }

    postToBase = (e, name, description, steps, ingredients) => {
        e.preventDefault();
        const data = {
            "name": name,
            "description": description,
            "steps": steps,
            "ingredients": ingredients
        };
        if(this.state.steps.length && this.state.ingredients.length) {

            fetch("http://localhost:3000/recipes/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.handleHide();
                this.props.change();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } if (!this.state.steps.length) {
            this.setState({
                isWarningStep: true
            })
        } if (!this.state.ingredients.length) {
            this.setState({
                isWarningIngredient: true
            })
        }
    }

    handleDeleteStep = e => {
        let tempArr = [...this.state.steps]
        tempArr.forEach((_,id) => {
            if(id === +e.target.dataset.name) {
                tempArr.splice(id,1)
            }
        })
        this.setState({
            steps: tempArr
        })
    }

    handleEditStep = e => {
        let tempArr = [...this.state.steps]
        tempArr.forEach((step, id) => {
            if(id === +e.target.dataset.name) {
                this.setState({
                    step: step,
                    stepID: id
                })
            }
        })
    }


    handleDeleteIngredient = e => {
        let tempArr = [...this.state.ingredients]
        tempArr.forEach((_,id) => {
            if(id === +e.target.dataset.name) {
                tempArr.splice(id,1)
            }
        })
        this.setState({
            ingredients: tempArr
        })
    }

    handleEditIngredient = e => {
        let tempArr = [...this.state.ingredients]
        tempArr.forEach((ingredient, id) => {
            if(id === +e.target.dataset.name) {
                this.setState({
                    ingredient: ingredient,
                    ingredientID: id
                })
            }
        })
    }

    render() {
        return (
            <div className="modal">
                {!this.state.isShow && <button className="modal__btn" onClick={this.handleShow}>
                    <i className="far fa-plus-square"></i>
                    <span>Dodaj przepis</span>
                </button>}
                {this.state.isShow && <form className="modal__popup-add-recipe" onSubmit={e => this.postToBase(e, this.state.name, this.state.description, this.state.steps, this.state.ingredients)}>
                    <div className="modal__popup-add-recipe__header">
                        <h1>Nowy przepis</h1>
                        <button type="submit" className="modal__popup-add-recipe__header_btn">Zapisz i zamknij</button>
                    </div>
                    <div className="modal__popup-add-recipe__new">
                        <div className="modal__popup-add-recipe__new__wrapper">
                            <h3>Nazwa przepisu</h3>
                            <input maxlength="50" type="text" required value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                        </div>
                        <div className="modal__popup-add-recipe__new__wrapper">
                            <h3>Opis przepisu</h3>
                            <textarea maxlength="360" value={this.state.description} onChange={e => this.setState({ description: e.target.value })} />
                        </div>
                    </div>
                    <div className="modal__popup-add-recipe__add-list">
                        <div className="modal__popup-add-recipe__add-list__content">
                            <h3>instrukcje</h3>
                            <div className="modal__popup-add-recipe__add-list__content__container">
                                <textarea rows="4" maxlength="150" value={this.state.step} onChange={e => this.setState({ step: e.target.value, isWarningStep: false })} />
                                <button onClick={e => this.addToSteps(e)}><i className="fas fa-plus-square"></i></button>
                            </div>
                            {this.state.isWarningStep && <span className="modal__popup-add-recipe__warning">Przepis musi zawierać co najmniej 1 instrukcję</span>}
                            <ol>
                                {this.state.steps.map((step, id) => {
                                    return <li key={id}><span>{step}</span> <i data-name={id} onClick={this.handleEditStep} className="fas fa-edit"></i><i data-name={id} onClick={this.handleDeleteStep} class="far fa-trash-alt"></i></li>
                                })}
                            </ol>
                        </div>
                        <div className="modal__popup-add-recipe__add-list__content">
                            <h3>składniki</h3>
                            <div className="modal__popup-add-recipe__add-list__content__container">
                                <textarea  rows="4" maxlength="50" value={this.state.ingredient} onChange={e => this.setState({ ingredient: e.target.value, isWarningIngredient: false })} />
                                <button onClick={e => this.addToIngredients(e)}><i className="fas fa-plus-square"></i></button>
                            </div>
                            {this.state.isWarningIngredient && <span className="modal__popup-add-recipe__warning">Przepis musi zawierać co najmniej 1 składnik</span>}
                            <ul>
                                {this.state.ingredients.map((ingredient, id) => {
                                    return <li key={id}><span>{ingredient}</span> <i onClick={this.handleEditIngredient} data-name={id} className="fas fa-edit"></i><i onClick={this.handleDeleteIngredient} data-name={id} className="far fa-trash-alt"></i></li>
                                })}
                            </ul>
                        </div>
                    </div>
                </form>}
                {this.state.isSucces && <div className="modal__success-msg">
                <button className="modal__success-msg__btn" onClick={this.hideInfo}><i className="fas fa-times"></i></button>
                <i className="far fa-check-circle modal__success-msg__icon"></i>
                <span className="modal__success-msg__text">Twój przepis został zapisany!</span>
                </div> }
            </div>
        )
    }
}
