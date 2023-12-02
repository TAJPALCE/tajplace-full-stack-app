import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const Hotelsadd = () => {
    const [getrooms, setgetRooms] = useState([])
    // console.log(rooms)
    const navigate = useNavigate()
    // FETCH ALL ROOMS FROM DATABASE
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await axios.get('http://localhost:5000/room/getAllRooms', config)
    //             // console.log(res)
    //             setgetRooms(res.data)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     fetchData()
    // }, [])
    // SUBMIT FORM DATA TO THE DATABASE
    const [files, setFiles] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [city, setCity] = useState('')
    const [rooms, setRooms] = useState('')
    const [address, setAddress] = useState('')
    const [distance, setDistance] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [rating, setRating] = useState('')
    const [cheapestPrice, setCheapestPrice] = useState('')
    const [featured, setFeatured] = useState('')

    const config = {
        headers: { token: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    };

    // multiple rooms select frin options
    const handleSelect = async (e) => {
        const value = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setRooms(value);
        // console.log(value)
    }

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const list = await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "yasinCloud");
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/hotelroombooking/image/upload",
                        data
                    );

                    const { url } = uploadRes.data;
                    return url;
                })
            );
            console.log(files)

            const hotelObject = {
                name,
                type,
                city,
                rooms,
                address,
                distance,
                photos: list,
                title,
                desc,
                rating,
                cheapestPrice,
                featured
            }
            console.log(hotelObject)
            const res = await axios.post('http://localhost:5000/hotel/add', hotelObject, config);
            console.log(res.data)
            res && Swal.fire({
                icon: 'success',
                title: 'Hotel added',
                text: 'A new hotel added successfully',
            })
            navigate("/addhotel")
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
                        <div className="adDash">
                            <div className="TeacherAdd">

                                {/* Teacher add forms */}
                                <div className="mt-3">
                                    <div className="Tadd">
                                        {/* basic details */}
                                        <>
                                            <div className="bdtails">
                                                <h4>Hotel Details</h4>
                                                <div className="line" />
                                            </div>
                                            <form className="row g-3" onSubmit={handleSubmit}>
                                                <div className="col-md-3">
                                                    <label htmlFor="inputEmail4" className="form-label">Name</label>
                                                    <input type="text" className="form-control" id="inputEmail4" onChange={(e) => setName(e.target.value)} placeholder="hotel name" />
                                                </div>
                                                <div className="col-md-3">
                                                    <label htmlFor="inputPassword4" className="form-label">Type</label>
                                                    <input type="text" className="form-control" id="inputPassword4" onChange={(e) => setType(e.target.value)} placeholder="hotel type" />
                                                </div>
                                                <div className="col-md-3">
                                                    <label htmlFor="inputPassword4" className="form-label">City</label>
                                                    <input type="text" className="form-control" id="inputPassword4" onChange={(e) => setCity(e.target.value)} placeholder="city" />
                                                </div>
                                                <div className="col-md-3">
                                                    <label htmlFor="inputCity" className="form-label">Ratings</label>
                                                    <input type="number" className="form-control" id="inputCity" onChange={(e) => setRating(e.target.value)} placeholder="5" />
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="inputCity" className="form-label">Address</label>
                                                    <input type="text" className="form-control" id="inputCity" onChange={(e) => setAddress(e.target.value)} placeholder="hotel address" />
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="inputCity" className="form-label">Distance</label>
                                                    <input type="text" className="form-control" id="inputCity" onChange={(e) => setDistance(e.target.value)} placeholder="hotel distance" />
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="inputCity" className="form-label">Hotel Title</label>
                                                    <input type="text" className="form-control" id="inputCity" onChange={(e) => setTitle(e.target.value)} placeholder="hotel title" />
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="inputZip" className="form-label">Hotel Image</label>
                                                    <div className="d-flex justify-content-start align-items-start">
                                                        <input type="file" multiple onChange={(e) => setFiles(e.target.files)} className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="inputCity" className="form-label">Cheapest price</label>
                                                    <input type="text" className="form-control" id="inputCity" onChange={(e) => setCheapestPrice(e.target.value)} placeholder="Cheapest Price" />
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="inputCity" className="form-label">Featured</label>
                                                    <select id="featured" className="form-control" onChange={(e) => setFeatured(e.target.value)}>
                                                        <option value={false}>No</option>
                                                        <option value={true}>Yes</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-6">
                                                    <label htmlFor="inputCity" className="form-label">Description</label>
                                                    <textarea type="text" className="form-control" id="inputCity" onChange={(e) => setDesc(e.target.value)} placeholder="hotel descriptions" />
                                                </div>

                                                <div className="col-md-6">
                                                    <label htmlFor="inputCity" className="form-label">Rooms</label>
                                                    <input type="text" className="form-control" id="inputCity" onChange={(e)=>setRooms(e.target.value)} name="rooms" placeholder="hotel rooms" />
                                                    {/* <select id="rooms" multiple className="form-control" onChange={handleSelect}>
                                                        {getrooms.map((room) => (
                                                            <option key={room._id} value={room._id}>
                                                                {room.title}
                                                            </option>
                                                        ))}
                                                    </select> */}
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

export default Hotelsadd