import React from 'react';
import './About.css';
import about from '../../img/about.gif';
import abt from '../../img/abtright.png';
import review from '../../img/review.png';
import alrt from '../../img/alert.jpg';
import Title from 'react-vanilla-tilt';
import GlobalNav from '../../components/GlobalNav/GlobalNav';
import value1 from '../../img/value1.png';
import value2 from '../../img/value2.png';
import value3 from '../../img/value3.png';
import value4 from '../../img/value4.png';
import value5 from '../../img/value5.png';
import value6 from '../../img/value6.png';
import Footer from '../../components/Footer/Footer';

const About = () => {
    return (
        <>
            <GlobalNav />
            <div className="about">
                <div className="about__gif">
                    <img src={about} alt="about-gif" className="gif" />
                </div>
                <div className="about__us container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="abtCol__left">
                                <h3 className="fw-600">About Us</h3>
                                <p className="text-secondary">At Hotel Booking.com is all about the journey, helping you explore new challenges in a place where you can be your best self. With plenty of exciting twists, turns and opportunities along the way. We’ve always been pioneers, on a mission to shape the future of travel through cutting edge technology, to make it easier for everyone to enjoy amazing experiences wherever they go. Under a desert sky, or in the heart of a bustling city. Discovering the perfect hideaway, or the perfect paella.
                                    That’s why we’re always looking for people who search for better solutions, the ones eager to stray off the beaten path to find new ways of doing things. Because at Hotel Booking.com it’s more than a job, it’s a journey.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="abtCol__right">
                                <Title options={{ scale: 2, max: 65, }} style={{ backgroundColor: "white" }}>
                                    <img src={abt} alt="" className="abtColrgt__img" />
                                </Title>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="abtCom__review">
                    <Title options={{ scale: 1, max: 55, }} style={{ backgroundColor: "white" }}>
                        <img src={alrt} alt="" className="abtAlrt__img" />
                        <div className="abt__overlay">
                            <img src={review} alt="" className="com__rv" />
                            <span className="abt__overlayText">We foster a culture of inclusion and collaboration and we are proud to have it recognised by employee review platform Comparably Visit Comparably to find out what our colleagues think about life at Hotel Booking.com</span>
                        </div>
                    </Title>
                </div>
                <div className="abt__Values">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="abtVlue__left">
                                    <h3 className="fw-600">Our Values</h3>
                                    <span className="text-secondary abt__text">At Hotel Booking.com, we are all involved in making hundreds of decisions every day. The decisions we make are a reflection of our Values –  they reflect what is important to us, both as individuals and as an organization. </span>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-4">
                                        <img src={value1} alt="" className="abtValues__img" />
                                    </div>
                                    <div className="col-md-4">
                                        <img src={value2} alt="" className="abtValues__img" />
                                    </div>
                                    <div className="col-md-4">
                                        <img src={value3} alt="" className="abtValues__img" />
                                    </div>
                                    <div className="col-md-4">
                                        <img src={value4} alt="" className="abtValues__img" />
                                    </div>
                                    <div className="col-md-4">
                                        <img src={value5} alt="" className="abtValues__img" />
                                    </div>
                                    <div className="col-md-4">
                                        <img src={value6} alt="" className="abtValues__img" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
            <Footer/>
        </>
    )
}

export default About