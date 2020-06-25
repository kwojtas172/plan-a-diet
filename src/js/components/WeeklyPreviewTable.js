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
        nowNumWeek: 0
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/schedules/")
            .then(function (resp) {
                return resp.json();
            })
            .then(data => {
                let now = new Date();
                let start = new Date(now.getFullYear(), 0, 0);
                let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
                let oneDay = 1000 * 60 * 60 * 24;
                let day = Math.floor(diff / oneDay);
                let startValue = start.getDay();
                let finishValue = 7 - now.getDay();
                let weekOfYear = Math.floor((day + startValue + finishValue)/7)
                this.setState({
                    nowNumWeek: weekOfYear,
                    data: data
                })

                data.sort((a, b) => a.weekNumber - b.weekNumber)
                .forEach(el => {
                    if(+el.weekNumber === this.state.nowNumWeek) {
                        this.setState({
                            monday: el.monday,
                            tuesday: el.tuesday,
                            wednesday: el.wednesday,
                            thursday: el.thursday,
                            friday: el.friday,
                            saturday: el.saturday,
                            sunday: el.sunday,
                            weekNr: el.weekNumber,
                        })
                    } else if(!this.state.weekNr) {
                        data.forEach(el => {
                            if(+this.state.nowNumWeek < +el.weekNumber) {
                                this.setState({
                                    monday: el.monday,
                                    tuesday: el.tuesday,
                                    wednesday: el.wednesday,
                                    thursday: el.thursday,
                                    friday: el.friday,
                                    saturday: el.saturday,
                                    sunday: el.sunday,
                                    weekNr: el.weekNumber,
                                })
                            } 
                            else if(!this.state.weekNr) {
                                this.setState({
                                    monday: el.monday,
                                    tuesday: el.tuesday,
                                    wednesday: el.wednesday,
                                    thursday: el.thursday,
                                    friday: el.friday,
                                    saturday: el.saturday,
                                    sunday: el.sunday,
                                    weekNr: el.weekNumber,
                                })
                            }
                        })
                    }
                })
            })
    }

    nextWeek = () => {
        
        if(this.state.nowNumWeek < 52) {
            this.setState({
                nowNumWeek: +this.state.nowNumWeek + 1
            }, () => {
                this.state.data.forEach(el => {
                    if(+el.weekNumber === +this.state.nowNumWeek) {
                        this.setState({
                            monday: el.monday,
                            tuesday: el.tuesday,
                            wednesday: el.wednesday,
                            thursday: el.thursday,
                            friday: el.friday,
                            saturday: el.saturday,
                            sunday: el.sunday,
                            weekNr: el.weekNumber,
                        })
                    }
                })
            })
        }
        
    }

    prevWeek = () => {
        if(this.state.nowNumWeek > 1) {
            this.setState({
                nowNumWeek: +this.state.nowNumWeek - 1
            }, () => {
                this.state.data.forEach(el => {
                    if(+el.weekNumber === +this.state.nowNumWeek) {
                        this.setState({
                            monday: el.monday,
                            tuesday: el.tuesday,
                            wednesday: el.wednesday,
                            thursday: el.thursday,
                            friday: el.friday,
                            saturday: el.saturday,
                            sunday: el.sunday,
                            weekNr: el.weekNumber,
                        })
                    }
                })
            })
        }
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
                    <div onClick={this.prevWeek} className="weekly-preview-table-prev__btn">
                        <i class="fas fa-angle-double-left"></i>
                        <span>poprzedni</span>
                    </div>
                    <div onClick={this.nextWeek} className="weekly-preview-table-next__btn">
                        <span>nastepny</span>
                        <i class="fas fa-angle-double-right" ></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeeklyPreviewTable;