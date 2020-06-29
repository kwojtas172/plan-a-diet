import React from "react";
import AddRecipe from "./AddRecipe";
import AddSchedule from "./AddSchedule";
import Widgets from "./Widgets";
import WeeklyPreviewSection from "./WeeklyPreviewTable"

export default class SecondAppSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    

    componentDidMount = () => {
        fetch("http://localhost:3000/recipes/")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    data: data
                })
            })
    };

    handleChange = () => {
        fetch("http://localhost:3000/recipes/")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    data: data
                })
            })
    }

    render() {
        return (
            <div className="second-app-section">
                <div className="flex-div">
                    <AddRecipe change={this.handleChange} />
                    <AddSchedule />
                    <Widgets length={this.state.data.length} />
                </div>
                <WeeklyPreviewSection />
            </div>
        )
    }
}