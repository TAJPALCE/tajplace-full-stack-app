import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar';
import "./SingleUserView.css";

const SingleUserView = () => {
    const { id } = useParams()
    const [updated, setUpdated] = useState(false)
    const [data, setData] = useState([])
    const [showpass, hidepass] = useState(false)
    const [file, setFile] = useState('')

    const config = {
        headers: { token: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/auth/user/${id}`, config)
                setData(res.data)

            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [id])

    // DELETE USERS
    const [username, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    // console.log(user.img)

    const handleUpdate = async () => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "mycloud");
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/hotelroombooking/image/upload", data)
        const { url } = uploadRes.data

        const userObj = {
            userId: user._id,
            img: url,
            username,
            email,
            password
        }
        try {
            const res = await axios.put(`https://localhost:5000/auth/updateUser/${id}`, userObj, config)
            res && Swal.fire({
                icon: 'success',
                title: 'User updated successfully'
            })
            navigate("/login")
        } catch (err) {
            console.log(err)
        }
    }

    // SHOW AND HIDE PASSWORD
    const pass = () => {
        hidepass(true)
    }
    const hide = () => {
        hidepass(false)
    }
    return (
        <div className="ad">
            <Topbar />
            <Sidebar />
            <div className="single">
                <div className="adminDash">
                    <div className="titleContainer">
                        <p className="title">Welcome {user.username}!</p>
                        <strong className="firstTitle">Dashboard / <span className="text-muted fw-bold">Single user view</span></strong>
                        <div className="adDash">
                            <div className="TeacherAdd">
                                <div className="mt-3">
                                    <div className="Single__form">
                                        <div className="d-flex justify-content-between">
                                            <p className="starTitle border-bottom">User Details</p>
                                            <p>
                                                {

                                                    updated ? <button className="btnEdit" onClick={() => setUpdated(false)}><i className="fa-solid fa-close"></i></button>
                                                        :
                                                        <button className="btnEdit" onClick={() => setUpdated(true)}><i className="fa-solid fa-pen"></i></button>


                                                }
                                            </p>

                                        </div>

                                        <div className="single__user">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="Suserimg__container">
                                                        {
                                                            updated ?
                                                                <input
                                                                    type="file"
                                                                    placeholder="img"
                                                                    id="img`"
                                                                    onChange={(e) => setFile(e.target.files[0])}
                                                                    className="form-control"
                                                                />
                                                                :
                                                                <img src={data.img} alt="" className="single__img shadow rounded" />
                                                        }

                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="Suser__data">
                                                        <div className="Sleft__user">
                                                            <strong>Name:</strong>
                                                            <strong>Email:</strong>
                                                            <strong>Admin:</strong>
                                                            <strong>Phone:</strong>
                                                            <strong>Address:</strong>
                                                            <strong>Password:</strong>
                                                        </div>
                                                        <div className="Sleft__user">
                                                            <span className="Suser__cl">
                                                                {
                                                                    updated ?
                                                                        <input type="text" className="name" autoFocus defaultValue={data.username}
                                                                            onChange={(e) => setName(e.target.value)} />
                                                                        :
                                                                        `${data.username}`
                                                                }

                                                            </span>
                                                            <span className="Suser__cl">
                                                                {
                                                                    updated ?
                                                                        <input type="text" className="name" autoFocus defaultValue={data.email}
                                                                            onChange={(e) => setEmail(e.target.value)} />
                                                                        :
                                                                        `${data.email}`
                                                                }
                                                            </span>
                                                            <span className="Suser__cl">{data.isAdmin ? "true" : "false"}</span>
                                                            <span className="Suser__cl">N/A</span>
                                                            <span className="Suser__cl">N/A</span>
                                                            <span className="Suser__cl">
                                                                {
                                                                    updated ?
                                                                        <textarea type="text" className="single__pass" autoFocus defaultValue={data.password}
                                                                            onChange={(e) => setPassword(e.target.value)} />
                                                                        :
                                                                        <>
                                                                            {
                                                                                showpass ?
                                                                                    <span onClick={hide} className="hidepass"> `${data.password}`  </span>
                                                                                    :
                                                                                    <span onClick={pass} className="showpass">show pass</span>

                                                                            }
                                                                        </>
                                                                }

                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            updated ?
                                                <button className="btn btn-warning text-white mt-4" onClick={handleUpdate}>Update</button>
                                                :
                                                " "
                                        }
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

export default SingleUserView;