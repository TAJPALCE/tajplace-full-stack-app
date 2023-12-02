import axios from 'axios';
import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar';

const AddReview = () => {
    const [data, setData] = useState([])
    const [text, setText] = useState('')    
    // FORM SUBMIT 
    const { user } = useContext(AuthContext)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userObj = {
                username: user.username,
                email: user.email,
                img: user.img,
                text,
            }
            console.log(userObj)

            const res = await axios.post("http://localhost:5000/review/addReview", userObj)
            res && Swal.fire({
                icon: 'success',
                title: 'Review added',
                text: 'Your review added successfully',
            })

        } catch (e) {
            console.log(e)
            e && Swal.fire({
                icon: 'error',
                title: 'Wrong credentials',
                text: 'email and name should be unique',
            })
        }
    }

    return (
        <div className="ad">
            <Topbar />
            <Sidebar />
            <div className="admin">
                <div className="adminDash">
                    <div className="titleContainer">
                        <h3 className="title">Welcome {user.username}!</h3>
                        <div className="adDash">
                            <div className="TeacherAdd">
                                <div className="teacherTitle">
                                    <div className="colLeft">
                                        <h5 className="title">Add your Review</h5>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="Tadd">
                                        <>
                                            <div className="bdtails">
                                                <div className="line" />
                                            </div>
                                            <form className="row g-3" onSubmit={handleSubmit}>
                                                <div className="col-md-2">
                                                    <label htmlFor="inputZip" className="form-label">{user.username} Image</label>
                                                    <div className="d-flex justify-content-start align-items-start">
                                                        <img src={user.img} alt="user-img" className="img-fluid form-control" style={{ width: '5rem' }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="inputEmail4" className="form-label">Name</label>
                                                    <input type="text" className="form-control" id="inputEmail4" placeholder="name" defaultValue={user.username} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputPassword4" className="form-label">Email</label>
                                                    <input type="text" className="form-control" id="inputPassword4" placeholder="email" defaultValue={user.email} />
                                                </div>
                                                <div className="col-md-12">
                                                    <label htmlFor="inputPassword4" className="form-label">Text</label>
                                                    <textarea type="text" className="form-control" id="inputPassword4" onChange={(e) => setText(e.target.value)} placeholder="your review text" />
                                                </div>
                                                <div className="col-12 mb-4">
                                                    <button type="submit" className="btn btn-warning text-white fw-bold">Submit</button>
                                                </div>
                                            </form>
                                        </>
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

export default AddReview



