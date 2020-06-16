import React, { Component } from 'react';
import image from "../../images/about-author.jpg";

export default class AboutAuthor extends Component {
    render() {
        return (
            <section className="about-author">
                <img src={image} className="about-author__img" alt="author" />
                <div className="about-author__wrapper">
                    <h3 className="about-author__title">
                        Lorem ipsum dolor sit amet
                    </h3>
                    <p className="about-author__txt">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere urna nec tincidunt praesent. Amet aliquam id diam maecenas ultricies mi eget. Varius morbi enim nunc faucibus. Ipsum suspendisse ultrices gravida dictum fusce. Arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales. Velit scelerisque in dictum non. At lectus urna duis convallis convallis tellus id. Dui accumsan sit amet nulla facilisi morbi tempus iaculis urna. Vitae justo eget magna fermentum.

                    <br></br>
                    <br></br>

                        Sodales neque sodales ut etiam sit amet nisl purus. Arcu ac tortor dignissim convallis aenean. Volutpat blandit aliquam etiam erat velit scelerisque. Venenatis cras sed felis eget velit aliquet sagittis. Commodo sed egestas egestas fringilla phasellus faucibus. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget. Tellus mauris a diam maecenas sed. Viverra ipsum nunc aliquet bibendum enim facilisis. Lectus urna duis convallis convallis. Id interdum velit laoreet id donec ultrices tincidunt arcu. Vitae et leo duis ut. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Et netus et malesuada fames. Tortor posuere ac ut consequat semper viverra. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Egestas integer eget aliquet nibh praesent.
                    </p>
                </div>
            </section>
        )
    }
}
