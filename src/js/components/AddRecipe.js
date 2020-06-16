import React, { Component } from 'react'

export default class AddRecipe extends Component {

    render() {
        return (
            <div className="modal">
                <button className="modal__btn">
                    <i class="far fa-plus-square"></i>
                    <span>Dodaj przepis</span>
                </button>
                <div className="modal__popup-add-recipe">
                </div>
            </div>
        )
    }
}
