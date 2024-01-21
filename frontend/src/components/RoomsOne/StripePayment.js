import { useEffect, useState } from "react";
import * as React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Button, Card, Divider, TextField, Box } from "@mui/material";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const StripeContainer = ({ finalPrice, open, setOpen }) => {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const dates = JSON.parse(localStorage.getItem("selectedDates"));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    customer_id: "",
    card_Name: "",
    card_ExpYear: "",
    card_ExpMonth: "",
    card_Number: "",
    card_CVC: "",
  });
  const fromdate = dates && dates[0].startDate;
  const todate = dates && dates[0].endDate;
  console.log(fromdate, "start");
  console.log(todate, "end");

  const selectedRooms = JSON.parse(localStorage.getItem("selectedRooms"));
  console.log(dates);
  const quantity = selectedRooms[0].quantity;
  const roomId = selectedRooms[0].roomId;

  console.log(selectedRooms);
  console.log(quantity, "quantity");
  console.log(roomId, "room id");
  const token = localStorage.getItem("token");
  const numberOfDays = localStorage.getItem("numberOfDays");
  const [resData, setResData] = useState();
  const createCustomerAndCard = async () => {
    try {
      const testToken = "tok_visa";
      const res = await axios.post(
        `http://localhost:5000/payment/create-customer`,
        {
          email: formData.email,
          name: formData.name,
        }
      );
      res.then((resolvedValue) => {
        setResData(resolvedValue?.data);
        setFormData({ ...formData, customer_id: resolvedValue?.data?.id });

        if (resolvedValue && resolvedValue?.data) {
          const cardRes = axios.post(`http://localhost:5000/payment/add-card`, {
            ...formData,
            token: testToken,
          });
          console.log(cardRes, "here is strip account");
        }
      });
    } catch (error) {
      console.log(error, "here is stripe error");
    }
  };

  console.log(resData, "here is resData");
  console.log(formData, "here is form Data");
  return (
    <div className="">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )} */}
          <div className="row">
            <div className="col-lg-6">
              <TextField
                id="outlined-basic"
                label="Email"
                className="mb-3"
                variant="outlined"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="col-lg-6">
              <TextField
                id="outlined-basic"
                label="Name"
                className="mb-3"
                variant="outlined"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              {" "}
              <TextField
                id="outlined-basic"
                label="Card Name"
                className="mb-3"
                variant="outlined"
                required
                value={formData.cardName}
                onChange={(e) =>
                  setFormData({ ...formData, cardName: e.target.value })
                }
              />
            </div>
            <div className="col-lg-6">
              {" "}
              <TextField
                id="outlined-basic"
                className="mb-3"
                label="Card Number"
                variant="outlined"
                required
                value={formData.card_Number}
                onChange={(e) =>
                  setFormData({ ...formData, card_Number: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              {" "}
              <TextField
                className="mb-3"
                id="outlined-basic"
                label=" Card
              Expiry
              Date"
                variant="outlined"
                required
                value={formData.card_ExpYear}
                onChange={(e) =>
                  setFormData({ ...formData, card_ExpYear: e.target.value })
                }
              />
            </div>
            <div className="col-lg-6">
              {" "}
              <TextField
                id="outlined-basic"
                className="mb-3"
                label="Card Expiry Month"
                variant="outlined"
                required
                value={formData.card_ExpMonth}
                onChange={(e) =>
                  setFormData({ ...formData, card_ExpMonth: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <TextField
                id="outlined-basic"
                className="mb-3"
                label="Card CVC"
                variant="outlined"
                required
                value={formData.card_CVC}
                onChange={(e) =>
                  setFormData({ ...formData, card_CVC: e.target.value })
                }
              />
            </div>
            <div className="col-lg-6"></div>
          </div>
          <Divider variant="middle" />
          <Button
            variant="outlined"
            className="mt-3"
            color="primary"
            onClick={createCustomerAndCard}
          >
            Pay Now
          </Button>{" "}
        </Box>
      </Modal>
    </div>
  );
};

export default StripeContainer;
