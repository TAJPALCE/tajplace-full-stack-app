import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const AllBookings = () => {
  const [data, setData] = useState([]);
  console.log(data);
  const { user } = useContext(AuthContext);
  console.log(user.email);
  // FETCH USER DATA FROM DATABASE
  const config = {
    headers: { token: `Bearer ${JSON.parse(localStorage.getItem("token"))}` },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/order/get", config);
        setData(res.data);
        console.log(res.data[0].currentbookings);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  //DELETE BOOKED ROOM
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/order/delete/${id}`
      );

      res &&
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      setTimeout(() => {
        window.location.reload();
      }, [1000]);
      return clearTimeout(setTimeout());
    } catch (err) {}
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
                  <span className="text-muted fw-bold">Hotel booked</span>
                </strong>
              </div>
              {/* <div className="addbtn">
                                <Link to="/addadmins">
                                    <button className="btn__add">Add Admin</button>
                                </Link>
                            </div> */}
            </div>

            <div className="adDash">
              <div className="row">
                <div className="col-md-12">
                  <div
                    className="tableWrapprer"
                    style={{ overflowX: "auto", overflowY: "auto" }}
                  >
                    <p className="starTitle">All booked list</p>
                    <table className="table border" style={{ width: "100%" }}>
                      <thead>
                        <tr className="text-center">
                          <th className="thead border-1 ps-5 pe-5" scope="col">
                            EMAIL
                          </th>
                          <th className="thead border-1 ps-5 pe-5" scope="col">
                            NAME
                          </th>

                          <th className="thead border-1 ps-5 pe-5" scope="col">
                            AMOUNT
                          </th>
                          <th className="thead border-1 ps-5 pe-5" scope="col">
                            DATE
                          </th>
                          <th className="thead border-1 ps-5 pe-5" scope="col">
                            STAYS
                          </th>
                          <th className="thead border-1 ps-5 pe-5" scope="col">
                            TOTAL ROOMS
                          </th>
                          <th className="thead border-1 ps-5 pe-5" scope="col">
                            ROOM DETAIL
                          </th>
                          <th className="thead border-1 ps-5 pe-5" scope="col">
                            BREAKFAST
                          </th>
                          <th className="thead border-1 ps-5 pe-5" scope="col">
                            LUNCH
                          </th>
                          <th className="thead border-1 ps-5 pe-5" scope="col">
                            DINNER
                          </th>
                          <th className="thead border-1 ps-5 pe-5" scope="col">
                            MINERAL
                          </th>
                          <th className="thead border-1 ps-5 pe-5" scope="col">
                            AC
                          </th>
                          <th className="thead border-1 ps-5 pe-5" scope="col">
                            HEATER
                          </th>
                          <th className="thead border-1 ps-5 pe-5" scope="col">
                            FOAM
                          </th>
                          <th className="thead" scope="col">
                            F.QUANTITY
                          </th>
                          {/* <th className="thead" scope="col">
                            ACTIONS
                          </th> */}
                        </tr>
                      </thead>
                      {data.map((item) => (
                        <tbody className="tbody" key={item._id}>
                          {item.currentbookings.map((booking) => (
                            <tr className="trow" key={booking.bookingId}>
                              <td data-title="EMAIL" className="tdata border-1">
                                {booking.userEmail}
                              </td>
                              <td data-title="EMAIL" className="tdata border-1">
                                {booking.userName}
                              </td>
                              <td
                                data-title="TOTALAMOUNT"
                                className="tdata border-1"
                              >
                                {booking.totalAmount}
                              </td>
                              <td
                                data-title="ROOM BOOKED"
                                className="tdata border-1"
                              >
                                {booking.fromdate && booking.todate
                                  ? `${booking.fromdate} to ${booking.todate}`
                                  : "not found"}
                              </td>
                              <td
                                data-title="ROOM ID"
                                className="tdata border-1"
                              >
                                {booking.totaldays
                                  ? `${booking.totaldays}`
                                  : "not found"}
                              </td>
                              <td
                                data-title="ROOM BOOKED"
                                className="tdata border-1"
                              >
                                {JSON.parse(booking.selectedRooms).reduce(
                                  (accum, acc) => accum + acc.quantity,
                                  0
                                )}
                              </td>

                              <td data-title="ROOM BOOKED" className="tdata">
                                {JSON.parse(booking.selectedRooms).reduce(
                                  (accum, acc) =>
                                    acc.title
                                      ? accum +
                                        "," +
                                        acc.title +
                                        "(" +
                                        acc.quantity +
                                        ")"
                                      : "",
                                  ""
                                )}
                              </td>
                              <td
                                data-title="ROOM ID"
                                className="tdata border-1"
                              >
                                {booking.breakfast
                                  ? `${booking.breakfast}`
                                  : "not found"}
                              </td>
                              <td
                                data-title="ROOM ID"
                                className="tdata border-1"
                              >
                                {booking.lunch
                                  ? `${booking.lunch}`
                                  : "not found"}
                              </td>
                              <td
                                data-title="ROOM ID"
                                className="tdata border-1"
                              >
                                {booking.dinner
                                  ? `${booking.dinner}`
                                  : "not found"}
                              </td>
                              <td
                                data-title="ROOM ID"
                                className="tdata border-1"
                              >
                                {booking.mineral
                                  ? `${booking.mineral}`
                                  : "not found"}
                              </td>
                              <td
                                data-title="ROOM ID"
                                className="tdata border-1"
                              >
                                {booking.ac ? `${booking.ac}` : "not found"}
                              </td>
                              <td
                                data-title="ROOM ID"
                                className="tdata border-1"
                              >
                                {booking.heater
                                  ? `${booking.heater}`
                                  : "not found"}
                              </td>
                              <td
                                data-title="ROOM ID"
                                className="tdata border-1"
                              >
                                {booking.foam ? `${booking.foam}` : "not found"}
                              </td>
                              <td
                                data-title="ROOM ID"
                                className="tdata border-1"
                              >
                                {booking.foamQuantity
                                  ? `${booking.foamQuantity}`
                                  : "not found"}
                              </td>
                            </tr>
                          ))}

                          <td data-title="ACTIONS" className="tdata border-1">
                            <div className="action">
                              {/* <Link to={`/bookedRoom/${item.product? item.product[1] : "undefined"}`} className="link">
                                                                        <button className="btnEdit"><i className="fa-solid fa-eye"></i></button>
                                                                    </Link> */}

                              {/* <Link
                                  to={`/bookedRoom/${item.roomId}`}
                                  className="link"
                                >
                                  <button className="btnEdit">
                                    <i className="fa-solid fa-eye"></i>
                                  </button>
                                </Link> */}
                              {/* <button
                                  className="btnDelete"
                                  onClick={() => handleDelete(item._id)}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button> */}
                            </div>
                          </td>
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

export default AllBookings;
