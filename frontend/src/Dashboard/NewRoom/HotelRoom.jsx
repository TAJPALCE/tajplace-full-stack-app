import Swal from "sweetalert2";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const HotelRoom = () => {
  // FETCH HOTEL DATA FROM DATABASE
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(data, "???????????");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/hotel/allhotels");
        console.log(res);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // SUBMIT FORM DATA TO THE DATABASE
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState("");
  const [ac, setAc] = useState("");
  const [hotelId, setHotelId] = useState("");
  useEffect(() => {
    if (data.length > 0) {
      setHotelId(data[0]._id);
    }
  }, [data]);
  console.log(hotelId, ">>>>>>>>>>>>>>>>>");
  const [roomQuantity, setRoomQuantity] = useState("");
  const navigate = useNavigate();
  const config = {
    headers: { token: `Bearer ${JSON.parse(localStorage.getItem("token"))}` },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // const ro = rooms.split(",").map((room) => ({ number: room }));

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "yasinCloud");
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/hotelroombooking/image/upload",
      data
    );
    const { url } = uploadRes.data;
    const roomsObj = {
      title,
      price,
      maxPeople,
      desc,
      quantity: roomQuantity,
      rating,
      ac,
      img: url,
    };
    console.log(roomsObj);
    try {
      const res = await axios.post(
        `http://localhost:5000/room/createRoom/${hotelId}`,
        roomsObj,
        config
      );
      console.log(res);
      res &&
        Swal.fire({
          icon: "success",
          title: "Room created",
        });
      setTimeout(() => {
        navigate("/addRoom");
      }, [1000]);
      return clearTimeout(setTimeout());
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="ad">
      <Topbar />
      <Sidebar />
      <div className="admin">
        <div className="adminDash">
          <div className="titleContainer">
            <div className="adDash">
              {/* ADD ADMIN */}
              <div className="TeacherAdd">
                <div className="teacherTitle">
                  <div className="colLeft">
                    <strong className="firstTitle">
                      Dashboard / <span className="scndTitle">add rooms</span>
                    </strong>
                  </div>
                </div>

                {/* Teacher add forms */}
                <div className="mt-3">
                  <div className="Tadd">
                    {/* basic details */}
                    <>
                      <div className="bdtails">
                        <h3>Room Details</h3>
                        <div className="line" />
                      </div>
                      <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                          <label htmlFor="inputEmail4" className="form-label">
                            Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputEmail4"
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="single bed | double bed | tripple bed"
                          />
                        </div>
                        <div className="col-md-6">
                          <label
                            htmlFor="inputPassword4"
                            className="form-label"
                          >
                            Price
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="price"
                          />
                        </div>
                        <div className="col-md-6">
                          <label
                            htmlFor="inputPassword4"
                            className="form-label"
                          >
                            Max People
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            onChange={(e) => setMaxPeople(e.target.value)}
                            placeholder="maximum people"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="inputCity" className="form-label">
                            Room Quantity
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputCity"
                            value={roomQuantity}
                            onChange={(e) => setRoomQuantity(e.target.value)}
                            placeholder="0"
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="inputCity" className="form-label">
                            Rating
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="inputCity"
                            onChange={(e) => setRating(e.target.value)}
                            placeholder="5"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="inputCity" className="form-label">
                            Ac
                          </label>
                          <select
                            id="featured"
                            className="form-control"
                            onChange={(e) => setAc(e.target.value)}
                          >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label>Choose a hotel</label>
                          <select id="hotelId" className="form-control">
                            {data &&
                              data.map((hotel, index) => (
                                <option
                                  key={index}
                                  value={hotel._id}
                                  className="form-control"
                                  onChange={(e) => setHotelId(hotel._id)}
                                >
                                  {hotel.name}
                                </option>
                              ))}
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="inputCity" className="form-label">
                            Room Image
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="inputCity"
                            onChange={(e) => setFile(e.target.files[0])}
                            placeholder="room descriptions"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="inputCity" className="form-label">
                            Description
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            id="inputCity"
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="room descriptions"
                          />
                        </div>
                        <div id="loader">{isLoading && <Loader />}</div>

                        <div className="col-12 mb-4">
                          <button
                            type="submit"
                            className="btn btn-warning text-white fw-bold"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelRoom;
