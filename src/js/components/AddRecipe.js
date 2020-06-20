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
            ingredients: [],
            warning: ""
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
            ingredients: [],
            warning: ""
        })
    }

    addToSteps = e => {
        e.preventDefault();
        if (this.state.step) {
            this.setState({
                steps: [...this.state.steps, this.state.step],
                step: ""
            })
        }

    }

    addToIngredients = e => {
        e.preventDefault();
        this.setState({
            ingredients: [...this.state.ingredients, this.state.ingredient],
            ingredient: ""
        })
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
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            this.setState({
                warning: "Przepis musi zawierać co najmniej 1 składnik i 1 instrukcję!"
            })
        }
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
                        <h2>Nowy przepis</h2>
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
                                <textarea maxlength="150" value={this.state.step} onChange={e => this.setState({ step: e.target.value })} />
                                <button onClick={e => this.addToSteps(e)}><i className="fas fa-plus-square"></i></button>
                            </div>
                            <ol>
                                {this.state.steps.map((step, id) => {
                                    return <li key={id}><span>{step}</span> <i className="fas fa-edit"></i><i class="far fa-trash-alt"></i></li>
                                })}
                            </ol>
                        </div>
                        <div className="modal__popup-add-recipe__add-list__content">
                            <h3>składniki</h3>
                            <div className="modal__popup-add-recipe__add-list__content__container">
                                <textarea maxlength="50" value={this.state.ingredient} onChange={e => this.setState({ ingredient: e.target.value })} />
                                <button onClick={e => this.addToIngredients(e)}><i className="fas fa-plus-square"></i></button>
                            </div>
                            <ul>
                                {this.state.ingredients.map((ingredient, id) => {
                                    return <li key={id}><span>{ingredient}</span> <i className="fas fa-edit"></i><i class="far fa-trash-alt"></i></li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <span className="modal__popup-add-recipe__warning">{this.state.warning}</span>
                </form>}
            </div>
        )
    }
}
