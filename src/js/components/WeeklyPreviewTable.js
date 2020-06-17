import React, { Component } from 'react';

class WeeklyPreviewTable extends Component {
    state = {}
    render() {
        return (
            <div className="table__container">
                <div className="week__number">
                    <p>Twoj plan na {"{nr_tygodnia}"} tydzien :</p>
                </div>
                <div className="day__name">
                    <span>Poniedzialek</span>
                    <span>Wtorek</span>
                    <span>Sroda</span>
                    <span>Czwartek</span>
                    <span>Piatek</span>
                    <span>Sobota</span>
                    <span>Niedziela</span>
                </div>
                <div className="day__breakfast">
                    <span>sniadanie</span>
                    <span>sniadanie</span>
                    <span>sniadanie</span>
                    <span>sniadanie</span>
                    <span>sniadanie</span>
                    <span>sniadanie</span>
                    <span>sniadanie</span>
                </div>
                <div className="day__lunch">
                    <span>drugie sniadanie</span>
                    <span>drugie sniadanie</span>
                    <span>drugie sniadanie</span>
                    <span>drugie sniadanie</span>
                    <span>drugie sniadanie</span>
                    <span>drugie sniadanie</span>
                    <span>drugie sniadanie</span>
                </div>
                <div className="day__soup">
                    <span>zupa</span>
                    <span>zupa</span>
                    <span>zupa</span>
                    <span>zupa</span>
                    <span>zupa</span>
                    <span>zupa</span>
                    <span>zupa</span>
                </div>
                <div className="day__main-meal">
                    <span>drugie danie</span>
                    <span>drugie danie</span>
                    <span>drugie danie</span>
                    <span>drugie danie</span>
                    <span>drugie danie</span>
                    <span>drugie danie</span>
                    <span>drugie danie</span>
                </div>
                <div className="day__supper">
                    <span>kolacja</span>
                    <span>kolacja</span>
                    <span>kolacja</span>
                    <span>kolacja</span>
                    <span>kolacja</span>
                    <span>kolacja</span>
                    <span>kolacja</span>
                </div>
                <div className="weekly-preview-table-select__btns">
                    <div className="weekly-preview-table-prev__btn">
                        <i class="fas fa-angle-double-left"></i>
                        <span>poprzedni</span>
                    </div>
                    <div className="weekly-preview-table-next__btn">
                        <span>nastepny</span>
                        <i class="fas fa-angle-double-right" ></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeeklyPreviewTable;