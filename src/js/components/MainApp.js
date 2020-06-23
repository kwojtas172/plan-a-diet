import React, { Component } from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    NavLink as Link
} from "react-router-dom";
import AppMainSection from "./AppMainSection";
import RecipesList from './RecipesList';
import PlanList from './PlanList';

export default class MainApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Imię",
            isUser: false
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/user/")
            .then(res => res.json())
            .then(data => {
                if (data.name) {
                    this.setState({
                        name: data.name,
                        isUser: true
                    })
                }
            })
    }

    addName = name => {
        this.setState({
            name: name,
            isUser: true
        })
    }

    render() {
        return (
            <div className="wrapper app">
                <Router>
                    <header className="header header-app">
                        <h1 className="logo">Zaplanuj <span>jedzonko</span></h1>
                        <div className="header-app__wrapper">
                            <span className="header-app__wrapper__name">{this.state.name}</span>
                            <i className="fas fa-user-circle"></i>
                        </div>
                    </header>
                    <div className="app-side">
                        <nav className="app-side__nav">
                            <ul className="app-side__nav__list">
                                <li><Link exact to="/app/" activeClassName="active-link">Przegląd</Link></li>
                                <li><Link to="/app/recipes" activeClassName="active-link">Przepisy</Link></li>
                                <li><Link to="/app/schedules" activeClassName="active-link">Plany</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="app-content">
                        <Switch>
                            <Route exact path="/app/" component={() => <AppMainSection addName={this.addName} isUser={this.state.isUser} />} />
                            <Route path="/app/recipes" component={RecipesList} />
                            <Route path="/app/schedules" component={PlanList} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}
