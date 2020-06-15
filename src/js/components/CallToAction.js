import React, { Component } from 'react';
import '../../scss/_call-to-action.scss';

class CallToAction extends Component {
    state = {}
    render() {
        return (
            <div className="call-to-action__container">
                <div>
                    <h3>Lorem ipsum dolor sit amet.</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tempore exercitationem, explicabo natus debitis hic quaerat? Quidem, magni. Obcaecati, harum.</p>
                </div>
                <div>
                    <button>Lorem ipsum</button>
                </div>
            </div>
        );
    }
}

export default CallToAction;