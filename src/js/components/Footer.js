import React from "react";

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer__info">
                    <div className="footer__info__col footer__info__col-1">
                        <h2 className="footer__info__col__title">Lorem ipsum dolor</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat. Donec placerat nisl magna.</p>
                    </div>
                    <div className="footer__info__col footer__info__col-2">
                        <h2 className="footer__info__col__title">Lorem ipsum dolor</h2>
                        <ul>
                            <li>consectetur adipiscing elit</li>
                            <li>sed do eiusmod tempor</li>
                            <li>incididunt ut labore</li>
                            <li>et dolore magna aliqua</li>
                        </ul>
                    </div>
                    <div className="footer__info__col footer__info__col-3">
                        <h2 className="footer__info__col__title">Lorem ipsum dolor</h2>
                        <form className="footer__info__col__form">
                            <input className="footer__info__col__form__input"></input>
                            <button className="footer__info__col__form__btn">Lorem</button>
                        </form>
                        <div className="footer__info__col__icons">
                            <i class="fab fa-facebook-square fa-2x"></i>
                            <i class="fab fa-twitter-square fa-2x"></i>
                            <i class="fab fa-instagram fa-2x"></i>
                        </div>
                    </div>
                </div>
                <div className="footer__rights">
                    <p>Copyright <span>Zaplanujjedzonko.pl</span></p>
                </div>
            </footer>
        )
    }
}