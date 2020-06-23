import React, { Component } from 'react'
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
        recipeId: 0
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
                        weekNumber: el.weekNumber
                    }));
                this.setState({
                    data: data,
                });
                console.log(this.state.data);
            })
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
                    editInputValue: el.description,
                    recipeId: el.id
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

    render() {
        return (
            <div className="plan-list__container">
                <div className="plans-header">
                    <p>Lista Planow</p>
                    <span class="fas fa-plus-square"></span>
                </div>
                {this.state.isEditInput &&
                    <form onSubmit={this.handleChangeDescription}>
                        <textarea class="plans__edit"
                            value={this.state.editInputValue}
                            onChange={e => this.setState({
                                editInputValue: e.target.value
                            })}
                        />
                        <button type="submit" className="button__edit">Submit</button>
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
                            return <span>{el.id}</span>
                        })}
                    </div>
                    <div className="plans plans__name">
                        {this.state.data.map(el => {
                            return <span>{el.name}</span>
                        })}
                    </div>
                    <div className="plans plans__description">
                        {this.state.data.map(el => {
                            return <span>{el.description}</span>
                        })}
                    </div>
                    <div className="plans plans__week">
                        {this.state.data.map(el => {
                            return <span>{el.weekNumber}</span>
                        })}
                    </div>
                    <div className="plans plans__action">
                        {this.state.data.map((el, id) => {
                            return (
                                <div>
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