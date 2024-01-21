import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import Table from "react-bootstrap/Table";

const BookingModal = ({ isOpen, onClose }) => {
  const [foamQuantity, setFoamQuantity] = useState(1);
  console.log(foamQuantity, "foamQuantity");

  const handleQuantityChange = (event) => {
    setFoamQuantity(event.target.value);
  };

  const handlePayNow = () => {
    // Add your logic here for handling the 'Pay Now' button click
    console.log("Payment logic goes here");
    onClose(); // Close the modal after payment logic
  };
  const [checked, setChecked] = useState(false);

  const handleFoam = (name) => {
    setChecked((prevChecked) => !prevChecked);
    setFoam((prevChecked) => !prevChecked);
  };
  const [breakfast, setBreakFast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [mineral, setMineral] = useState(false);
  const [ac, setAc] = useState(false);
  const [heater, setHeater] = useState(false);
  const [foam, setFoam] = useState(false);

  const [extraThings, setExtraThings] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/roomFeature/getAllRoomFeature`
        );
        setExtraThings(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  console.log(extraThings);

  const handleCheckboxBreakfastChange = (name) => {
    setBreakFast((prevChecked) => !prevChecked);
  };
  const handleCheckboxLunchChange = (name) => {
    setLunch((prevChecked) => !prevChecked);
  };
  const handleCheckboxDinnerChange = (name) => {
    setDinner((prevChecked) => !prevChecked);
  };
  const handleCheckboxMineralChange = (name) => {
    setMineral((prevChecked) => !prevChecked);
  };
  const handleCheckboxHeaterChange = (name) => {
    setHeater((prevChecked) => !prevChecked);
  };
  const handleCheckboxAcChange = (name) => {
    setAc((prevChecked) => !prevChecked);
  };

  const localStoragePrice = localStorage.getItem("totalPrice");
  const localStorageRooms = localStorage.getItem("totalRooms");
  const localStorageGuests = localStorage.getItem("totalGuests");
  const numberOfDays = localStorage.getItem("numberOfDays");

  const extraFeature = [
    {
      name: "breakfast",
      price:
        extraThings && extraThings[0] ? extraThings[0].breakfast.price : "",
    },
    {
      name: "lunch",
      price: extraThings && extraThings[0] ? extraThings[0].lunch.price : "",
    },
    {
      name: "dinner",
      price: extraThings && extraThings[0] ? extraThings[0].dinner.price : "",
    },
    {
      name: "mineral",
      price:
        extraThings && extraThings[0] ? extraThings[0].mineralWater.price : "",
    },
    {
      name: "heater",
      price: extraThings && extraThings[0] ? extraThings[0].heater.price : "",
    },
    {
      name: "ac",
      price: extraThings && extraThings[0] ? extraThings[0].ac.price : "",
    },
    {
      name: "foam",
      price: extraThings && extraThings[0] ? extraThings[0].foam.price : "",
    },
  ];

  const [finalPrice, setFinalPrice] = useState(localStoragePrice);

  useEffect(() => {
    let updatedPrice = Number(localStoragePrice);

    const calculateFeaturePrice = (featureName, featurePrice) => {
      if (eval(featureName)) {
        updatedPrice +=
          featurePrice * Number(localStorageGuests) * Number(numberOfDays);
      }
    };

    extraFeature.forEach(({ name, price }) => {
      calculateFeaturePrice(name, price);
    });
    if (checked == true) {
      updatedPrice +=
        (extraThings && extraThings[0] ? extraThings[0].foam.price : 0) *
        Number(foamQuantity) *
        Number(numberOfDays);
    }

    setFinalPrice(updatedPrice);
  }, [
    breakfast,
    lunch,
    dinner,
    mineral,
    heater,
    ac,
    checked,
    foamQuantity,
    localStoragePrice,
  ]);

  console.log(finalPrice, "finalPrice>>>>>>");

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
        }}
      >
        <div>
          <h3 className="p-3">Do you want to add extra service</h3>

          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>✔</th>
                <th>Service</th>
                <th>Price</th>
                <th>Menu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FormControlLabel
                    control={<Checkbox />}
                    // label="Breakfast"
                    onChange={() => handleCheckboxBreakfastChange("Breakfast")}
                  />
                </td>
                <td>
                  {extraThings && extraThings[0]
                    ? extraThings[0].breakfast.title
                    : ""}
                </td>
                <td>
                  {extraThings && extraThings[0]
                    ? extraThings[0].breakfast.price
                    : ""}
                </td>
                <td>
                  {extraThings && extraThings[0]
                    ? extraThings[0].breakfast.menu
                    : ""}{" "}
                </td>
              </tr>
              <tr>
                <td>
                  <FormControlLabel
                    control={<Checkbox />}
                    // label="Lunch"
                    onChange={() => handleCheckboxLunchChange("Lunch")}
                  />
                </td>
                <td>
                  {extraThings && extraThings[0]
                    ? extraThings[0].lunch.title
                    : ""}
                </td>
                <td>
                  {extraThings && extraThings[0]
                    ? extraThings[0].lunch.price
                    : ""}
                </td>
                <td>
                  {extraThings && extraThings[0]
                    ? extraThings[0].lunch.menu
                    : ""}
                </td>
              </tr>
              <tr>
                <td>
                  <FormControlLabel
                    control={<Checkbox />}
                    // label="Dinner"
                    onChange={() => handleCheckboxDinnerChange("Dinner")}
                  />
                </td>
                <td>
                  {extraThings && extraThings[0]
                    ? extraThings[0].dinner.title
                    : ""}
                </td>
                <td>
                  {extraThings && extraThings[0]
                    ? extraThings[0].dinner.price
                    : ""}
                </td>
                <td>
                  {extraThings && extraThings[0]
                    ? extraThings[0].dinner.menu
                    : ""}
                </td>
              </tr>
              <tr>
                <td>
                  <FormControlLabel
                    control={<Checkbox />}
                    // label="Mineral Water"
                    onChange={() => handleCheckboxMineralChange("Mineral")}
                  />
                </td>
                <td>
                  {extraThings && extraThings[0]
                    ? extraThings[0].mineralWater.title
                    : ""}
                </td>
                <td>
                  {extraThings && extraThings[0]
                    ? extraThings[0].mineralWater.price
                    : ""}
                </td>
              </tr>
              <tr>
                <td>
                  <FormControlLabel
                    control={<Checkbox />}
                    // label="Heater"
                    onChange={() => handleCheckboxHeaterChange("Heater")}
                  />
                </td>
                <td>
                  {extraThings && extraThings[0]
                    ? extraThings[0].heater.title
                    : ""}
                </td>
                <td>
                  {extraThings && extraThings[0]
                    ? extraThings[0].heater.price
                    : ""}
                </td>
              </tr>
              <tr>
                <td>
                  <FormControlLabel
                    control={<Checkbox />}
                    // label="Air Conditioner"
                    onChange={() => handleCheckboxAcChange("ac")}
                  />
                </td>
                <td>
                  {extraThings && extraThings[0] ? extraThings[0].ac.title : ""}
                </td>
                <td>
                  {extraThings && extraThings[0] ? extraThings[0].ac.price : ""}
                </td>
              </tr>
              <tr>
                <td>
                  <FormControlLabel
                    control={<Checkbox />}
                    // label="Extra Foam"
                    onChange={() => handleFoam("foam")}
                  />
                </td>
                <td>
                  {extraThings && extraThings[0]
                    ? extraThings[0].foam.title
                    : ""}
                </td>
                <td>
                  {extraThings && extraThings[0]
                    ? extraThings[0].foam.price
                    : ""}
                </td>
              </tr>
            </tbody>
          </Table>

          <ul>
            {checked && (
              <li>
                <InputLabel id="foam-quantity-label">
                  Extra Foam Quantity
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    className="w-25  mt-2"
                    labelId="foam-quantity-label"
                    id="foam-quantity"
                    value={foamQuantity}
                    onChange={handleQuantityChange}
                  >
                    {[...Array(10).keys()].map((num) => (
                      <MenuItem
                        className="d-flex "
                        key={num + 1}
                        value={num + 1}
                      >
                        {num + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </li>
            )}
          </ul>
        </div>
        <div className="row">
          <div className="col">
            {" "}
            <Button variant="contained" onClick={handlePayNow}>
              Pay Now
            </Button>
          </div>
          <div className="col">Total Price : {finalPrice} PKR</div>
        </div>
      </Box>
    </Modal>
  );
};

export default BookingModal;
