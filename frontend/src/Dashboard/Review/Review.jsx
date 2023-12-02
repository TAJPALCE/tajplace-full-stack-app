import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar';
import { Link } from 'react-router-dom';

const Review = () => {
    const [data, setData] = useState([])
    const { user } = useContext(AuthContext)

    //GET ALL REVIEW
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/review/getReview')
                console.log(res)
                setData(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])
    
    return (
        <div className="ad">
            <Topbar />
            <Sidebar />
            <div className="admin">
                <div className="adminDash">
                    <div className="titleContainer">
                        <div className="d-flex justify-content-between">
                            <div className="">
                                <h3 className="title">Welcome {user.username}!</h3>
                                <strong className="firstTitle">Dashboard / <span className="text-muted fw-bold">Others reviews</span></strong>
                            </div>
                            <div className="addbtn">
                                <Link to="/addReviews">
                                    <button className="btn__add">Add Review</button>
                                </Link>
                            </div>
                        </div>
                        <div className="adDash">
                            <div className="tableWrapprer">
                                <p className="starTitle">All Review lists</p>
                                <table className="table border">
                                    <thead>
                                        <tr className="text-center">
                                            <th className="thead" scope="col">NAME</th>
                                            <th className="thead" scope="col">EMAIL</th>
                                            <th className="thead" scope="col">IMAGE</th>
                                            <th className="thead" scope="col">REVIEW</th>
                                        </tr>
                                    </thead>
                                    {
                                        data.map(item => (
                                            <tbody className="tbody" key={item._id}>
                                                <tr className="trow">
                                                    <td data-title="NAME" className="tdata">{item.username}</td>
                                                    <td data-title="EMAIL" className="tdata">{item.email}</td>
                                                    <td data-title="IMAGE" className="tdata">
                                                        <img src={item.img} alt="" className="regImg d-flex justify-content-center align-items-center" />
                                                    </td>
                                                    <td data-title="REVIEW" className="tdata">{item.text}</td>
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

export default Review



