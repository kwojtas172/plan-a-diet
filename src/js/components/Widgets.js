import React, { Component } from 'react';
import '../../scss/_widgets.scss';

class Widgets extends Component {
    state = {
        data: [],
        name: [],
        info: true,
        warning: true,
        success: true,
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/recipes/")
            .then(response => response.json())
            .then(data => {
                data.forEach(el =>
                    this.setState({
                        name: el.name,
                    }))
                this.setState({
                    data: data,
                })
                console.log(this.state.data);

            })
    };

    deleteInfoMessage = () => {
        this.setState({
            info: false
        })
    };

    deleteWarningMessage = () => {
        this.setState({
            warning: false
        })
    };

    deleteSuccessMessage = () => {
        this.setState({
            success: false
        })
    };

    render() {
        return (
            <div className="widget__container" >
                {
                    this.state.info && <div className="info__widget ">
                        <div><i class="fas fa-info-circle" style={{ fontSize: "40px", marginLeft: "10px" }}></i></div>
                        <p>Masz juz {this.state.data.length} przepisow, niezle!</p>
                        <button onClick={() => this.deleteInfoMessage()}><i class="fas fa-times"></i></button>
                    </div>
                }
                {this.state.warning && <div className="warning__widget ">
                    <div><i class="fa fa-exclamation-circle" style={{ fontSize: "40px", marginLeft: "10px" }}></i></div>
                    <p>Pamietaj, aby dodac plan!</p>
                    <button onClick={() => this.deleteWarningMessage()}><i class="fas fa-times"></i></button>
                </div>
                }
                {
                    this.state.success && <div className="success__widget ">
                        <div><i class="fas fa-check-circle" style={{ fontSize: "40px", marginLeft: "10px" }}></i></div>
                        <p>Świetnie że jesteś! Udanego planowania i smaczego! {":)"}</p>
                        <button onClick={() => this.deleteSuccessMessage()}><i class="fas fa-times"></i></button>
                    </div>
                }
            </div >
        );
    }
}
export default Widgets;