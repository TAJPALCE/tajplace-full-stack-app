import { Card, TextField } from "@mui/material";
import React from "react";

const PaymentMethod = () => {
  return (
    <div className="container text-black">
      parent
      <div className="row m-auto">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <Card className="p-5">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              required
            />
            <TextField
              id="outlined-basic"
              label="Card Name"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Card Number"
              variant="outlined"
              required
            />
            <TextField
              id="outlined-basic"
              label=" Card
              Expiry
              Date"
              variant="outlined"
              required
            />
            <TextField
              id="outlined-basic"
              label="Card Expiry Month"
              variant="outlined"
              required
            />
            <TextField
              id="outlined-basic"
              label="Card CVC"
              variant="outlined"
              required
            />
          </Card>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <Card>hello</Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
