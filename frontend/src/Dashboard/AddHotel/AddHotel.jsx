import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar';
import Swal from 'sweetalert2';
import './AddHotel.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddHotel = () => {
    const [data, setData] = useState([])
    console.log(data)

    // FETCH HOTEL DATA FROM DATABASE

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/hotel/allhotels')
                console.log(res)
                setData(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    // FETCH ALL ROOMS FROM DATABASE
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await axios.get('https://hotel-server-beryl.vercel.app/room/getAllRooms')
    //             // console.log(res)
    //             setgetRooms(res.data)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     fetchData()
    // }, [])



    // DELETE HOTEL FROM THE LIST AND FROM THE DDATABASE
    const config = {
        headers: { token: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    };
    const handleDelete = async (_id) => {
        try {
            const deleted = await axios.delete(`http://localhost:5000/hotel/delete/${_id}`, config)
            console.log(deleted)
            deleted && Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
            setTimeout(() => {
                deleted && window.location.reload()
            }, [1000])
            return clearTimeout(setTimeout())
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div className="ad">
                <Topbar />
                <Sidebar />
                <div className="admin">
                    <div className="adminDash">
                        <div className="titleContainer">
                            <div className="d-flex justify-content-between">
                                <div className="">
                                    <strong className="firstTitle">Dashboard / <span className="text-muted fw-bold">Admin Add Hotels</span></strong>
                                </div>
                                <div className="addbtn">
                                    <Link to="/add">
                                        <button className="btn__add">Add Hotel</button>
                                    </Link>
                                </div>
                            </div>

                            <div className="adDash">
                                <div className="tableWrapprer">
                                    <p className="starTitle">Hotel list</p>
                                    <table className="table border">
                                        <thead>
                                            <tr className="text-center">
                                                <th className="thead" scope="col">NAME</th>
                                                <th className="thead" scope="col">TYPE</th>
                                                <th className="thead" scope="col">ADDRESS</th>
                                                <th className="thead" scope="col">CITY</th>
                                                <th className="thead" scope="col">RATING</th>
                                                <th className="thead" scope="col">PHOTO</th>
                                                <th className="thead" scope="col">ACTIONS</th>
                                            </tr>
                                        </thead>
                                        {
                                            data.map(item => (
                                                <tbody className="tbody" key={item._id}>
                                                    <tr className="trow">
                                                        <td data-title="NAME" className="tdata">{item.name}</td>
                                                        <td data-title="TYPE" className="tdata">{item.type}</td>
                                                        <td data-title="ADDRESS" className="tdata">{item.address}</td>
                                                        <td data-title="CITY" className="tdata">{item.city}</td>
                                                        <td data-title="RATING" className="tdata">{item.rating}</td>
                                                        <td data-title="PHOTO" className="tdata">
                                                            <img src={item.photos ? item.photos[0] : "images not found"} alt="hotel-img" className="regImg" />
                                                        </td>
                                                        <td data-title="ACTIONS" className="tdata">
                                                            <div className="action">
                                                                <Link to={`/singleHotel/${item._id}`} className="link">
                                                                    <button className="btnEdit"><i className="fa-solid fa-eye"></i></button>
                                                                </Link>
                                                                <button className="btnDelete"  onClick={() => handleDelete(item._id)}>
                                                                    <i className="fa-solid fa-trash"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ))
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddHotel