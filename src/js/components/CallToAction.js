import React, { Component } from 'react';
import {Link} from "react-router-dom";

class CallToAction extends Component {
    state = {}
    render() {
        return (
            <section className="call-to-action__container">
                <div className="wrapper">
                    <div className="call-to-action__container__col call-to-action__container__col-1">
                        <h3>Lorem ipsum dolor sit amet.</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tempore exercitationem, explicabo natus debitis hic quaerat? Quidem, magni. Obcaecati, harum.</p>
                    </div>
                    <div className="call-to-action__container__col call-to-action__container__col-2">
                        <Link to="/app">Lorem ipsum</Link>
                    </div>
                </div>
            </section>
        );
    }
}

export default CallToAction;