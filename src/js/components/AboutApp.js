import React, { Component } from 'react';
import image1 from "../../images/about-app-1.jpg";
import image2 from "../../images/about-app-2.jpg";
import image3 from "../../images/about-app-3.jpg";

export default class AboutApp extends Component {
    render() {
        return (
            <section className="about-app">
                <article className="about-app__art">
                    <img className="about-app__art__img" src={image1} alt="water" />
                    <h3 className="about-app__art__title">Lorem ipsum dolor sit amet</h3>
                    <p className="about-app__art__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo urna molestie at elementum eu facilisis sed. Lorem dolor sed viverra ipsum nunc. Eu scelerisque felis imperdiet proin fermentum leo. Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Mus mauris vitae ultricies leo integer malesuada.</p>
                </article>
                <article className="about-app__art">
                    <img className="about-app__art__img" src={image2} alt="vegetables"/>
                    <h3 className="about-app__art__title">Lorem ipsum dolor sit amet</h3>
                    <p className="about-app__art__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo urna molestie at elementum eu facilisis sed. Lorem dolor sed viverra ipsum nunc. Eu scelerisque felis imperdiet proin fermentum leo. Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Mus mauris vitae ultricies leo integer malesuada.</p>
                </article>
                <article className="about-app__art">
                    <img className="about-app__art__img" src={image3} alt="knife" />
                    <h3 className="about-app__art__title">Lorem ipsum dolor sit amet</h3>
                    <p className="about-app__art__txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo urna molestie at elementum eu facilisis sed. Lorem dolor sed viverra ipsum nunc. Eu scelerisque felis imperdiet proin fermentum leo. Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Mus mauris vitae ultricies leo integer malesuada.</p>
                </article>
            </section>
        )
    }
}
