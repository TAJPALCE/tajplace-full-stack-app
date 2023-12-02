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

  const handleFoam = () => {
    setChecked((prevChecked) => !prevChecked);
  };
  const [breakfast, setBreakFast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [mineral, setMineral] = useState(false);
  const [ac, setAc] = useState(false);
  const [heater, setHeater] = useState(false);

  const handleCheckboxBreakfastChange = (name) => {
    setBreakFast((prevChecked) => !prevChecked);
    console.log(`${name} ${!breakfast}`);
  };
  const handleCheckboxLunchChange = (name) => {
    setLunch((prevChecked) => !prevChecked);
    console.log(`${name} ${!lunch}`);
  };
  const handleCheckboxDinnerChange = (name) => {
    setDinner((prevChecked) => !prevChecked);
    console.log(`${name} ${!dinner}`);
  };
  const handleCheckboxMineralChange = (name) => {
    setMineral((prevChecked) => !prevChecked);
    console.log(`${name} ${!mineral}`);
  };
  const handleCheckboxHeaterChange = (name) => {
    setHeater((prevChecked) => !prevChecked);
    console.log(`${name} ${!heater}`);
  };
  const handleCheckboxAcChange = (name) => {
    setAc((prevChecked) => !prevChecked);
    console.log(`${name} ${!ac}`);
  };

  const localStoragePrice = localStorage.getItem("totalPrice");
  const localStorageRooms = localStorage.getItem("totalRooms");
  const localStorageGuests = localStorage.getItem("totalGuests");
  const numberOfDays = localStorage.getItem("numberOfDays");

  const extraFeature = [
    { name: "breakfast", price: 200 },
    { name: "lunch", price: 250 },
    { name: "dinner", price: 300 },
    { name: "mineral", price: 80 },
    { name: "heater", price: 200 },
    { name: "ac", price: 500 },
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
      updatedPrice += 500 * Number(foamQuantity) * Number(numberOfDays);
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
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <div>
          <ul>
            <li>
              <FormControlLabel
                control={<Checkbox />}
                label="Breakfast"
                onChange={() => handleCheckboxBreakfastChange("Breakfast")}
              />
            </li>
            <li>
              <FormControlLabel
                control={<Checkbox />}
                label="Lunch"
                onChange={() => handleCheckboxLunchChange("Lunch")}
              />
            </li>
            <li>
              <FormControlLabel
                control={<Checkbox />}
                label="Dinner"
                onChange={() => handleCheckboxDinnerChange("Dinner")}
              />
            </li>
            <li>
              <FormControlLabel
                control={<Checkbox />}
                label="Mineral Water"
                onChange={() => handleCheckboxMineralChange("Mineral")}
              />
            </li>
            <li>
              <FormControlLabel
                control={<Checkbox />}
                label="Heater"
                onChange={() => handleCheckboxHeaterChange("Heater")}
              />
            </li>
            <li>
              <FormControlLabel
                control={<Checkbox />}
                label="Air Conditioner"
                onChange={() => handleCheckboxAcChange("ac")}
              />
            </li>
            <li>
              <FormControlLabel
                control={<Checkbox />}
                label="Extra Foam"
                onClick={handleFoam}
              />
            </li>
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
