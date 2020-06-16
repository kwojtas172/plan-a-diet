import React, { Component } from 'react';
import '../../scss/_widgets.scss';

class Widgets extends Component {
    state = {}
    render() {
        return (
            <div className="widget__container">
                <div className="info__widget ">
                    <div><i class="fas fa-info-circle" style={{ fontSize: "40px", marginLeft: "10px" }}></i></div>
                    <p>Masz juz 99 przepisow, niezle!</p>
                    <button><i class="fas fa-times"></i></button>
                </div>
                <div className="warning__widget ">
                    <div><i class="fa fa-exclamation-circle" style={{ fontSize: "40px", marginLeft: "10px" }}></i></div>
                    <p>Pamietaj, aby dodac plan!</p>
                    <button><i class="fas fa-times"></i></button>
                </div>
                <div className="success__widget ">
                    <div><i class="fas fa-check-circle" style={{ fontSize: "40px", marginLeft: "10px" }}></i></div>
                    <p>Świetnie że jesteś! Udanego planowania i smaczego! {":)"}</p>
                    <button><i class="fas fa-times"></i></button>
                </div>
            </div>
        );
    }
}
export default Widgets;