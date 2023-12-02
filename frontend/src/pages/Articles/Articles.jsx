import React, { useEffect, useState } from 'react';
import './Articles.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Articles = () => {
    const [data, setData] = useState([])
    // console.log(data)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://hotel-server-beryl.vercel.app/article/get')
                setData(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="ar" id="blog">
            <div className="ar__container container">
                <div className="row">
                    {
                        data.map(item => (
                            <div className="col-md-4 colum" key={item._id}>
                                <Link to={`/read/${item._id}`} className="a">
                                    <div className="card">
                                        <div className="img__container">
                                            <img src={item.bgimg} className="card__img" alt="img" />
                                        </div>
                                        <div className="card-body card__overlay">
                                            <h5 className="card-title">{item.headline}</h5>
                                            <span className="card__text">{item.paraOne}</span>
                                        </div>
                                    </div>

                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Articles


