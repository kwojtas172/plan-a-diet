import React from "react";
import Carousela from "./Carousela";
import CallToAction from './CallToAction';

export default class LandingPage extends React.Component {
    render() {
        return (
            <>
                <div className="wrapper">
                    <Carousela />
                    <CallToAction />
                </div>
            </>
        )
    }
}