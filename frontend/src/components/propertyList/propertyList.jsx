import axios from "axios";
import { useEffect, useState } from "react";
import "./propertyList.css";

const PropertyList = () => {
  const [data, setData] = useState([])
  // console.log(data[0])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://hotel-server-beryl.vercel.app/hotel/countByType')
        // console.log(res)
        setData(res.data)

      } catch (e) {
        console.log(e)

      }
    }
    fetchData()
  }, [])

  // DATA FETCH LOADER
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, [3000])
    return () => clearTimeout(timeout)
  })

  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ]

  return (
    <div className="pList container mt-5  pt-4">
      {loading ? (
        "loading, please wait"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div className="pListItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h4>{data[i]?.type}</h4>
                  <h6>{data[i]?.count} {data[i]?.type}</h6>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
