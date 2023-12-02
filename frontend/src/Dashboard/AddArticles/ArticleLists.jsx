import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ArticleLists = () => {
    const [data, setData] = useState([])
    console.log(data)

    // FETCH article DATA FROM DATABASE
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/article/get')
                // console.log(res)
                setData(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])


    // DELETE article FROM THE LIST AND FROM THE DDATABASE
    const config = {
        headers: { token: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    };
    const handleDelete = async (id) => {
        try {
            const deleted = await axios.delete(`http://localhost:5000/article/delete/${id}`, config)
            console.log(deleted)
            deleted && Swal.fire({
                icon: 'success',
                title: 'Article Deleted',
            })
            setTimeout(() => {
                window.location.reload();
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
                                    <strong className="firstTitle">Dashboard / <span className="text-muted fw-bold">Add Articles</span></strong>
                                </div>
                                <div className="addbtn">
                                    <Link to="/addArticles">
                                        <button className="btn__add">Add Articles</button>
                                    </Link>
                                </div>
                            </div>

                            <div className="adDash">
                                <div className="tableWrapprer">
                                    <p className="starTitle">Articles list</p>
                                    <table className="table border">
                                        <thead>
                                            <tr className="text-center">
                                                <th className="thead" scope="col">HEADLINE</th>
                                                <th className="thead" scope="col">TITLE</th>
                                                <th className="thead" scope="col">PHOTO</th>
                                                <th className="thead" scope="col">ACTIONS</th>
                                            </tr>
                                        </thead>
                                        {
                                            data.map(item => (
                                                <tbody className="tbody" key={item._id}>
                                                    <tr className="trow">
                                                        <td data-title="HEADLINE" className="tdata">{item.headline}</td>
                                                        <td data-title="TITLE" className="tdata">{item.titleOne}</td>
                                                        <td data-title="PHOTO" className="tdata">
                                                            <img src={item.bgimg} alt="hotel-img" className="regImg" />
                                                        </td>
                                                        <td data-title="ACTIONS" className="tdata">
                                                            <div className="action">
                                                                <button className="btnDelete"><i className="fa-solid fa-trash"
                                                                 onClick={() => handleDelete(item._id)}></i></button>
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

export default ArticleLists