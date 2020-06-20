import React from "react";
import AddRecipe from "./AddRecipe";
import AddSchedule from "./AddSchedule";
import Widgets from "./Widgets";
import WeeklyPreviewSection from "./WeeklyPreviewTable"

export default class SecondAppSection extends React.Component {
    render() {
        return (
            <div className="second-app-section">
                <div className="flex-div">
                    <AddRecipe />
                    <AddSchedule />
                    <Widgets />
                </div>
                <WeeklyPreviewSection />
            </div>
        )
    }
}