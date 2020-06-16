import React, { Component } from 'react'

export default class AddSchedule extends Component {
    render() {
        return (
            <div className="modal">
                <button className="modal__btn">
                    <i class="far fa-plus-square"></i>
                    <span>Dodaj plan</span>
                </button>
                <div className="modal__popup-add-schedule">
                    
                </div>
            </div>
        )
    }
}
