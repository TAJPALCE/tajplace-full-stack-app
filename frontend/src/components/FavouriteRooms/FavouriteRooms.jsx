import React from 'react';
import rooOnejpg from '../../img/rooOnejpg.jpg';
import one from '../../img/singleOne.jpg';
import two from '../../img/singleTwo.jpg';
import three from '../../img/singleThree.jpg';
import four from '../../img/singleFour.jpg';
import './FavouriteRooms.css';

const FavouriteRooms = () => {
    return (
        <div className="favouriteRooms container mt-5" data-aos="fade-up">
            <div className="fvroom">
                <div className="row">
                    <div className="col-md-5">
                        <div className="col-left-fvrt">
                            <img src={rooOnejpg} alt="" className="fvrtImg" />
                            <div className="col-left-text">
                                <p className="fvrt-para">Deluxe Room</p>
                                <p className="fvrt-text">$112 / night</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="fvrt-right">
                            <div className="fvt-right-img">
                                <img src={one} alt="" className="rightimg" />
                                <div className="fvrt-right-text">
                                    <h5>single room</h5>
                                    <p>$945 / night</p>
                                </div>
                            </div>

                            <div className="fvt-right-img">
                                <img src={two} alt="" className="rightimg" />
                                <div className="fvrt-right-text">
                                    <h5>family room</h5>
                                    <p>$600 / night</p>
                                </div>
                            </div>

                            <div className="fvt-right-img">
                                <img src={three} alt="" className="rightimg" />
                                <div className="fvrt-right-text">
                                    <h5>king room</h5>
                                    <p>$1245 / night</p>
                                </div>
                            </div>

                            <div className="fvt-right-img">
                                <img src={four} alt="" className="rightimg" />
                                <div className="fvrt-right-text">
                                    <h5>Honeymoon room</h5>
                                    <p>$950 / night</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavouriteRooms