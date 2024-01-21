import React, { useEffect, useState } from "react";
// import "./Reviews.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";

const SliderMedia = () => {
  const [mediaData, setMediaData] = useState([]);

  const fetchMediaData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/innerHotel/addfile"
      );
      console.log(response.data);
      setMediaData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMediaData();
  }, []);

  const options = {
    loop: true,
    center: true,
    items: 3,
    margin: 0,
    autoplay: true,
    margin: 20,
    border: "2px solid black",
    borderRadius: "8rem",
    dots: false,
    autoplayTimeout: 3500,
    smartSpeed: 450,
    nav: false,
    responsive: {
      0: { items: 1 },
      600: { items: 5 },
      1000: { items: 5 },
    },
  };
  return (
    <div>
      <section className="testimonial-section">
        <div className="container testimonial-container">
          <h5 data-aos="fade-up" className="title">
            <span className="">Hotel Gallery</span>
          </h5>

          <div className="row">
            {mediaData.length ? (
              <div className="col-md-12">
                <OwlCarousel
                  id="customer-testimonial"
                  className="owl-slide"
                  {...options}
                >
                  {mediaData.map((el) =>
                    el.caseImage.map((image) => (
                      <div key={image.public_id}>
                        <img
                          src={image.url}
                          alt="Media"
                          className="d-block"
                          width={50}
                          height={300}
                        />
                      </div>
                    ))
                  )}
                </OwlCarousel>
              </div>
            ) : (
              <div className="col-md-12">
                <h1>Loading...</h1>
              </div>
            )}
          </div>
          {/* owl-carousel */}
        </div>
      </section>
    </div>
  );
};

export default SliderMedia;
