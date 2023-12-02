import React from 'react';
import './Featured.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Featured = () => {
  const [data, setData] = useState([])
  // console.log(data)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios.get('https://hotel-server-beryl.vercel.app/hotel/list?cities=chattogram,dhaka,shylet')
        const res = await axios.get('https://hotel-server-beryl.vercel.app/hotel/countByCity?cities=chattogram,dhaka,dammam')
        // console.log(res)
        setData(res.data)

      } catch (e) {
        console.log(e)
        // setError(true)

      }
    }
    fetchData()
  }, [])

  // DATA FETCH LOADER
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, [3000])
    return () => clearTimeout(timeout);
  })
  return (
    <div className="featured container mt-5  pt-4" data-aos="fade-up">
      {
        loading ?
          ("Loading please wait...")
          :
          (
            <>
              <div className="featuredItem">
                <img
                  src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h2>Dublin</h2>
                  <h3>{data[1]} properties</h3>
                </div>
              </div>

              <div className="featuredItem">
                <img
                  src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h2>Reno</h2>
                  <h3>{data[2]} properties</h3>
                </div>
              </div>
              <div className="featuredItem">
                <img
                  src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h2>Austin</h2>
                  <h3>{data[0]} properties</h3>
                </div>
              </div>
            </>
          )
      }
    </div>
  )
}

export default Featured