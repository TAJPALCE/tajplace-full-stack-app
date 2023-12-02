import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const NewRoom = () => {
  const [data, setData] = useState([]);
  console.log(data);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // FETCH HOTEL DATA FROM DATABASE
  const config = {
    headers: { token: `Bearer ${JSON.parse(localStorage.getItem("token"))}` },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("i am calling");
        const res = await axios.get(
          "http://localhost:5000/room/getAllRooms",
          config
        );
        // const res = await axios.get('https://hotel-server-beryl.vercel.app/hotel/allhotels')
        // console.log(res)
        console.log("i am calling");

        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // DELETE ROOMS
  const handleDelete = async (id) => {
    setIsLoading(true);

    try {
      const res = await axios.delete(
        `http://localhost:5000/room/delete/${id}`,
        config
      );
      console.log(res);

      if (res) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
      window.location.reload();
    } catch (err) {
      console.log(err);
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
            <div className="d-flex justify-content-between">
              <div className="">
                <strong className="firstTitle">
                  Dashboard /{" "}
                  <span className="text-muted fw-bold">Manage Rooms</span>
                </strong>
              </div>
              <div className="addbtn">
                <Link to="/adrooms">
                  <button className="btn__add">Add Rooms</button>
                </Link>
              </div>
            </div>

            <div className="adDash">
              {/* hotels table */}
              <div className="row">
                <div className="col-md-12">
                  <div className="tableWrapprer">
                    <p className="starTitle">Rooms list</p>
                    <table className="table border">
                      <thead>
                        <tr className="text-center">
                          <th className="thead" scope="col">
                            NAME
                          </th>
                          <th className="thead" scope="col">
                            MAX PEOPLE
                          </th>
                          <th className="thead" scope="col">
                            DESCRIPTION
                          </th>
                          <th className="thead" scope="col">
                            ROOM NUMBER
                          </th>
                          <th className="thead" scope="col">
                            PRICE
                          </th>
                          <th className="thead" scope="col">
                            ACTIONS
                          </th>
                        </tr>
                      </thead>
                      {data.map((item) => (
                        <tbody className="tbody" key={item._id}>
                          <tr className="trow">
                            <td data-title="NAME" className="tdata">
                              {item.title}
                            </td>
                            <td data-title="MAX PEOPLE" className="tdata">
                              {item.maxPeople}
                            </td>
                            <td data-title="DESCRIPTION" className="tdata">
                              {item.desc}
                            </td>
                            <td data-title="ROOM NUMBER" className="tdata">
                              {item.roomNumbers.map((s) => s.number)}
                              {item.rooms}
                            </td>
                            <td data-title="RATING" className="tdata">
                              {item.price}
                            </td>
                            <td data-title="ACTIONS" className="tdata">
                              <div className="action">
                                <Link to={`/singeRoomView/${item._id}`}>
                                  <button className="btnEdit">
                                    <i className="fa-solid fa-eye"></i>
                                  </button>
                                </Link>
                                <button className="btnDelete">
                                  <i
                                    className="fa-solid fa-trash"
                                    onClick={() => handleDelete(item._id)}
                                  ></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                          <div id="loader">{isLoading && <Loader />}</div>
                        </tbody>
                      ))}
                    </table>
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

export default NewRoom;
