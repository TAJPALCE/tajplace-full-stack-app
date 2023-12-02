import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-md-5">
            <div className="fottCol-left">
              <h4 className="fott-left-title">About Hotel</h4>
              <p className="fott-left-para">Welcome to the best five-star deluxe hotel in New York. Hotel elementum sesue the aucan vestibulum aliquam justo in sapien rutrum volutpat.</p>
              <button className="fottbtn">English <i className="fa-solid fa-globe language"></i></button>
            </div>
          </div>
          <div className="col-md-7">
            <div className="rightContainer">
              <div className="explore">
                <h4 className="fott-left-title">Explore</h4>
                <ul className="ul">
                  <li className="li">Home</li>
                  <li className="li">Rooms & Suits</li>
                  <li className="li">Resturant</li>
                  <li className="li">All destinations</li>
                  <li className="li">Villas</li>
                  <li className="li">Guest houses</li>
                </ul>
              </div>
              <div className="contact">
                <h4 className="fott-left-title">Contact</h4>
                <p className="fott-left-para">HQ. <i className="fa-solid fa-right-long"></i> Dhaka - Golshan 1011, Bangladesh</p>
                <div className="phn">
                  <p className="phn-num"><i className="fa-solid fa-phone"></i> 0186111111111</p>
                  <p className="phn-num"><i className="fa-solid fa-envelope env"></i>hotelBookingn@gmail.com</p>
                  <div className="d-flex text-white">
                    <i className="fa-brands fa-instagram text-white fs-3"></i>
                    <i className="fa-brands fa-twitter text-white ms-3 fs-3"></i>
                    <i className="fa-brands fa-youtube text-white ms-3 fs-3"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <small className="copy-contianer text-white">© Copyright 2022 by <span className="text-white">Taj Hotel.</span></small>
      </div>
    </div>
  );
};

export default Footer;
