import axios from "axios";
import { useEffect, useState } from "react";
import "./featuresProperties.css";

const FeaturedProperties = () => {
  const [data, setData] = useState([])
  // console.log(data)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://hotel-server-beryl.vercel.app/hotel/allhotels?featured=true&limit=4&min=10&max=700')
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
    return () => clearTimeout(timeout);
  })
  return (
    <div className="fProperty" data-aos="fade-up">
      <div className="container">
        <div className="row card__margin">
          {
            loading ? ("loading please wait...") :
              <>
                {
                  data.map(item => (
                    <div className="col-md-4 big" key={item._id}>
                      <div className="fproperty__container">
                        <div className="fpropertyImg__container">
                          <img src={item.photos[0] ? item.photos[0] : "https://cf.bstatic.com/xdata/images/hotel/max1280x900/232902339.jpg?k=3947def526b8af0429568b44f9716e79667d640842c48de5e66fd2a8b776accd&o=&hp=1"} alt="" className="fpImg" />
                        </div>
                        <div className="fproperty__body">
                          <span className="fproperty__date">
                            <i className="fa-solid fa-calendar clndr"></i> {item.createdAt}
                          </span>
                          <div className="fproperty__data">
                            <div className="fp__namerating">
                              <span className="fp__name"> {item.name}</span>
                              <span className="rating">
                                {item.rating}
                                <i className="fa-solid fa-star star"></i>
                              </span>
                            </div>
                            <span className="fp__title"><i className="fa-solid fa-list icon"></i>    {item.title}</span>
                            <span className="fp__type"><i className="fa-solid fa-bed icon"></i> {item.type} type</span>
                            <span className="fp__city">
                              <i className="fa-solid fa-tree-city icon"></i> {item.city} city
                            </span>
                            <span className="fp__city">
                            <i className="fa-solid fa-dollar-sign icon"></i> {item.cheapestPrice} starting price
                            </span>
                            <span className="fp__address">
                              <i className="fa-solid fa-car icon"></i> {item.address}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </>
          }
        </div>
      </div>
    </div>

  );
};

export default FeaturedProperties;
