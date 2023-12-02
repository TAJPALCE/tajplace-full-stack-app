import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import GlobalNav from '../../components/GlobalNav/GlobalNav';
import './Single.css';

const Single = () => {
    const [data, setData] = useState([])
    const { id } = useParams()
    console.log(data)

    // GET DATA BY ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://hotel-server-beryl.vercel.app/article/get/${id}`)
                setData(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [id])

    // GET ALL DATA FROM DATABASE
    const [ar, setAr] = useState([])
    // console.log(data)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://hotel-server-beryl.vercel.app/article/get')
                setAr(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])
    return (
        <>
            <GlobalNav />
            <div className="single__container">
                <div className="Sbg__imgcontainer">
                    <img src={data.bgimg} alt="" className="Sbg__img" />
                </div>
                <div className="container overflow-hidden">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="S__body">
                                <div className="body__container">
                                    <small className="S__route">Articles {">"} Travel Tips {">"} {data.headline}</small>
                                    <h1 className="S__title">{data.headline}</h1>
                                    <button className="btn__travel">Travel Tips</button>
                                    <div className="S__imgContainer">
                                        <img src={data.img ? data.img[0] : ""} alt="" className="S__img" />
                                    </div>
                                    <h4 className="S__subtitle">{data.titleOne}</h4>
                                    <p className="S__para">{data.paraOne}</p>

                                    <div className="S__imgContainer">
                                        <img src={data.img ? data.img[1] : ""} alt="" className="S__img" />
                                    </div>
                                    <h4 className="S__subtitle">{data.titleFour}</h4>
                                    <p className="S__para">{data.paraFour}</p>

                                    <div className="S__imgContainer">
                                        <img src={data.img ? data.img[2] : ""} alt="" className="S__img" />
                                    </div>
                                    <h4 className="S__subtitle">{data.titleThree}</h4>
                                    <p className="S__para">{data.paraThree}</p>

                                    <div className="S__imgContainer">
                                        <img src={data.img ? data.img[3] : ""} alt="" className="S__img" />
                                    </div>
                                    <h4 className="S__subtitle">{data.titleTwo}</h4>
                                    <p className="S__para">{data.paraTwo}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="col__right">
                                <div className="col__rghtContainer">
                                    {
                                        ar.slice(0, 5).map((itm,index) => (
                                            <div className="S__right" key={index}>
                                                <img src={itm.bgimg} className="Sright__img" alt="..." />
                                                <div className="card-body Sright__body">
                                                    <h5 className="Sright__head">{itm.headline}</h5>
                                                    <p className="Sright__text">
                                                        {itm.titleOne}
                                                    </p>
                                                    <Link to={`/read/${itm._id}`}className="link">
                                                        <button className="Sright__btn">read more</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Single