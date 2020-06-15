import React from "react";
import {HashRouter as Router, Link} from "react-router-dom";

export default class Header extends React.Component {
    render() {
        return (
            <Router>
                <header className="header">
                    <h1 className="logo">Zaplanuj <span>jedzonko</span></h1>
                    <nav className= "header__nav">
                        <ul className="header__nav__list">
                            <li className="header__nav__list__el header__nav__list__el-app">
                                <Link to="/app">Zaplanuj posiłki!</Link>
                            </li>
                            <li className="header__nav__list__el">
                                <a href="#dlaczegowarto">Dlaczego warto?</a>
                            </li>
                            <li className="header__nav__list__el">
                                <a href="#omnie">O mnie</a>
                            </li>
                            <li className="header__nav__list__el">
                                <a href="#kontakt">Kontakt</a>
                            </li>
                        </ul>
                    </nav>
                </header>
            </Router>
        )
    }
}