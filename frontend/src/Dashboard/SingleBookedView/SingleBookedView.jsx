import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar';

const SingleBookedView = () => {
    const [data, setData] = useState([])
    console.log(data)
    const { user } = useContext(AuthContext)
    const { hotel } = useParams()
    // console.log(hotel)

    // FETCH BOOKED HOTEL DATA FROM DATABASE
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/order/bookedRoom/${hotel}`)
                // const res = await axios.get(`https://hotel-server-beryl.vercel.app/hotel/room/${hotel}`)
                setData(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()

    }, [hotel]);

   
      
    return (
        <div className="ad">
            <Topbar />
            <Sidebar />
            <div className="single">
                <div className="adminDash">
                    <div className="titleContainer">
                        <h3 className="title">Welcome {user.username}!</h3>
                        <div className="adDash">
                            <div className="TeacherAdd">
                                <div className="teacherTitle">
                                    <div className="colLeft">
                                        <strong className="firstTitle">Dashboard / <span className="scndTitle">Booked view</span></strong>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <div className="Single__form">
                                        <div className="d-flex justify-content-between">
                                            <p className="starTitle">Booking Details</p>

                                        </div>
                                        <table className="table border">
                                            <thead>
                                                <tr className="text-center">
                                                    <th className="thead" scope="col">ROOM NUMBER</th>
                                                    <th className="thead" scope="col">STAY DATES</th>
                                                    <th className="thead" scope="col">ID</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tbody">
                                                {
                                                    data.map((item, index)=> (
                                                        <tr className="trow" key={index}>
                                                            <td data-title="ROOM NUMBER" className="tdata">{item.number}</td>
                                                            <td data-title="STAY DATES" className="tdata">
                                                                {item.unavailableDates ? item.unavailableDates[0] : ""} , {item.unavailableDates ? item.unavailableDates[1] : ""} 
                                                            </td>
                                                            <td data-title="ID" className="tdata">${item._id} </td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>

                                        {/* <div className="singleRest__info mt-2">
                                            <strong className="border-bottom">Room Number object 1</strong>
                                            <p>{roomNumbers ? roomNumbers[0].number : ""}</p>
                                            <p>{roomNumbers ? roomNumbers[0].unavailableDates : "unavailableDates not fetched"}</p>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleBookedView