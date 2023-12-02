import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'

const AddAdmin = () => {
    const [file, setFile] = useState('')
    const [data, setData] = useState([])
    // console.log(data)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState('');

    // FETCH USER DATA FROM DATABASE
    useEffect(() => {
        fetch("https://hotel-server-beryl.vercel.app/auth/allUsers", {
            method: "GET",
            headers: {
                token: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                // Authorization: `Bearer ${token}`,
            },

        })
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                // console.log(data)
            });

    }, []);


    // FORM SUBMIT 
    const config = {
        headers: { token: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        try {
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/rahatdev1020/image/upload", data)
            // console.log(uploadRes.data.url)
            const { url } = uploadRes.data
            // console.log(url)
            const userObj = {

                username,
                email,
                password,
                img: url,
                isAdmin
            }
            console.log(userObj)
            const res = await axios.post("https://hotel-server-beryl.vercel.app/auth/register", userObj, config)
            console.log(res.data)
            res && Swal.fire({
                icon: 'success',
                title: 'User addedd',
                text: 'Your user add successfully',
            })

        } catch (e) {

            console.log(e)
        }


        // console.log(userObj)
    }
    return (
        <div className="ad">
            <Topbar/>
            <Sidebar/>
            <div className="admin">
                <div className="adminDash">
                    <div className="titleContainer">
                        {/* numbers card */}
                        <div className="adDash">
                            {/* ADD ADMIN */}
                            <div className="TeacherAdd">
                                <div className="teacherTitle">
                                    <div className="colLeft">
                                        <strong className="firstTitle">Dashboard / <span className="scndTitle">add admin</span></strong>
                                    </div>
                                </div>

                                {/* Teacher add forms */}
                                <div className="mt-3">
                                    <div className="Tadd">
                                        {/* basic details */}
                                        <>
                                            <div className="bdtails">
                                                <h4>Basic Details</h4>
                                                <div className="line" />
                                            </div>
                                            <form className="row g-3" onSubmit={handleSubmit}>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputEmail4" className="form-label">Name</label>
                                                    <input type="text" className="form-control" id="inputEmail4" onChange={(e) => setUsername(e.target.value)} placeholder="name" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputPassword4" className="form-label">Email</label>
                                                    <input type="text" className="form-control" id="inputPassword4" onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                                                    <input type="text" className="form-control" id="inputPassword4" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputCity" className="form-label">Is Admin</label>
                                                    <select id="featured" className="form-control" onChange={(e) => setIsAdmin(e.target.value)}>
                                                        <option value={false} onChange={(e) => setIsAdmin(e.target.value)}>No</option>
                                                        <option value={true} onChange={(e) => setIsAdmin(e.target.value)}>Yes</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-12">
                                                    <label htmlFor="inputZip" className="form-label">Admin Image</label>
                                                    <div className="d-flex justify-content-start align-items-start">
                                                        {file && (
                                                            <img className="regImg" src={URL.createObjectURL(file)} alt="" />
                                                        )}
                                                        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="form-control" />
                                                    </div>
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

export default AddAdmin