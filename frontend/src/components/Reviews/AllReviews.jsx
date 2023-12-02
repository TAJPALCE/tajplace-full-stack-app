import React, { useEffect, useState } from 'react';
import './Reviews.css';
// Carousel package //
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import axios from 'axios';
import SingleReviews from './SingleReviews';

const AllReviews = () => {
    const [data, setData] = useState([])
    // console.log(data)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/review/getReview')
                setData(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    // Owl Carousel Settings
    const options = {
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 3500,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: { items: 1 },
            600: { items: 3 },
            1000: { items: 3 }
        }
    };
    return (
        <>
            <section className="testimonial-section">
                <div className="container testimonial-container">
                    <h5 data-aos="fade-up" className="title"><span className="">All Reviews</span></h5>
                    <p className="top-description mt-2" data-aos="fade-down"><span><i className="fa-solid fa-quote-left text-warning"></i></span>  As Hotel Booking is worldwide famous and known for it's services and hospitality, know more about us in our customers reviews  <span><i className="fa-solid fa-quote-right text-warning"></i></span></p>

                    <div className="row">
                        {
                            data.length ?
                                <div className="col-md-12">
                                    <OwlCarousel id="customer-testimonial" className="owl-slide" {...options}>
                                        {data?.map((review) => <SingleReviews review={review} key={review._id} />)}
                                    </OwlCarousel>
                                </div>
                                :
                                <div className="col-md-12">
                                    <h1>Loading...</h1>
                                </div>
                        }
                    </div>
                    {/* owl-carousel */}
                </div>
            </section>

        </>
    );
};

export default AllReviews;