import React from "react";
import Carousela from "./Carousela";
import CallToAction from './CallToAction';
import AboutApp from "./AboutApp";
import FormToSubscription from "./FormToSubscription";
import AboutAuthor from "./AboutAuthor";

export default class LandingPage extends React.Component {
    render() {
        return (
                <div className="wrapper">
                    <Carousela />
                    <CallToAction />
                    <AboutApp />
                    <FormToSubscription />
                    <AboutAuthor />
                </div>
        )
    }
}