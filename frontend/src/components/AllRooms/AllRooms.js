import React, { useEffect, useState } from "react";
import GlobalNav from "../GlobalNav/GlobalNav";
import axios from "axios";
import { useParams } from "react-router-dom";
import rooOnejpg from "../../img/rooOnejpg.jpg";
import one from "../../img/singleOne.jpg";
import two from "../../img/singleTwo.jpg";
import three from "../../img/singleThree.jpg";
import four from "../../img/singleFour.jpg";
import "../FavouriteRooms/FavouriteRooms.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faSmokingBan,
  faParking,
  faUsers,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer/Footer";
import BookingModal from "../Booking/BookingModal";
import { ToastContainer, toast } from "react-toastify";

const AllRooms = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/room/getRoomByID/${id}`
        );
        setData(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const [rooms, setRooms] = useState([]);
  console.log(rooms);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/room/getAllRooms");
        setRooms(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const numberOfDays = localStorage.getItem("numberOfDays");

  const roomsQuantity = [
    { _id: 1, title: "single bed", quantity: 5 },
    { _id: 2, title: "double bed", quantity: 7 },
    { _id: 3, title: "deluxe double bed", quantity: 6 },
    { _id: 4, title: "triple bed", quantity: 4 },
  ];
  const [selectedRooms, setSelectedRooms] = useState({});

  const handleRoomSelect = (roomId, quantity) => {
    let quant = quantity - 1;

    // Retrieve existing selected rooms from local storage
    const storedRooms = localStorage.getItem("selectedRooms");
    let existingRooms = storedRooms ? JSON.parse(storedRooms) : [];

    // Check if the room already exists in the array
    const existingRoomIndex = existingRooms.findIndex(
      (room) => room.roomId === roomId
    );

    if (quant === 0) {
      // If the quantity becomes zero, remove the entry from selectedRooms
      existingRooms = existingRooms.filter((room) => room.roomId !== roomId);
    } else if (existingRoomIndex !== -1) {
      // If the room exists, update the quantity
      existingRooms[existingRoomIndex].quantity = quant;
    } else {
      // If the room doesn't exist, add a new entry to the array
      existingRooms.push({ roomId, quantity: quant });
    }

    // Save the updated array back to local storage
    localStorage.setItem("selectedRooms", JSON.stringify(existingRooms));

    if (quant === 0) {
      setSelectedRooms((prevSelectedRooms) => {
        const { [roomId]: _, ...updatedSelectedRooms } = prevSelectedRooms;
        return updatedSelectedRooms;
      });
    } else {
      setSelectedRooms({
        ...selectedRooms,
        [roomId]: quant,
      });
    }
  };
  useEffect(() => {
    // Fetch selected rooms from localStorage when the component mounts
    const storedRooms = localStorage.getItem("selectedRooms");
    if (storedRooms) {
      const parsedRooms = JSON.parse(storedRooms);
      setSelectedRooms(
        parsedRooms.reduce((acc, room) => {
          acc[room.roomId] = room.quantity;
          return acc;
        }, {})
      );
    }
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    if (Object.keys(selectedRooms).length !== 0) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
      notify();
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const notify = () => toast("Please select the Room.", { type: "error" });
  const selectedRoom = localStorage.getItem("selectedRooms");
  console.log(selectedRoom, "selectedRoom");

  const calculateTotal = () => {
    let totalPrice = 0;
    let totalRooms = 0;
    let totalGuests = 0;

    // Calculate total price, total rooms, and total guests
    Object.keys(selectedRooms).forEach((roomId) => {
      const room = rooms.find((r) => r._id === roomId);
      const quantity = selectedRooms[roomId];
      if (room) {
        totalPrice += quantity * numberOfDays * room.price;
        totalRooms += quantity;
        totalGuests += quantity * room.maxPeople;
      }
    });
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("totalRooms", totalRooms);
    localStorage.setItem("totalGuests", totalGuests);
    return { totalPrice, totalRooms, totalGuests };
  };

  const { totalPrice, totalRooms, totalGuests } = calculateTotal();

  const totalGuest = localStorage.getItem("totalGuests");

  return (
    <>
      <div className="mb-5">
        <GlobalNav />
      </div>
      <div className="favouriteRooms container" style={{ marginTop: "8rem" }}>
        <div className="fvroom">
          <div className="row">
            <div className="col-md-5">
              <div className="col-left-fvrt">
                <img src={data.img} alt="" className="fvrtImg" />
                <div className="col-left-text">
                  <p className="fvrt-para">{data.title}</p>
                  <p className="fvrt-text">
                    {numberOfDays ? numberOfDays * data.price : data.price} PKR
                    / {numberOfDays ? numberOfDays : ""} Nights
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="fvrt-right">
                <div className="fvt-right-img">
                  <img src={one} alt="" className="rightimg" />
                  <div className="fvrt-right-text">
                    <h5>Attached Washroom</h5>
                  </div>
                </div>

                <div className="fvt-right-img">
                  <img src={two} alt="" className="rightimg" />
                  <div className="fvrt-right-text">
                    <h5>Sitting Area</h5>
                  </div>
                </div>

                <div className="fvt-right-img">
                  <img src={three} alt="" className="rightimg" />
                  <div className="fvrt-right-text">
                    <h5>
                      AC{" "}
                      {data.ac === true ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faTimes} />
                      )}
                    </h5>
                  </div>
                </div>

                <div className="fvt-right-img">
                  <img src={four} alt="" className="rightimg" />
                  <div className="fvrt-right-text">
                    <h5>Night view</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 mb-3">
          The New Taj Mahal Hotel is located in Lahore, within 20 miles of Wagah
          Border and 2.2 miles of Chauburji. This 2-star hotel offers room
          service and a 24-hour front desk. The hotel features family rooms.
          Guest rooms in the hotel are equipped with a TV. Lahore Museum is 3.6
          miles from The New Taj Mahal Hotel, while Data Darbar is 4.1 miles
          away. The nearest airport is Allama Iqbal International Airport, 8.7
          miles from the accommodation. Distance in property description is
          calculated using © OpenStreetMap
        </div>
        <h4 className="bold"> Most popular facilities</h4>
        <div className="d-flex gap-3 mt-3 mb-5">
          <div className="">
            <FontAwesomeIcon icon={faUtensils} /> Room service
          </div>
          <div className="">
            <FontAwesomeIcon icon={faSmokingBan} /> Non-smoking rooms
          </div>
          <div className="">
            <FontAwesomeIcon icon={faParking} /> Free parking
          </div>
          <div className="">
            <FontAwesomeIcon icon={faUsers} /> Family rooms
          </div>
        </div>
        <div className="pb-3">
          <h2>Room Details</h2>
          <h6 style={{ color: "red" }}>
            {totalGuest == 35
              ? "If you want to add more guest,Click on book button and add extra foam according to your needs"
              : ""}
          </h6>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Room Type</th>
                <th>Number of Guests</th>
                <th>Today's Price</th>
                <th>how many days</th>
                <th>Select Room</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr key={room._id}>
                  <td>
                    <u style={{ textTransform: "capitalize" }}>
                      {room.title} Room
                    </u>
                  </td>
                  <td>{room.maxPeople}</td>
                  <td>
                    {numberOfDays ? numberOfDays * room.price : room.price} PKR
                  </td>
                  <td>{numberOfDays ? numberOfDays : ""}</td>
                  <td>
                    {" "}
                    <FormControl fullWidth>
                      <InputLabel>Your Choices</InputLabel>
                      <Select
                        value={selectedRooms[room._id]}
                        onChange={(e) =>
                          handleRoomSelect(room._id, e.target.value)
                        }
                      >
                        {[
                          ...Array(
                            roomsQuantity.find((rq) => rq.title === room.title)
                              ?.quantity || 7
                          ).keys(),
                        ].map((quantity) => (
                          <MenuItem key={quantity} value={quantity + 1}>
                            {`${quantity}.  ${
                              numberOfDays
                                ? numberOfDays * quantity * room.price
                                : quantity * room.price
                            } PKR`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </td>
                </tr>
              ))}
            </tbody>
            <thead>
              <tr>
                <th>
                  Reserve Your Room <br />{" "}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenModal}
                  >
                    Book
                  </Button>{" "}
                </th>

                <th> Total Price: {totalPrice} PKR</th>
                <th> Total Rooms: {totalRooms}</th>
                <th> Total Guests: {totalGuests}</th>
                <th> Total Days: {numberOfDays ? numberOfDays : ""}</th>
              </tr>
            </thead>
          </Table>
          <ToastContainer />
          <BookingModal isOpen={modalOpen} onClose={handleCloseModal} />
        </div>
      </div>
    </>
  );
};

export default AllRooms;
