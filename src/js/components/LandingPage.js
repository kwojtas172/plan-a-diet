import React from "react";
import Header from "./Header";
import Carousela from "./Carousela";
import CallToAction from './CallToAction';
import AboutApp from "./AboutApp";
import FormToSubscription from "./FormToSubscription";
import AboutAuthor from "./AboutAuthor";
import Footer from "./Footer";

// import WeeklyPreviewTable from './WeeklyPreviewTable';

export default class LandingPage extends React.Component {
    render() {
        return (
         <>
                <Header />
                <Carousela />
                <CallToAction />
                <AboutApp />
                <FormToSubscription />
                <AboutAuthor />
                <Footer />
                {/* <WeeklyPreviewTable /> */}
         </>
        )
    }
}