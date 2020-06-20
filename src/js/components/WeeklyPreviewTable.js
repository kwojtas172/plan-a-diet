import React, { Component } from 'react';
import '../../scss/_weekly-preview-table.scss';

class WeeklyPreviewTable extends Component {
    state = {
        data: [],
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
        weekNr: "",
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/schedules/")
            .then(function (resp) {
                return resp.json();
            })
            .then(data => {
                data.forEach(el =>
                    this.setState({
                        monday: el.monday,
                        tuesday: el.tuesday,
                        wednesday: el.wednesday,
                        thursday: el.thursday,
                        friday: el.friday,
                        saturday: el.saturday,
                        sunday: el.sunday,
                        weekNr: el.weekNumber,
                    }))
            })
    }

    render() {
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday, weekNr, } = this.state;

        return (
            <div className="table__container" >
                <div className="week__number">
                    <p>Twoj plan na {weekNr} tydzien :</p>
                </div>
                <div className="day__name">
                    <span>Poniedzialek</span>
                    <span>Wtorek</span>
                    <span>Sroda</span>
                    <span>Czwartek</span>
                    <span>Piatek</span>
                    <span>Sobota</span>
                    <span>Niedziela</span>
                    {console.log("Działa")}
                </div>
                <div className="recipes-day__container">
                    <div className="week-day">
                        {monday.map(meal => {
                            return <span>{meal}</span>
                        })}
                    </div>
                    <div className="week-day">
                        {tuesday.map(meal => {
                            return <span>{meal}</span>
                        })}
                    </div>
                    <div className="week-day">
                        {wednesday.map(meal => {
                            return <span>{meal}</span>
                        })}
                    </div>
                    <div className="week-day">
                        {thursday.map(meal => {
                            return <span>{meal}</span>
                        })}
                    </div>
                    <div className="week-day">
                        {friday.map(meal => {
                            return <span>{meal}</span>
                        })}
                    </div>
                    <div className="week-day">
                        {saturday.map(meal => {
                            return <span>{meal}</span>
                        })}
                    </div>
                    <div className="week-day">
                        {sunday.map(meal => {
                            return <span>{meal}</span>
                        })}
                    </div>
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