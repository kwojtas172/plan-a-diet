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

                data.sort((a, b) => +a.weekNumber - +b.weekNumber)
                .forEach(el => {
                    if(+el.weekNumber === +this.state.nowNumWeek) {
                        console.log("pierwszy")
                        this.setState({
                            monday: el.monday,
                            tuesday: el.tuesday,
                            wednesday: el.wednesday,
                            thursday: el.thursday,
                            friday: el.friday,
                            saturday: el.saturday,
                            sunday: el.sunday,
                            weekNr: el.weekNumber,
                            nowNumWeek: el.weekNumber
                        })
                    } else if(!this.state.weekNr) {
                        console.log("brak aktualnego", this.state.nowNumWeek, +el.weekNumber)
                         
                            console.log("drugi", data)
                            data.forEach(el => {
                                if((this.state.nowNumWeek < +el.weekNumber) && !this.state.weekNr)
                                {this.setState({
                                    monday: el.monday,
                                    tuesday: el.tuesday,
                                    wednesday: el.wednesday,
                                    thursday: el.thursday,
                                    friday: el.friday,
                                    saturday: el.saturday,
                                    sunday: el.sunday,
                                    weekNr: el.weekNumber,
                                    nowNumWeek: el.weekNumber
                                })}
                            })
    
                        
                    } else if (!this.state.weekNr) {
                        console.log("trzeci")
                        this.setState({
                            monday: el.monday,
                            tuesday: el.tuesday,
                            wednesday: el.wednesday,
                            thursday: el.thursday,
                            friday: el.friday,
                            saturday: el.saturday,
                            sunday: el.sunday,
                            weekNr: el.weekNumber,
                            nowNumWeek: el.weekNumber
                        })
                    }
                })
            })
    }

    nextWeek = () => {
        
        if(+this.state.nowNumWeek < 52) {
            const tempArr = this.state.data;
            tempArr.sort((a, b) => +a.weekNumber - +b.weekNumber);
            let prevEl;
            tempArr.forEach(el => {
                if(+el.weekNumber === +this.state.nowNumWeek) {
                    prevEl = el
                }
            })
            const indexPrevEl = tempArr.indexOf(prevEl);

            this.setState({
                nowNumWeek: indexPrevEl < tempArr.length - 1 ? tempArr[indexPrevEl + 1].weekNumber : tempArr[0].weekNumber
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
            const tempArr = this.state.data;
            tempArr.sort((a, b) => +a.weekNumber - +b.weekNumber);
            let nextEl;
            tempArr.forEach(el => {
                if(+el.weekNumber === +this.state.nowNumWeek) {
                    nextEl = el
                }
            })
            const indexNextEl = tempArr.indexOf(nextEl);
            this.setState({
                nowNumWeek: indexNextEl > 0 ? tempArr[indexNextEl - 1].weekNumber : tempArr[tempArr.length - 1].weekNumber 
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
                    <p>Twój plan na {weekNr} tydzień :</p>
                </div>
                <div className="day__name">
                    <span>Poniedziałek</span>
                    <span>Wtorek</span>
                    <span>Środa</span>
                    <span>Czwartek</span>
                    <span>Piątek</span>
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