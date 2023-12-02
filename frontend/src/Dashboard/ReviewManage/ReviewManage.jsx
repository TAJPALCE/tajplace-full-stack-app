import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
// import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar';

const ReviewManage = () => {
    const [data, setData] = useState([])
    // console.log(data)

    // FETCH REVIEW DATA FROM DATABASE
    const config = {
        headers: { token: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    };
    useEffect(() => {
        fetch("http://localhost:5000/review/getReview", {
            method: "GET",
            headers: {
                token: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },

        })
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                // console.log(data)
            });

    }, []);



    // DELETE USER AND ADMIN
    const handleDeleteAdmin = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/review/delete/${id}`, config)
            res && Swal.fire({
                icon: 'success',
                title: 'Review deleted',
            })
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
                        <strong className="firstTitle">Dashboard / <span className="text-muted fw-bold">Review management</span></strong>

                        <div className="adDash">
                                <div className="tableWrapprer">
                                    <p className="starTitle">Reviews list</p>
                                    <table className="table border">
                                        <thead>
                                            <tr className="text-center">
                                                <th className="thead" scope="col">NAME</th>
                                                <th className="thead" scope="col">EMAIL</th>
                                                <th className="thead" scope="col">PHOTO</th>
                                                <th className="thead" scope="col">REVIEW</th>
                                                <th className="thead" scope="col">ACTIONS</th>
                                            </tr>
                                        </thead>
                                        {
                                            data.map(item => (
                                                <tbody className="tbody" key={item._id}>
                                                    <tr className="trow">
                                                        <td data-title="NAME" className="tdata">{item.username}</td>
                                                        <td data-title="EMAIL" className="tdata">{item.email}</td>
                                                        <td data-title="PHOTO" className="tdata">
                                                            <img src={item.img} alt="img" className="regImg" />
                                                        </td>
                                                        <td data-title="REVIEW" className="tdata">{item.text}</td>

                                                        <td data-title="ACTIONS" className="tdata">
                                                            <div className="action">
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
    )
}

export default ReviewManage



