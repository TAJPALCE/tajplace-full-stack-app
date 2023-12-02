import React from 'react'
import FavouriteRooms from '../../components/FavouriteRooms/FavouriteRooms';
import Featured from '../../components/Featured/Featured';
import FeaturedProperties from '../../components/featuredProperties/featuredProperties';
import Footer from '../../components/Footer/Footer';
import HeadeMain from '../../components/HeadeMain/HeadeMain';
import HotelDetails from '../../components/HotelDetails/HotelDetails';
import MailList from '../../components/mailList/mailList';
import PropertyList from '../../components/propertyList/propertyList';
import AllReviews from '../../components/Reviews/AllReviews';
import Services from '../../components/Services/Services';
import Articles from '../Articles/Articles';
import './Home.css';

const Home = () => {
  return (
    <div>
      <HeadeMain />
      <HotelDetails />
      {/* <h3 className="homeTitle container mt-5  pt-4 text-center" data-aos="fade-left">Featured Property List</h3> */}
      <h3 className="homeTitle container mt-5  pt-4 text-center"data-aos="fade-up" >Featured Property List</h3>
      <Featured />
      <h3 className="homeTitle container mt-5  pt-4 text-center"data-aos="fade-down" >Browse by property type</h3>
      <PropertyList />
      <h3 className="homeTitle container mt-5  pt-4 text-center"data-aos="fade-up">Homes guests love</h3>
      <FeaturedProperties />
      <h3 className="homeTitle container mt-5  pt-4 text-center" data-aos="flip-right">our deluxe room</h3>
      <FavouriteRooms />
      <h3 className="homeTitle container mt-5  pt-4 text-center" data-aos="flip-left" >our awesome services</h3>
      <Services />
      <h3 className="homeTitle container mt-5  pt-4 text-center" data-aos="fade-up">Get inspiration for your next trip</h3>
      <Articles />
      <AllReviews />
      <MailList />
      <Footer />
    </div>
  )
}

export default Home