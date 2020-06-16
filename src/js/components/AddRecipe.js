import React, { Component } from 'react'

export default class AddRecipe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            name: "",
            description: "",
            step: "",
            steps: [],
            ingredient: "",
            ingredients: []
        }
    }

    handleShow = () => {
        this.setState({
            isShow: true
        })
    }

    handleHide = () => {
        this.setState({
            isShow: false
        })
    }

    addToSteps = e => {
        e.preventDefault();
        if(this.state.step) {
            this.setState({
                steps: [...this.state.steps, this.state.step]
            })
        }

    }

    addToIngredients = e => {
        e.preventDefault();
        this.setState({
            ingredients: [...this.state.ingredients, this.state.ingredient]
        })
    }

    postToBase = (e, name, description, steps, ingredients) => {
        e.preventDefault();
        const data = {
            "id": 1,
            "name": name,
            "description": description,
            "steps": steps,
            "ingredients": ingredients
        }
        fetch("http://localhost:3000/recipes/", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
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
    }

    render() {
        return (
            <div className="modal">
                {!this.state.isShow && <button className="modal__btn" onClick={this.handleShow}>
                    <i class="far fa-plus-square"></i>
                    <span>Dodaj przepis</span>
                </button>}
                {this.state.isShow && <div className="modal__popup-add-recipe">
                    <div className="modal__popup-add-recipe__header">
                        <h2>Nowy przepis</h2>
                        <button className="modal__popup-add-recipe__header_btn" onClick={this.handleHide}>Zapisz i zamknij</button>
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
                            <form>
                                <textarea maxlength="150" required value={this.state.step} onChange={e => this.setState({ step: e.target.value })} />
                                <button onClick={e => this.addToSteps(e)}><i className="fas fa-plus-square"></i></button>
                            </form>
                            <ol>
                                {this.state.steps.map(step => {
                                    return <li>{step}</li>
                                })}
                            </ol>
                        </div>
                        <div className="modal__popup-add-recipe__add-list__content">
                            <h3>składniki</h3>
                            <form>
                                <textarea maxlength="50" required value={this.state.ingredient} onChange={e => this.setState({ ingredient: e.target.value })} />
                                <button onClick={e => this.addToIngredients(e)}><i className="fas fa-plus-square"></i></button>
                            </form>
                            <ul>
                                {this.state.ingredients.map(ingredient => {
                                    return <li>{ingredient}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}
