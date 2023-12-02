import Swal from "sweetalert2";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Topbar from "../../Topbar/Topbar";
import Sidebar from "../../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

const ExtraServices = () => {
  // FETCH HOTEL DATA FROM DATABASE
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);

  // SUBMIT FORM DATA TO THE DATABASE
  const [breakfastTitle, setBreakFastTitle] = useState("");
  const [lunchTitle, setLunchTitle] = useState("");
  const [dinnerTitle, setDinnerTitle] = useState("");
  const [breakfastPrice, setBreakFastPrice] = useState("");
  const [lunchPrice, setLunchPrice] = useState("");
  const [dinnerPrice, setDinnerPrice] = useState("");
  const [breakfastMenu, setBreakFastMenu] = useState("");
  const [lunchMenu, setLunchMenu] = useState("");
  const [dinnerMenu, setDinnerMenu] = useState("");
  const [acPrice, setAcPrice] = useState("");
  const [heaterPrice, setHeaterPrice] = useState("");
  const [mineralPrice, setMineralPrice] = useState("");
  const [foamPrice, setfoamPrice] = useState("");
  const navigate = useNavigate();
  const config = {
    headers: { token: `Bearer ${JSON.parse(localStorage.getItem("token"))}` },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const extraServicesObj = {
      breakfast: {
        title: breakfastTitle,
        price: breakfastPrice,
        menu: breakfastMenu,
      },
      lunch: {
        title: lunchTitle,
        price: lunchPrice,
        menu: lunchMenu,
      },
      dinner: {
        title: dinnerTitle,
        price: dinnerPrice,
        menu: dinnerMenu,
      },
      ac: {
        title: "Air Conditioner",
        price: acPrice,
      },
      heater: {
        title: "Heater",
        price: heaterPrice,
      },
      mineralWater: {
        title: "Mineral Water",
        price: mineralPrice,
      },
      foam: {
        title: "Foam",
        price: foamPrice,
      },
      foamQuantity: 5,
      // foamQuantity: foamQuantity,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/roomFeature/createRoomFeature",
        extraServicesObj,
        config
      );
      console.log(res);

      res &&
        Swal.fire({
          icon: "success",
          title: "ExtraServices created",
        });

      setTimeout(() => {
        navigate("/addRoom");
      }, 1000);
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
                      Dashboard /{" "}
                      <span className="scndTitle">add Extra Services</span>
                    </strong>
                  </div>
                </div>

                {/* Teacher add forms */}
                <div className="mt-3">
                  <div className="Tadd">
                    {/* basic details */}
                    <>
                      <div className="bdtails">
                        <h3>Extra Serivce Details</h3>
                        <div className="line" />
                      </div>
                      <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-4">
                          <label htmlFor="inputEmail4" className="form-label">
                            Breakfast Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputEmail4"
                            onChange={(e) => setBreakFastTitle(e.target.value)}
                            placeholder="Breakfast"
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="inputEmail4" className="form-label">
                            Lunch Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputEmail4"
                            onChange={(e) => setLunchTitle(e.target.value)}
                            placeholder="Lunch"
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="inputEmail4" className="form-label">
                            Dinner Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputEmail4"
                            onChange={(e) => setDinnerTitle(e.target.value)}
                            placeholder="Dinner"
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="inputPassword4"
                            className="form-label"
                          >
                            Breakfast Price
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            onChange={(e) => setBreakFastPrice(e.target.value)}
                            placeholder="750"
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="inputPassword4"
                            className="form-label"
                          >
                            Lunch Price
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            onChange={(e) => setLunchPrice(e.target.value)}
                            placeholder="1000"
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="inputPassword4"
                            className="form-label"
                          >
                            Dinner Price
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            onChange={(e) => setDinnerPrice(e.target.value)}
                            placeholder="1200"
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="inputPassword4"
                            className="form-label"
                          >
                            BreakFast Menu
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            onChange={(e) => setBreakFastMenu(e.target.value)}
                            placeholder="Halwa pori | murg chana | chicken"
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="inputPassword4"
                            className="form-label"
                          >
                            Lunch Menu
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            onChange={(e) => setLunchMenu(e.target.value)}
                            placeholder="biryani | karai | chicken"
                          />
                        </div>
                        <div className="col-md-4">
                          <label
                            htmlFor="inputPassword4"
                            className="form-label"
                          >
                            Dinner Menu
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            onChange={(e) => setDinnerMenu(e.target.value)}
                            placeholder="Tika | karai "
                          />
                        </div>
                        <div className="col-md-3">
                          <label
                            htmlFor="inputPassword4"
                            className="form-label"
                          >
                            Air Conditioner Price
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            onChange={(e) => setAcPrice(e.target.value)}
                            placeholder="1000"
                          />
                        </div>
                        <div className="col-md-3">
                          <label
                            htmlFor="inputPassword4"
                            className="form-label"
                          >
                            Heater Price
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            onChange={(e) => setHeaterPrice(e.target.value)}
                            placeholder="1000"
                          />
                        </div>
                        <div className="col-md-3">
                          <label
                            htmlFor="inputPassword4"
                            className="form-label"
                          >
                            Mineral botle
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            onChange={(e) => setMineralPrice(e.target.value)}
                            placeholder="150 "
                          />
                        </div>
                        <div className="col-md-3">
                          <label
                            htmlFor="inputPassword4"
                            className="form-label"
                          >
                            Foam Price
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPassword4"
                            onChange={(e) => setfoamPrice(e.target.value)}
                            placeholder="200 "
                          />
                        </div>

                        {/* <div className="col-md-6">
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
                        </div> */}
                        {/* <div className="col-md-6">
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
                        </div> */}

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

export default ExtraServices;
