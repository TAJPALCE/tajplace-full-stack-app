import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar';
import './Admin.css';

const   Admin = () => {
    const [data, setData] = useState([])
    // console.log(data)

    // FETCH USER DATA FROM DATABASE
    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/auth/allUsers", config)
                setData(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()

    }, []);




    // DELETE USERs AND ADMINs
    const config = {
        headers: { token: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    };
    const handleDeleteAdmin = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/auth/deleteuser/${id}`, config)
            res && Swal.fire({
                icon: 'success',
                title: 'User deleted',
            })
            setTimeout(() => {
                window.location.reload();
            },[1000])
            return clearTimeout(setTimeout())
        } catch (e) {
            console.log(e)
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
                                <strong className="firstTitle">Dashboard / <span className="text-muted fw-bold">Admin management</span></strong>
                            </div>
                            <div className="addbtn">
                                <Link to="/addadmins">
                                    <button className="btn__add">Add Admin</button>
                                </Link>
                            </div>
                        </div>

                        <div className="adDash">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="tableWrapprer">
                                        <p className="starTitle">Admins and users list</p>
                                        <table className="table border">
                                            <thead>
                                                <tr className="text-center">
                                                    <th className="thead" scope="col">NAME</th>
                                                    <th className="thead" scope="col">EMAIL</th>
                                                    <th className="thead" scope="col">ADDRESS</th>
                                                    <th className="thead" scope="col">ADMIN</th>
                                                    <th className="thead" scope="col">PHONE</th>
                                                    <th className="thead" scope="col">PHOTO</th>
                                                    <th className="thead" scope="col">ACTIONS</th>
                                                </tr>
                                            </thead>
                                            {
                                                data.map(item => (
                                                    <tbody className="tbody" key={item._id}>
                                                        <tr className="trow">
                                                            <td data-title="NAME" className="tdata">{item.username}</td>
                                                            <td data-title="EMAIL" className="tdata">{item.email}</td>
                                                            <td data-title="ADDRESS" className="tdata">N/A</td>
                                                            <td data-title="TITLE" className="tdata">{item.isAdmin ? "Yes" : "No"}</td>
                                                            <td data-title="RATING" className="tdata">{item.phone ? item.phone : "N/A"}</td>
                                                            <td data-title="PHOTO" className="tdata">
                                                                <img src={item.img} alt="user-img" className="regImg" />
                                                            </td>
                                                            <td data-title="ACTIONS" className="tdata">
                                                                <div className="action">
                                                                    <Link to={`/singleUsers/${item._id}`} className="link">
                                                                        <button className="btnEdit"><i className="fa-solid fa-eye"></i></button>
                                                                    </Link>
                                                                    <button className="btnDelete" onClick={() => handleDeleteAdmin(item._id)}><i className="fa-solid fa-trash"></i></button>
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

export default Admin



