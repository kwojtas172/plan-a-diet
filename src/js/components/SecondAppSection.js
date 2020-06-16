import React from "react";
import AddRecipe from "./AddRecipe";
import AddSchedule from "./AddSchedule";

export default class SecondAppSection extends React.Component {
    render() {
        return(
            <div className="second-app-section">
                <AddRecipe />
                <AddSchedule />
            </div>
        )
    }
}