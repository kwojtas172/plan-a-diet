import React, { Component } from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    NavLink as Link
} from "react-router-dom";

export default class MainApp extends Component {
    render() {
        return (
            <div className="wrapper app">
                <Router>
                    <header className="header header-app">
                        <h1 className="logo">Zaplanuj <span>jedzonko</span></h1>
                    </header>
                    <div className="app-side">
                        <nav className="app-side__nav">
                            <ul className="app-side__nav__list">
                                <li><Link exact to="/app/" activeClassName="active-link">Przegląd</Link></li>
                                <li><Link to="/app/receptures" activeClassName="active-link">Przepisy</Link></li>
                                <li><Link to="/app/scheduled" activeClassName="active-link">Plany</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="app-content">
                        <Switch>
                            <Route />
                            <Route />
                            <Route />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}
