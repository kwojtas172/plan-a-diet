import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default class LandingPage extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Header />
                <Footer />
            </div>
        )
    }
}