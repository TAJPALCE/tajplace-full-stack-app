import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Card } from "@material-ui/core";
function StripePayment({ finalPrice }) {
  const [stripePromise, setStripePromise] = useState(null);
  const [message, setMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  let user = JSON.parse(localStorage.getItem("user"));
  const totaldays = localStorage.getItem("numberOfDays");
  const roomQuantity = localStorage.getItem("totalRooms");
  let totalAmountforBackend = JSON.parse(localStorage.getItem("totalAmount"));
  let totalAmount = parseFloat(totalAmountforBackend);
  let selectedRooms = localStorage.getItem("selectedRooms");
  const storedDates = JSON.parse(localStorage.getItem("selectedDates"));
  let breakfast = localStorage.getItem("breakfast");
  let lunch = localStorage.getItem("lunch");
  let dinner = localStorage.getItem("dinner");
  let mineral = localStorage.getItem("mineral");
  let heater = localStorage.getItem("heater");
  let ac = localStorage.getItem("ac");
  let foam = localStorage.getItem("foam");
  let foamQuantity = localStorage.getItem("foamQuantity");
  useEffect(() => {
    fetch("http://localhost:5000/order/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        debugger;
        if (
          selectedRooms !== undefined &&
          selectedRooms !== null &&
          storedDates &&
          totalAmount !== null &&
          totalAmount !== undefined
        ) {
          const response = await axios.post(`http://localhost:5000/order/add`, {
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
            breakfast,
            lunch,
            dinner,
            mineral,
            heater,
            ac,
            foam,
            foamQuantity,
          });
          const { clientSecret } = response.data;
          setClientSecret(clientSecret);
        }
      } catch (error) {
        setMessage(error.response.data.errMsg);
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Card className="p-5 mt-4">
        <h1>React Stripe and the Payment Element</h1>
        <h3> {message}</h3>
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm totalAmount={totalAmount} />
          </Elements>
        )}
      </Card>
    </>
  );
}

export default StripePayment;
