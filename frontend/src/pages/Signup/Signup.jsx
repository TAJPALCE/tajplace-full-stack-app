import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from '../../components/Footer/Footer';
import GlobalNav from '../../components/GlobalNav/GlobalNav';
import './Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [file, setFile] = useState('');

    const navigate = useNavigate()
    const handleClick = async (e) => {
        e.preventDefault()

        // conditional 
        if (!username || !email || !password || !confirmPassword || !file) {
            return Swal.fire({
                icon: 'error',
                title: 'Feild can not be empty',
                text: 'Please fill all the fields',
            })
        }
        
        if(confirmPassword !== password) {
            return Swal.fire({
                icon: 'error',
                title: 'Confirm password not matched',
            })
        }

        // file appending and sending to the cloudinary
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "yasinCloud");
        // const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/rahatdev1020/image/upload", data)
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/hotelroombooking/image/upload", data)
        const { url } = uploadRes.data
        const userObj = {
            username,
            email,
            password,
            img: url,
        }
        console.log(userObj)
       
        try {
            // const res = await axios.post("https://hotel-server-beryl.vercel.app/auth/register", userObj);
            const res = await axios.post("http://localhost:5000/auth/register", userObj);
            Swal.fire({
                icon: 'success',
                title: `${res.statusText}`,
                text: 'Signed in successfully!',
            })
            navigate("/login")
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Sign in failed',
                text: 'Feild can be empty',
            })
        }
    };

    return (
        <>
            <GlobalNav />
            <div className="login">
                <div className="lContainer">
                    <h5>Welcome to <strong>Taj Palace</strong></h5>
                    <form className="form signup__form">
                        <input
                            type="text"
                            placeholder="username"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="lInput form-control"
                        />
                        <input
                            type="email"
                            placeholder="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="lInput form-control"
                        />
                        <input
                            type="password"
                            placeholder="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="lInput form-control"
                        />
                        <input
                            type="password"
                            placeholder="confirm password"
                            id="confirm"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="lInput form-control"
                        />
                        <input
                            type="file"
                            placeholder="img"
                            id="img`"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="form-control"
                        />
                        <button onClick={handleClick} className="lButton mt-2">
                            Sign up
                        </button>
                    </form>
                    <div className="forgot">
                        <span className="stext">Already have an account? <Link to="/login">Login</Link> </span>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Signup