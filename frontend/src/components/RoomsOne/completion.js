import React, { useEffect, useState } from "react";
import GlobalNav from "../GlobalNav/GlobalNav";
import Footer from "../Footer/Footer";
import { Card } from "@material-ui/core";
import axios from "axios";
import { useParams } from "react-router-dom";

const Completion = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  const totaldays = localStorage.getItem("numberOfDays");
  const roomQuantity = localStorage.getItem("totalRooms");
  let totalAmountforBackend = JSON.parse(localStorage.getItem("totalAmount"));
  let totalAmount = parseFloat(totalAmountforBackend);
  let selectedRooms = localStorage.getItem("selectedRooms");
  const storedDates = JSON.parse(localStorage.getItem("selectedDates"));
  const [apiCalled, setApiCalled] = useState(false);
  let breakfast = localStorage.getItem("breakfast");
  let lunch = localStorage.getItem("lunch");
  let dinner = localStorage.getItem("dinner");
  let mineral = localStorage.getItem("mineral");
  let heater = localStorage.getItem("heater");
  let ac = localStorage.getItem("ac");
  let foam = localStorage.getItem("foam");
  let foamQuantity = localStorage.getItem("foamQuantity");
  const apiCallMade = localStorage.getItem("apiCallMade");

  //   let paymentIntentId = localStorage.getItem("paymentIntentId");
  useEffect(() => {
    const queryParam = new URLSearchParams(window.location.search);
    const paymentIntent = queryParam.get("payment_intent");
    console.log("Payment Intent:", paymentIntent);
    const fetchData = async () => {
      try {
        if (
          !apiCalled &&
          selectedRooms !== undefined &&
          selectedRooms !== null &&
          storedDates &&
          totalAmount !== null &&
          totalAmount !== undefined
        ) {
          setApiCalled(true);
          localStorage.setItem("apiCallMade", "true");
          const response = await axios.post(
            `http://localhost:5000/order/confirm-payment`,
            {
              roomQuantity: parseFloat(roomQuantity),
              userid: user._id,
              fromdate: new Date(storedDates[0]?.startDate),
              todate: new Date(storedDates[0]?.endDate),
              totalAmount: parseFloat(totalAmount),
              totaldays: parseFloat(totaldays),
              userName: user.username,
              userEmail: user.email,
              bookingStatus: true,
              selectedRooms,
              paymentIntentId: paymentIntent,
              breakfast,
              lunch,
              dinner,
              mineral,
              heater,
              ac,
              foam,
              foamQuantity,
            }
          );
          console.log(response, "here is api response");
          //   const { clientSecret } = response.data;
          //   setClientSecret(clientSecret);
        }
      } catch (error) {
        console.error("here is Error:", error);
      }
    };

    const apiCallMade = localStorage.getItem("apiCallMade");

    if (!apiCallMade) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", removeLocalStorage);
    return () => {
      window.addEventListener("beforeunload", removeLocalStorage);
    };
  }, [apiCallMade]);

  const removeLocalStorage = () => {
    if (apiCallMade) {
      localStorage.removeItem("apiCallMade");
    }
  };

  return (
    <div>
      <GlobalNav />
      <div className="mt-5">
        <Card className="p-5 text-center">
          <h1>Congratulations</h1>
          <h6>
            <b>Payment Successfully : </b>Our hotel manager will call you before
            the arrvial day
          </h6>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Completion;
