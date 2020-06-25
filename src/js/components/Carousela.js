import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class Carousela extends Component {
    state = {}
    render() {
        return (

            <section className="carousel__container">
                <div className="wrapper">
                    <Carousel showThumbs={false} infiniteLoop>
                        <div className="carousel__slide">
                            <h2>Lorem ipsum dolor sit amet</h2>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe, illo rerum quam placeat aperiam et sint blanditiis nulla, doloremque nesciunt, illum dolor architecto voluptas non quod tempora. Omnis vero doloremque similique corporis sed, ipsa fuga ducimus quaerat cumque et numquam? Consectetur, cum aut omnis autem accusamus minima suscipit? Nulla, excepturi!</p>
                        </div>
                        <div className="carousel__slide">
                            <h2>Lorem ipsum dolor sit amet</h2>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe, illo rerum quam placeat aperiam et sint blanditiis nulla, doloremque nesciunt, illum dolor architecto voluptas non quod tempora. Omnis vero doloremque similique corporis sed, ipsa fuga ducimus quaerat cumque et numquam? Consectetur, cum aut omnis autem accusamus minima suscipit? Nulla, excepturi!</p>
                        </div>
                        <div className="carousel__slide">
                            <h2>Lorem ipsum dolor sit amet</h2>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe, illo rerum quam placeat aperiam et sint blanditiis nulla, doloremque nesciunt, illum dolor architecto voluptas non quod tempora. Omnis vero doloremque similique corporis sed, ipsa fuga ducimus quaerat cumque et numquam? Consectetur, cum aut omnis autem accusamus minima suscipit? Nulla, excepturi!</p>
                        </div>
                    </Carousel>
                </div>
            </section>
        );
    }
}
export default Carousela;