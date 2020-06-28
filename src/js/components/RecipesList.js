import React, { Component } from 'react'
import '../../scss/_recipes-list.scss';

class RecipesList extends Component {
    state = {
        data: [],
        id: [],
        name: [],
        description: [],
        step: "",
        stepID: -1,
        steps: [],
        ingredient: "",
        ingredientID: -1,
        ingredients: [],
        isEditInput: false,
        editInputValue: "",
        isSucces: false,
        isRemoved : false,
        recipeId: 0,
        isWarning: false
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/recipes/")
            .then(response => response.json())
            .then(data => {
                data.forEach(el =>
                    this.setState({
                        id: el.id,
                        name: el.name,
                        description: el.description,
                        steps: el.steps,
                        ingredients: el.ingredients
                    }))
                this.setState({
                    data: data,
                })
                console.log(this.state.data);

            })
    };

    handlePatchToBase = (e) => {
        e.preventDefault();
        const data = {
            "name": this.state.name,
            "description": this.state.description,
            "steps": this.state.steps,
            "ingredients": this.state.ingredients
        };

        const tempArr = [...this.state.data];
        tempArr.forEach(el => {
            if (el.id === this.state.recipeId) {
                el.name = this.state.name;
                el.description = this.state.description;
                el.ingredients = this.state.ingredients;
                el.steps = this.state.steps;
            }
        });
        this.setState({
            data: tempArr
        });

        fetch(`http://localhost:3000/recipes/${this.state.recipeId}`, {
            method: 'PATCH',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    isEditInput: false,
                    isSucces: true
                })
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
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
                    fetch(`http://localhost:3000/recipes/${this.state.recipeId}`, {
                        method: 'DELETE',
                    })
                        .then(resp => resp.json())
                        .then(data => console.log(data))
                })
            }
        });
        this.setState({
            data: tempArr,
            isRemoved: true
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
                    ingredients: el.ingredients,
                    steps: el.steps
                })
            }
        })
    };

    handleChangeDescription = (e) => {
        e.preventDefault();
        const data = {
            "name": this.state.data[this.state.recipeId - 1].name,
            "description": this.state.editInputValue,
            "steps": this.state.data[this.state.recipeId - 1].steps,
            "ingredients": this.state.data[this.state.recipeId - 1].ingredients
        };

        fetch(`http://localhost:3000/recipes/${this.state.recipeId}`, {
            method: 'PATCH',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
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

        const tempArr = [...this.state.data];
        tempArr.forEach((el, id) => {
            if (id === (this.state.recipeId - 1)) {
                el.description = this.state.editInputValue;
            }
            this.setState({
                data: tempArr
            })
        })
    };

    handleDeleteStep = e => {
        let tempArr = [...this.state.steps]
        tempArr.forEach((_, id) => {
            if (id === +e.target.dataset.name) {
                tempArr.splice(id, 1)
            }
        })
        this.setState({
            steps: tempArr
        })
    };

    handleEditStep = e => {
        let tempArr = [...this.state.steps]
        tempArr.forEach((step, id) => {
            if (id === +e.target.dataset.name) {
                this.setState({
                    step: step,
                    stepID: id
                })
            }
        })
    };

    handleDeleteIngredient = e => {
        let tempArr = [...this.state.ingredients]
        tempArr.forEach((_, id) => {
            if (id === +e.target.dataset.name) {
                tempArr.splice(id, 1)
            }
        })
        this.setState({
            ingredients: tempArr
        })
    };

    handleEditIngredient = e => {
        let tempArr = [...this.state.ingredients]
        tempArr.forEach((ingredient, id) => {
            if (id === +e.target.dataset.name) {
                this.setState({
                    ingredient: ingredient,
                    ingredientID: id
                })
            }
        })
    };

    // addToIngredients = e => {

    //     e.preventDefault();
    //     if (this.state.ingredient) {
    //         if (this.state.ingredientID === -1) {
    //             this.setState({
    //                 ingredients: [...this.state.ingredients, this.state.ingredient],
    //                 ingredient: ""
    //             })
    //         }
    //         if (this.state.ingredientID >= 0) {
    //             let tempArr = [...this.state.ingredients];
    //             tempArr[this.state.ingredientID] = this.state.ingredient;
    //             this.setState({
    //                 ingredients: tempArr,
    //                 ingredient: "",
    //                 ingredientID: -1
    //             })
    //         }
    //     }
    // };


    addToSteps = e => {
        e.preventDefault();
        if (this.state.step) {
            if (this.state.stepID === -1) {
                this.setState({
                    steps: [...this.state.steps, this.state.step],
                    step: "",
                    isWarning: false
                })
            }
            if (this.state.stepID >= 0) {
                let tempArr = [...this.state.steps];
                tempArr[this.state.stepID] = this.state.step;
                this.setState({
                    steps: tempArr,
                    step: "",
                    stepID: -1
                })
            }
        }
    };

    addToIngredients = e => {

        e.preventDefault();
        if (this.state.ingredient) {
            if (this.state.ingredientID === -1) {
                this.setState({
                    ingredients: [...this.state.ingredients, this.state.ingredient],
                    ingredient: "",
                    isWarning: false
                })
            }
            if (this.state.ingredientID >= 0) {
                let tempArr = [...this.state.ingredients];
                tempArr[this.state.ingredientID] = this.state.ingredient;
                this.setState({
                    ingredients: tempArr,
                    ingredient: "",
                    ingredientID: -1
                })
            }
        }
    };

    render() {
        return (
            <div className="recipes-list__container">
                <div className="recipes__header">
                    <p>Lista Przepisów</p>
                    {/* <span class="fas fa-plus-square"></span> */}
                </div>
                {this.state.isEditInput && <form className="modal__popup-add-recipe" onSubmit={e => this.handlePatchToBase(e)}>
                    <div className="modal__popup-add-recipe__header">
                        <h1>Edytuj przepis</h1>
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
                                    return <li key={id}><span>{step}</span> <i data-name={id} onClick={this.handleEditStep} className="fas fa-edit"></i><i data-name={id} onClick={this.handleDeleteStep} class="far fa-trash-alt"></i></li>
                                })}
                            </ol>
                        </div>
                        <div className="modal__popup-add-recipe__add-list__content">
                            <h3>składniki</h3>
                            <div className="modal__popup-add-recipe__add-list__content__container">
                                <textarea maxlength="50" value={this.state.ingredient} onChange={e => this.setState({ ingredient: e.target.value })} />
                                <button onClick={e => this.addToIngredients(e)} ><i className="fas fa-plus-square"></i></button>
                            </div>
                            <ul>
                                {this.state.ingredients.map((ingredient, id) => {
                                    return <li key={id}><span>{ingredient}</span> <i onClick={this.handleEditIngredient} data-name={id} className="fas fa-edit"></i><i onClick={this.handleDeleteIngredient} data-name={id} className="far fa-trash-alt"></i></li>
                                })}
                            </ul>
                        </div>
                    </div>
                    {this.state.isWarning && <span className="modal__popup-add-recipe__warning">Przepis musi zawierać co najmniej 1 instrukcję oraz składnik</span>}
                </form>}
                <div className="recipes__info">
                    <p className="recipes__info__id">ID</p>
                    <p className="recipes__info__name">NAZWA</p>
                    <p className="recipes__info__description">OPIS</p>
                    <p className="recipes__info__action">AKCJA</p>
                </div>
                <div className="recipes__list">
                    <div className="recipes recipes__id">
                        {this.state.data.map(el => {
                            return <span>{el.id}</span>
                        })}
                    </div>
                    <div className="recipes recipes__name">
                        {this.state.data.map(el => {
                            return <span>{el.name}</span>
                        })}
                    </div>
                    <div className="recipes recipes__description">
                        {this.state.data.map(el => {
                            return <span>{el.description}</span>
                        })}
                    </div>
                    <div className="recipes__action">
                        {this.state.data.map((el, id) => {
                            return <span data-id={id} onClick={this.handelEditRecipe} class="far fa-edit"></span>
                        })}
                    </div>
                    <div className="recipes__action">
                        {this.state.data.map((el, id) => {
                            return <span data-id={id} onClick={this.handleDeleteRecipe} class="far fa-trash-alt"></span>
                        })}
                    </div>
                </div>
                {this.state.isSucces && <div className="modal__edit-msg">
                <button className="modal__edit-msg__btn" onClick={() => this.setState({isSucces: false})}><i className="fas fa-times"></i></button>
                <i className="far fa-check-circle modal__edit-msg__icon"></i>
                <span className="modal__edit-msg__text">Edytowałeś przepis!</span>
                </div> }
                {this.state.isRemoved && <div className="modal__delete-msg">
                <button className="modal__delete-msg__btn" onClick={() => this.setState({isRemoved: false})}><i className="fas fa-times"></i></button>
                <i className="far fa-check-circle modal__delete-msg__icon"></i>
                <span className="modal__delete-msg__text">Usunąłeś przepis!</span>
                </div> }
            </div >
        );
    }
};

export default RecipesList;

