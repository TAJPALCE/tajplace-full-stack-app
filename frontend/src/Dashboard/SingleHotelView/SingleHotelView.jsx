import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import './SingleHotelView.css';

const SingleHotelView = () => {

    const { id } = useParams()
    // console.log(id)

    // GET HOTEL DETAILS BY ID
    const [data, setData] = useState([])
    console.log(data)
    const [roomId, setRoomId] = useState([])
    // console.log(roomId)
    const [fetchData, setFetchData] = useState([])
   
    // console.log(fetchData.id)



    // FETCH HOTEL BY ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                const getItem = await axios.get(`http://localhost:5000/hotel/gethotel/${id}`)
                setData(getItem.data)
                setRoomId(getItem.data.rooms)
                // console.log(getItem)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [id])


    // FETCH ROOM BY ID
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/room/getAllRooms', config)
                // console.log(res)
                setFetchData(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    // UPDATE FORM DATA
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [distance, setDistance] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [rating, setRating] = useState('')
    const [cheapestPrice, setCheapestPrice] = useState('')
    const [updated, setUpdated] = useState(false)

    const config = {
        headers: { token: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const hotelObj = {
            name,
            type,
            city,
            photos: data.photos,
            rooms: data.rooms,
            address,
            distance,
            title,
            desc,
            rating,
            cheapestPrice,
            featured: data.featured
        }
        console.log(hotelObj)

        try {
            const res = await axios.put(`https://hotel-server-beryl.vercel.app/hotel/updateHotels/${id}`, hotelObj, config)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    // if (roomId === fetchData.id) {
    //     return console.log('they are equal')
    // }
    return (
        <div className="ad">
            <Topbar />
            <Sidebar />
            <div className="single">
                <div className="adminDash">
                    <div className="titleContainer">
                        <strong className="firstTitle">Dashboard / <span className="text-muted fw-bold">Single hotel view</span></strong>
                        <div className="adDash">
                            <div className="TeacherAdd">
                             


                                <div className="mt-3">
                                    <div className="Single__form">
                                        <div className="d-flex justify-content-between">
                                            <p className="starTitle">Hotel Details</p>
                                            <p>
                                                {

                                                    updated ? <button className="btnEdit" onClick={() => setUpdated(false)}><i className="fa-solid fa-close"></i></button>
                                                        :
                                                        <button className="btnEdit" onClick={() => setUpdated(true)}><i className="fa-solid fa-pen"></i></button>


                                                }
                                            </p>

                                        </div>
                                        <table className="table border">
                                            <thead>
                                                <tr className="text-center">
                                                    <th className="thead" scope="col">NAME</th>
                                                    <th className="thead" scope="col">TYPE</th>
                                                    <th className="thead" scope="col">CITY</th>
                                                    <th className="thead" scope="col">TITLE</th>
                                                    <th className="thead" scope="col">RATING</th>
                                                    <th className="thead" scope="col">CHEAPEST PRICE</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tbody">
                                                <tr className="trow">
                                                    <td data-title="NAME" className="tdata">
                                                        {
                                                            updated ?
                                                                <input type="text" className="name" autoFocus defaultValue={data.name}
                                                                    onChange={(e) => setName(e.target.value)} />
                                                                :
                                                                `${data.name}`
                                                        }
                                                    </td>
                                                    <td data-title="TYPE" className="tdata">
                                                        {
                                                            updated ?
                                                                <input type="text" className="chepPrice" autoFocus defaultValue={data.type}
                                                                    onChange={(e) => setType(e.target.value)} />
                                                                :
                                                                `${data.type}`
                                                        }
                                                    </td>
                                                    <td data-title="CITY" className="tdata">
                                                        {
                                                            updated ?
                                                                <input type="text" className="chepPrice" autoFocus defaultValue={data.city}
                                                                    onChange={(e) => setCity(e.target.value)} />
                                                                :
                                                                `${data.city}`
                                                        }
                                                    </td>
                                                    <td data-title="TITLE" className="tdata">
                                                        {
                                                            updated ?
                                                                <input type="text" className="name" autoFocus defaultValue={data.title}
                                                                    onChange={(e) => setTitle(e.target.value)} />
                                                                :
                                                                `${data.title}`
                                                        }
                                                    </td>
                                                    <td data-title="RATING" className="tdata">
                                                        {
                                                            updated ?
                                                                <input type="text" className="chepPrice" autoFocus defaultValue={data.rating}
                                                                    onChange={(e) => setRating(e.target.value)} />
                                                                :
                                                                `${data.rating}`
                                                        }
                                                    </td>
                                                    <td data-title="CHEAPEST PRICE" className="tdata">
                                                        {
                                                            updated ?
                                                                <input type="text" className="chepPrice" autoFocus defaultValue={data.cheapestPrice}
                                                                    onChange={(e) => setCheapestPrice(e.target.value)} />
                                                                :
                                                                `${data.cheapestPrice}`
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="single__imgs">
                                            <img src={data.photos ? data.photos[0] : 'image one'} alt="" className="s__img" />
                                            <img src={data.photos ? data.photos[1] : 'image two'} alt="" className="s__img" />
                                            <img src={data.photos ? data.photos[2] : 'image three'} alt="" className="s__img" />
                                            <img src={data.photos ? data.photos[3] : 'image four'} alt="" className="s__img" />
                                        </div>
                                        <div className="singleRest__info mt-2">
                                            <strong className="border-bottom">Hotel Details:</strong>
                                            {
                                                updated ?
                                                    <p>
                                                        <textarea type="text" className="hotel__desc" autoFocus defaultValue={data.desc}
                                                            onChange={(e) => setDesc(e.target.value)} />
                                                    </p>
                                                    :
                                                    <p className="single__text">{data.desc}</p>

                                            }

                                            <strong className="border-bottom">Hotel Rooms:</strong>
                                          {/* {
                                            data.map((item,index) => (
                                                <div className="single__text" key={index}>
                                                    {
                                                    item?.roomNumbers.map((roomNumber) =>(
                                                        <p key={roomNumber._id}>{roomNumber?.number}</p>
                                                    ))
                                                    }
                                                </div>
                                            ))
                                          } */}
                                            {/* <p className="single__text">
                                                {data.rooms ? data.rooms[0] : "room one"}, {data.rooms ? data.rooms[1] : "room two"},

                                                {data.rooms ? data.rooms[2] : "room three"},
                                            </p> */}
                                            <strong className="border-bottom">Address</strong>
                                            {
                                                updated ?
                                                    <p>
                                                        <input type="text" className="chepPrice" autoFocus defaultValue={data.address}
                                                            onChange={(e) => setAddress(e.target.value)} />
                                                    </p>
                                                    :
                                                    <p className="single__text">{data.address}</p>

                                            }
                                            <strong className="border-bottom">Hotel distance:</strong>
                                            {
                                                updated ?
                                                    <p>
                                                        <input type="text" className="chepPrice" autoFocus defaultValue={data.distance}
                                                            onChange={(e) => setDistance(e.target.value)} />
                                                    </p>
                                                    :
                                                    <p className="single__text">{data.distance}</p>

                                            }
                                            <strong className="border-bottom">Hotel Rooms lists:</strong>
                                            {
                                                fetchData.map((room, index) => (
                                                    <div key={index}>
                                                        <p value={room._id}>
                                                            {room.title}, <br />
                                                            <span>{room._id}</span>
                                                        </p>
                                                    </div>
                                                ))
                                            }

                                            {
                                                updated ?
                                                    <button className="btn btn-warning text-white"onClick={handleSubmit}>Update</button>
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
        </div>
    )
}

export default SingleHotelView