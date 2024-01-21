import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const Booked = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(data);
  // FETCH USER DATA FROM DATABASE

  let email = user.email;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/order/booked?email=${encodeURIComponent(
            email
          )}`
        );

        setData(res.data[0].currentbookings);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [email]);

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
            </div>

            <div className="adDash">
              <div className="row">
                <div className="col-md-12">
                  <div
                    className="tableWrapprer"
                    style={{ overflowX: "auto", overflowY: "auto" }}
                  >
                    <p className="starTitle">{user.username} booked list</p>
                    <table className="table border">
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
                            QUANTITY
                          </th>
                          {/* <th className="thead" scope="col">
                            ROOM ID
                          </th> */}
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
                      {data?.map((item) => (
                        <tbody className="tbody" key={item.userid}>
                          <tr className="trow">
                            <td data-title="EMAIL" className="tdata border-1">
                              {item?.userEmail}
                            </td>
                            <td data-title="EMAIL" className="tdata border-1">
                              {item?.userName}
                            </td>

                            <td
                              data-title="ROOM quantity"
                              className="tdata border-1"
                            >
                              {item?.totalAmount}
                            </td>

                            <td
                              data-title="ROOM quantity"
                              className="tdata border-1"
                            >
                              {item?.fromdate} to {item?.fromdate}
                            </td>
                            <td data-title="ROOM ID" className="tdata border-1">
                              {item?.totaldays}
                            </td>
                            <td
                              data-title="ROOM quantity"
                              className="tdata border-1"
                            >
                              {JSON.parse(item?.selectedRooms).reduce(
                                (accum, acc) =>
                                  accum +
                                  "," +
                                  acc.title +
                                  "(" +
                                  acc.quantity +
                                  ")",
                                ""
                              )}
                            </td>
                            <td
                              data-title="ROOM quantity"
                              className="tdata border-1"
                            >
                              {item?.breakfast}
                            </td>
                            <td
                              data-title="ROOM quantity"
                              className="tdata border-1"
                            >
                              {item?.lunch}
                            </td>
                            <td
                              data-title="ROOM quantity"
                              className="tdata border-1"
                            >
                              {item?.dinner}
                            </td>
                            <td
                              data-title="ROOM quantity"
                              className="tdata border-1"
                            >
                              {item?.mineral}
                            </td>
                            <td
                              data-title="ROOM quantity"
                              className="tdata border-1"
                            >
                              {item?.ac}
                            </td>
                            <td
                              data-title="ROOM quantity"
                              className="tdata border-1"
                            >
                              {item?.heater}
                            </td>
                            <td
                              data-title="ROOM quantity"
                              className="tdata border-1"
                            >
                              {item?.foam}
                            </td>
                            <td
                              data-title="ROOM quantity"
                              className="tdata border-1"
                            >
                              {item?.foamQuantity}
                            </td>
                            {user.isAdmin && (
                              <td
                                data-title="ACTIONS"
                                className="tdata border-1"
                              >
                                <div className="action">
                                  <Link
                                    to={`/bookedRoom/${item.roomId}`}
                                    className="link"
                                  >
                                    <button className="btnEdit">
                                      <i className="fa-solid fa-eye"></i>
                                    </button>
                                  </Link>
                                  <button
                                    className="btnDelete"
                                    onClick={() => handleDelete(item._id)}
                                  >
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            )}
                          </tr>
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

export default Booked;
