import React from 'react';
import './SingleReviews.css';

const SingleReviews = (props) => {
    const { username, img, text } = props.review;

    return (
        <div className="item">
            <div className="shadow-effect">
                {/* <div className="">
                    <img className="Singlerev__img" src={img} alt="user-img" />
                </div> */}
                <div className="d-flex justify-content-start align-items-center">
                    <img className="top-circle" src={img} alt="reviewer" />
                    <div className="d-flex flex-column">
                        <p className="fw-bold providers">{username}</p>
                        <small className="top-text" style={{ marginTop: "-1.5em" }}>User</small>

                    </div>
                </div>
                <div className="d-flex justify-content-start">
                    <button className="sp-btn top-btn-one">Satisfied</button>
                    <button className="sp-btn top-btn-two">user verified</button>
                </div>
                <p className="Sreview__texts">{text}</p>
                <div className="">
                    <div className="fa-icon d-flex justify-content-even align-items-center">
                        <i className="fa-solid fa-star fas"></i>
                        <i className="fa-solid fa-star fas"></i>
                        <i className="fa-solid fa-star fas"></i>
                        <i className="fa-solid fa-star fas"></i>
                        <i className="fa-solid fa-star fas"></i>
                        <span className="text-muted ms-2">(30)</span>
                    </div>
                    <h6 className="mb-5 courtesy">Courtesy - <span className="sheba">Hotel Booking</span></h6>
                    {/* <hr /> */}
                    <div className="Sreviewsvg__container">
                        <svg className="Sreview__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffa400" fillOpacity="1" d="M0,224L12.6,229.3C25.3,235,51,245,76,240C101.1,235,126,213,152,170.7C176.8,128,202,64,227,53.3C252.6,43,278,85,303,133.3C328.4,181,354,235,379,261.3C404.2,288,429,288,455,240C480,192,505,96,531,96C555.8,96,581,192,606,202.7C631.6,213,657,139,682,106.7C707.4,75,733,85,758,122.7C783.2,160,808,224,834,256C858.9,288,884,288,909,261.3C934.7,235,960,181,985,176C1010.5,171,1036,213,1061,234.7C1086.3,256,1112,256,1137,218.7C1162.1,181,1187,107,1213,80C1237.9,53,1263,75,1288,106.7C1313.7,139,1339,181,1364,192C1389.5,203,1415,181,1427,170.7L1440,160L1440,320L1427.4,320C1414.7,320,1389,320,1364,320C1338.9,320,1314,320,1288,320C1263.2,320,1238,320,1213,320C1187.4,320,1162,320,1137,320C1111.6,320,1086,320,1061,320C1035.8,320,1011,320,985,320C960,320,935,320,909,320C884.2,320,859,320,834,320C808.4,320,783,320,758,320C732.6,320,707,320,682,320C656.8,320,632,320,606,320C581.1,320,556,320,531,320C505.3,320,480,320,455,320C429.5,320,404,320,379,320C353.7,320,328,320,303,320C277.9,320,253,320,227,320C202.1,320,177,320,152,320C126.3,320,101,320,76,320C50.5,320,25,320,13,320L0,320Z"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleReviews