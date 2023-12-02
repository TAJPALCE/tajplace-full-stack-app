import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar';


const Booked = () => {
    const [data, setData] = useState([])
    console.log(data)
    const { user } = useContext(AuthContext)
    // console.log(user.email)
    // FETCH USER DATA FROM DATABASE
    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/order/booked?email=${user.email}`)
                setData(res.data)
                // console.log(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()

    }, [user.email]);

    //DELETE BOOKED ROOM 
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/order/delete/${id}`);

            res && Swal.fire({
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
                window.location.reload();
            }, [1000])
            return clearTimeout(setTimeout())
        } catch (err) {

        }
    }
    return (
        <div className="ad">
            <Topbar />
            <Sidebar />
            <div className="admin">
                <div className="adminDash">
                    <div className="titleContainer">
                        <div className="d-flex justify-content-between">
                            <div className="">
                                <strong className="firstTitle">Dashboard / <span className="text-muted fw-bold">Hotel booked</span></strong>
                            </div>
                        </div>

                        <div className="adDash">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="tableWrapprer">
                                        <p className="starTitle">{user.username} booked list</p>
                                        <table className="table border">
                                            <thead>
                                                <tr className="text-center">
                                                    <th className="thead" scope="col">EMAIL</th>
                                                    <th className="thead" scope="col">ROOM ID</th>
                                                    <th className="thead" scope="col">ROOM BOOKED</th>
                                                    <th className="thead" scope="col">HOTEL</th>
                                                    <th className="thead" scope="col">ACTIONS</th>
                                                </tr>
                                            </thead>
                                            {
                                                data?.map(item => (
                                                    <tbody className="tbody" key={item._id}>
                                                        <tr className="trow">
                                                            <td data-title="EMAIL" className="tdata">{item?.email}</td>
                                                            <td data-title="ROOM ID" className="tdata">{item?.roomId}</td>
                                                            <td data-title="ROOM BOOKED" className="tdata">
                                                                {item.product ? item.product[0] : "not found"}
                                                            </td>
                                                            <td data-title="ROOM BOOKED" className="tdata">{item.hotel ? item.hotel : "not found"}</td>

                                                            <td data-title="ACTIONS" className="tdata">
                                                                <div className="action">

                                                                    <Link to={`/bookedRoom/${item.roomId}`} className="link">
                                                                        <button className="btnEdit"><i className="fa-solid fa-eye"></i></button>
                                                                    </Link>
                                                                    <button className="btnDelete" onClick={() => handleDelete(item._id)}><i className="fa-solid fa-trash"></i></button>
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
        </div>
    )
}

export default Booked



