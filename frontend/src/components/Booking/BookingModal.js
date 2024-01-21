import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Table,
  Divider,
} from "@mui/material";
import StripePayment from "../RoomsOne/stripPayment";
import GlobalNav from "../GlobalNav/GlobalNav";

const BookingModal = () => {
  const [open, setOpen] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);
  const [foamQuantity, setFoamQuantity] = useState(1);
  const [menuData, setMenuData] = useState([]);
  const [extraThings, setExtraThings] = useState({});
  const [payFlag, setPayFlag] = useState(false);
  const localStoragePrice = localStorage.getItem("totalPrice");
  const checkDays = Number(localStorage.getItem("numberOfDays"));
  const finalDay = checkDays - 1;
  const totalGuest = Number(localStorage.getItem("totalGuests"));
  const localStorageRooms = localStorage.getItem("totalRooms");
  const [extraFeatures, setExtraFeatures] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
    mineral: false,
    heater: false,
    ac: false,
    foam: false,
  });

  const featurePrices = {
    breakfast: extraThings[0]?.breakfast.price,
    lunch: extraThings[0]?.lunch.price,
    dinner: extraThings[0]?.dinner.price,
    mineral: extraThings[0]?.mineralWater.price,
    heater: extraThings[0]?.heater.price,
    ac: extraThings[0]?.ac.price,
    foam: extraThings[0]?.foam.price,
  };
  const handleCheckboxChange = (name) => {
    setExtraFeatures((prevFeatures) => ({
      ...prevFeatures,
      [name]: !prevFeatures[name],
    }));
  };

  const handleFoam = () => {
    setExtraFeatures((prevFeatures) => ({
      ...prevFeatures,
      foam: !prevFeatures.foam,
    }));
  };
  const handleQuantityChange = (event) => {
    setFoamQuantity(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/roomFeature/getAllRoomFeature")
      .then((res) => {
        setExtraThings(res.data);
        setMenuData(res.data[0]?.foamQuantity);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    let updatedPrice = Number(localStoragePrice);

    Object.keys(extraFeatures).forEach((name) => {
      if (name !== "foam") {
        const isFeatureSelected = extraFeatures[name];
        if (
          (isFeatureSelected && name == "breakfast" && checkDays <= 1) ||
          (isFeatureSelected && name == "dinner" && checkDays <= 1)
        ) {
          updatedPrice = Number(localStoragePrice);
        } else if (
          (isFeatureSelected && name == "breakfast" && checkDays > 1) ||
          (isFeatureSelected && name == "dinner" && checkDays > 1)
        ) {
          updatedPrice +=
            Number(featurePrices[name]) * totalGuest * Number(finalDay);
        } else if (
          isFeatureSelected &&
          name !== "breakfast" &&
          name !== "dinner"
        ) {
          updatedPrice +=
            Number(featurePrices[name]) * totalGuest * Number(checkDays);
        }
      }
    });

    if (extraFeatures.foam) {
      updatedPrice +=
        Number(featurePrices.foam) * Number(foamQuantity) * Number(checkDays);
    }

    setFinalPrice(updatedPrice);
    localStorage.setItem("totalAmount", updatedPrice);
  }, [extraFeatures, foamQuantity, extraThings]);

  useEffect(() => {
    const localStorageFunct = () => {
      if (extraFeatures.breakfast) {
        if (checkDays <= 1) {
          localStorage.setItem("breakfast", 0);
        } else {
          let price = `${
            extraThings[0]?.breakfast.price * finalDay * totalGuest
          } for total guest ${totalGuest} for ${finalDay} day`;
          localStorage.setItem("breakfast", price);
        }
      } else {
        localStorage.setItem("breakfast", 0);
      }

      if (extraFeatures.lunch) {
        let price = `${
          extraThings[0]?.lunch.price * checkDays * totalGuest
        } for total guest ${totalGuest} for ${checkDays} day`;
        localStorage.setItem("lunch", extraFeatures.lunch ? price : 0);
      } else {
        localStorage.setItem("lunch", 0);
      }

      if (extraFeatures.dinner) {
        if (checkDays <= 1) {
          localStorage.setItem("dinner", 0);
        } else {
          let price = `${
            extraThings[0]?.dinner.price * finalDay * totalGuest
          } for total guest ${totalGuest} for ${finalDay} day`;
          localStorage.setItem("dinner", price);
        }
      } else {
        localStorage.setItem("dinner", 0);
      }

      //
      if (extraFeatures.mineral) {
        let price = `${
          extraThings[0]?.mineralWater.price * checkDays * totalGuest
        } for total guest ${totalGuest} for ${checkDays} day`;
        localStorage.setItem("mineral", price);
      } else {
        localStorage.setItem("mineral", 0);
      }
      //
      if (extraFeatures.heater) {
        let price = `${
          extraThings[0]?.heater.price * checkDays * totalGuest
        } for total guest ${totalGuest} for ${checkDays} day`;
        localStorage.setItem("heater", price);
      } else {
        localStorage.setItem("heater", 0);
      }
      //
      if (extraFeatures.ac) {
        let price = `${
          extraThings[0]?.ac.price * checkDays * totalGuest
        } for total guest ${totalGuest} for ${checkDays} day`;
        localStorage.setItem("ac", price);
      } else {
        localStorage.setItem("ac", 0);
      }

      if (extraFeatures.foam && foamQuantity) {
        let price = `${
          extraThings[0]?.foam.price * checkDays * foamQuantity
        } for total guest ${totalGuest} for ${checkDays} day`;
        localStorage.setItem("foam", price);
        localStorage.setItem("foamQuantity", foamQuantity);
      } else {
        localStorage.setItem("foam", 0);
        localStorage.setItem("foamQuantity", 0);
      }
    };
    localStorageFunct();
  }, [
    extraFeatures,
    foamQuantity,
    extraThings,
    finalDay,
    totalGuest,
    checkDays,
  ]);

  const renderBillingDetails = () => {
    const renderDetail = (name, label) => {
      const feature = extraThings[0] && extraThings[0][name];
      if (
        (name == "breakfast" &&
          extraFeatures.breakfast &&
          checkDays <= 1 &&
          feature) ||
        (name == "dinner" && extraFeatures.dinner && checkDays <= 1 && feature)
      ) {
        return (
          <label key={name}>{label} = Breakfast not Avail on arrival day</label>
        );
      } else if (
        (name == "breakfast" &&
          extraFeatures.breakfast &&
          checkDays > 1 &&
          feature) ||
        (name == "dinner" && extraFeatures.dinner && checkDays > 1 && feature)
      ) {
        return (
          <label key={name}>
            {label} = {feature.price * totalGuest * Number(finalDay)}
            /- for {finalDay} days & for {totalGuest} Person
          </label>
        );
      } else if (
        name !== "breakfast" &&
        name == "lunch" &&
        extraFeatures.lunch &&
        feature &&
        name !== "dinner"
      ) {
        return (
          <label key={name}>
            {label} = {feature.price * totalGuest * checkDays}
            /- for {checkDays} days & for {totalGuest} Person
          </label>
        );
      } else if (
        name !== "breakfast" &&
        name == "mineralWater" &&
        extraFeatures.mineral &&
        feature &&
        name !== "dinner"
      ) {
        return (
          <label key={name}>
            {label} = {feature.price * totalGuest * checkDays}
            /- for {checkDays} days & for {totalGuest} Person
          </label>
        );
      } else if (
        name !== "breakfast" &&
        name == "heater" &&
        extraFeatures.heater &&
        feature &&
        name !== "dinner"
      ) {
        return (
          <label key={name}>
            {label} = {feature.price * totalGuest * checkDays}
            /- for {checkDays} days & for {totalGuest} Person
          </label>
        );
      } else if (
        name !== "breakfast" &&
        name == "ac" &&
        feature &&
        name !== "dinner" &&
        extraFeatures.ac
      ) {
        return (
          <label key={name}>
            {label} = {feature.price * totalGuest * checkDays}
            /- for {checkDays} days & for {totalGuest} Person
          </label>
        );
      }
      return null;
    };

    return (
      <>
        {renderDetail("breakfast", "Breakfast for")}
        {renderDetail("lunch", "Lunch for")}
        {renderDetail("dinner", "Dinner for")}
        {renderDetail("mineralWater", "Mineral Water for")}
        {renderDetail("heater", "Heater for")}
        {renderDetail("ac", "Air Conditioner for")}
        {renderDetail("foam", `Extra Foam for ${foamQuantity} days`)}
        <Divider variant="middle" />
        <label>Total Stay: {checkDays} day</label>
        <label>Total Persons: {totalGuest}</label>
        <label>Total Rooms: {localStorageRooms}</label>
        <Divider variant="middle" />
        <label>Total Bill: {finalPrice} PKR</label>
        <Divider variant="middle" />
        <Button
          variant="outlined"
          className="mt-3"
          color="primary"
          onClick={() => {
            setPayFlag(true);
            setOpen(true);
          }}
        >
          Pay Now
        </Button>{" "}
      </>
    );
  };

  return (
    <>
      <div>
        <div className="mb-5">
          <GlobalNav />
        </div>
        <div className="pt-1">
          <h3 className="p-3 mt-5">Do you want to add extra service</h3>
        </div>

        <div className="container text-center">
          <div className="listWrapper">
            <div className="w-75">
              <Table striped bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>✔</th>
                    <th>Service</th>
                    <th>Price / day</th>
                    <th>Menu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <FormControlLabel
                        control={<Checkbox />}
                        // label="Breakfast"
                        onChange={() => handleCheckboxChange("breakfast")}
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
                        onChange={() => handleCheckboxChange("lunch")}
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
                        onChange={() => handleCheckboxChange("dinner")}
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
                        onChange={() => handleCheckboxChange("mineral")}
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
                        onChange={() => handleCheckboxChange("heater")}
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
                        onChange={() => handleCheckboxChange("ac")}
                      />
                    </td>
                    <td>
                      {extraThings && extraThings[0]
                        ? extraThings[0].ac.title
                        : ""}
                    </td>
                    <td>
                      {extraThings && extraThings[0]
                        ? extraThings[0].ac.price
                        : ""}
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
                    <td>
                      <ul style={{ listStyle: "none" }} className="w-75">
                        {extraFeatures.foam && (
                          <li>
                            <InputLabel
                              id="foam-quantity-label"
                              style={{ marginLeft: "-1rem" }}
                            >
                              Extra Foam Quantity
                            </InputLabel>
                            <FormControl fullWidth>
                              <Select
                                className="w-75  mt-2"
                                labelId="foam-quantity-label"
                                id="foam-quantity"
                                value={foamQuantity}
                                onChange={handleQuantityChange}
                              >
                                {[...Array(menuData).keys()].map((num) => (
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
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="listSearch p-3">
              <h3 className="lsTitle">Your Billing Detail</h3>
              <div className="lsItem">{renderBillingDetails()}</div>
            </div>
          </div>
          {payFlag ? (
            <StripePayment
              finalPrice={finalPrice}
              extraFeatures={extraFeatures}
              foamQuantity={foamQuantity}
              featurePrices={featurePrices}
              extraThings={extraThings}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default BookingModal;
