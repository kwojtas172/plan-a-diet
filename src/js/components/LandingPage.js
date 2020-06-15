import React from "react";
import AboutApp from "./AboutApp";
import FormToSubscription from "./FormToSubscription";
import AboutAuthor from "./AboutAuthor";

export default class LandingPage extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <AboutApp />
                <FormToSubscription />
                <AboutAuthor />
            </div>
        )
    }
}