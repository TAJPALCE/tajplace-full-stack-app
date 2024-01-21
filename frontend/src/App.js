import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import AddArticles from "./Dashboard/AddArticles/AddArticles";
import ArticleLists from "./Dashboard/AddArticles/ArticleLists";
import AddHotel from "./Dashboard/AddHotel/AddHotel";
import Hotelsadd from "./Dashboard/AddHotel/Hotelsadd";
import AddAdmin from "./Dashboard/Admin/AddAdmin";
import Admin from "./Dashboard/Admin/Admin";
import DashHome from "./Dashboard/DashHome/DashHome";
import HotelRoom from "./Dashboard/NewRoom/HotelRoom";
import NewRoom from "./Dashboard/NewRoom/NewRoom";
// import NewRoom from './Dashboard/NewRoom/NewRoom';
import Review from "./Dashboard/Review/Review";
import ReviewManage from "./Dashboard/ReviewManage/ReviewManage";
import SingleHotelView from "./Dashboard/SingleHotelView/SingleHotelView";
import SingleUserView from "./Dashboard/SingleUserView/SingleUserView";
import SingleRoomView from "./Dashboard/SingleRoomView/SingleRoomView";
import Single from "./Pages/Articles/Single";
import Home from "./Pages/Home/Home";
import Hotels from "./Pages/Hotels/Hotels";
import List from "./Pages/List/List";
import Login from "./Pages/Login/Login.jsx";
import Signup from "./Pages/Signup/Signup";
import Booked from "./Dashboard/Booked/Booked";
import SingleBookedView from "./Dashboard/SingleBookedView/SingleBookedView";
import AddReview from "./Dashboard/Review/AddReview";
import About from "./Pages/About/About";
import GotoTop from "./components/GotoTop/GotoTop";
import Contactus from "./Pages/Contactus/Contactus";
import AllBookings from "./Dashboard/AllBookings/AllBookings";
import Rooms from "./components/RoomsOne/RoomsOne";
import ExtraServices from "./Dashboard/NewRoom/ExtraServices/ExtraServices.js";
import BookingModal from "./components/Booking/BookingModal.js";
import InnerHotelPhotos from "./Dashboard/NewRoom/InnerHotelPhotos/InnerHotelPhotos.js";
import PaymentMethod from "./components/Booking/paymentMethod.js";
import StripePayment from "./components/RoomsOne/stripPayment.js";
import Completion from "./components/RoomsOne/completion.js";
const App = () => {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const { token } = useContext(AuthContext);

  // useEffect(() => {
  //   window.addEventListener("beforeunload", removeLocalStorage);
  //   return () => {
  //     window.addEventListener("beforeunload", removeLocalStorage);
  //   };
  // }, []);

  // const removeLocalStorage = () => {
  //   localStorage.removeItem("selectedRooms");
  //   localStorage.removeItem("selectedDates");
  //   localStorage.removeItem("totalPrice");
  //   localStorage.removeItem("totalRooms");
  //   localStorage.removeItem("totalGuests");
  //   localStorage.removeItem("numberOfDays");
  // };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/completion" element={<Completion />} />
          <Route path="/extraService/:id" element={<BookingModal />} />
          <Route path="/allroom" element={<List />} />
          <Route path="/aboutbook" element={<About />} />
          <Route path="/hotels/:id" element={<Hotels />} />
          <Route path="/rooms/:id" element={<Rooms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/read/:id" element={<Single />} />
          <Route path="/StripePayment" element={<StripePayment />} />
          <Route
            path="/dashboard/home"
            element={
              <ProtectedRoute>
                <DashHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute>
                <Review />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addReviews"
            element={
              <ProtectedRoute>
                <AddReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/singleUsers/:id"
            element={
              <ProtectedRoute>
                <SingleUserView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booked"
            element={
              <ProtectedRoute>
                <Booked />
              </ProtectedRoute>
            }
          />
          <Route
            path="/artlists"
            element={
              <ProtectedRoute>
                <ArticleLists />
              </ProtectedRoute>
            }
          />

          <Route
            path="/innerHotelphotos"
            element={
              <ProtectedRoute>
                <InnerHotelPhotos />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addArticles"
            element={
              <ProtectedRoute>
                <AddArticles />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              token.isAdmin === true ? (
                <Admin />
              ) : (
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/addadmins"
            element={
              token.isAdmin === true ? (
                <AddAdmin />
              ) : (
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/addhotel"
            element={
              token.isAdmin === true ? (
                <AddHotel />
              ) : (
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/add"
            element={
              token.isAdmin === true ? (
                <Hotelsadd />
              ) : (
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              )
            }
          />

          <Route
            path="/addRoom"
            element={
              token.isAdmin === true ? (
                <NewRoom />
              ) : (
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/adrooms"
            element={
              token.isAdmin === true ? (
                <HotelRoom />
              ) : (
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/extraServices"
            element={
              token.isAdmin === true ? (
                <ExtraServices />
              ) : (
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/allbokings"
            element={
              token.isAdmin === true ? (
                <AllBookings />
              ) : (
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/singleHotel/:id"
            element={
              token.isAdmin === true ? (
                <SingleHotelView />
              ) : (
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/singeRoomView/:id"
            element={
              token.isAdmin === true ? (
                <SingleRoomView />
              ) : (
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/bookedRoom/:hotel"
            element={
              <ProtectedRoute>
                <SingleBookedView />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reviewmanage"
            element={
              token.isAdmin === true ? (
                <ReviewManage />
              ) : (
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              )
            }
          />
        </Routes>
      </BrowserRouter>
      <GotoTop />
    </>
  );
};

export default App;
