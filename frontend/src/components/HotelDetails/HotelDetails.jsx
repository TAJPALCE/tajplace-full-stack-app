import React from 'react';
import './HotelDetails.css';
import aboutone from '../../img/aboutone.jpg';
import abouttwo from '../../img/abouttwo.jpg';
import Title from 'react-vanilla-tilt';
import { Link } from 'react-router-dom';

const HotelDetails = () => {
    return (
        <div className="hotelDetails container mt-5 pt-4">
            <div className="hdContainer">
                <div className="row">
                    <div className="col-md-6">
                        <div className="col-left">
                            <div className="d-flex justify-content-center align-items-start flex-column">
                                <h3 className="hd-title">HOTEL BOKING SINCE 1992</h3>
                                <span className="hd-title-two">High quality accommodation services</span>
                            </div>

                            <p className="hd-para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quia incidunt tempora expedita et quo pariatur odit quidem, asperiores ab? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illum amet aperiam reprehenderit repellat quis eius alias asperiores repudiandae adipisci Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad, architecto Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo, animi.</p>
                            <Link to="/aboutbook" className="link">
                                <button className="btn-hd-details">More Details <i className="fa-solid fa-chevron-right hd-icon"></i></button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="col-right">
                            <div className="titl-container">
                                <Title options={{ scale: 2, max: 65, }} style={{ backgroundColor: "white" }}>
                                    <div className="d-flex hd-box">
                                        <img src={aboutone} alt="" className="col-right-img" />
                                        <img src={abouttwo} alt="" className="col-right-img-two" />
                                    </div>
                                </Title>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HotelDetails