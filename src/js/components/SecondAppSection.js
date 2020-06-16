import React from "react";
import AddRecipe from "./AddRecipe";
import AddSchedule from "./AddSchedule";
import Widgets from "./Widgets";

export default class SecondAppSection extends React.Component {
    render() {
        return(
            <div className="second-app-section">
                <AddRecipe />
                <AddSchedule />
                <Widgets />
            </div>
        )
    }
}