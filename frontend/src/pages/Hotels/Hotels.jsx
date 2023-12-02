import "./Hotels.css";
// import MailList from "../../components/milList/MailList";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import MailList from "../../components/mailList/mailList";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { SearchContext } from "../../context/SearchContext";
import Reserve from "../../components/Reserve/Reserve";
import { AuthContext } from "../../context/AuthContext";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  
  const [data, setData] = useState([])
  // console.log(data)

  const { id } = useParams()
  // console.log(id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/hotel/gethotel/${id}`)
        setData(res.data)
        // console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [id])

  const { dates, options } = useContext(SearchContext);
  // console.log(dates)
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  // console.log(dayDifference(dates[0].endDate, dates[0].startDate))

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];
  const [open, setOpen] = useState(false);
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const navigate = useNavigate()
  const { user } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => {
    // console.log('clicked')
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  }
  return (
    <>
      <div>
        <GlobalNav />
        <div className="hotelContainer container">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                {/* <img src={data.photos? data.photos[0]:"img"} alt="" className="sliderImg" /> */}
                <img src={photos[slideNumber].src} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <div className="d-flex justify-content-between align-items-center">
              <p className="bookNow">Breakfast and Dinner included!</p>
              <h1 className="hotelTitle">{data.name}</h1>
            </div>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance} from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over $114 at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt="hotel room pic"
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">
                  {data.desc}
                </p>
                <div className="hotelOterhs">
                  <p className="d-flex flex-column align-items-center hotelIcons__texts">
                    <i className="fa-solid fa-house"></i>
                    Aparments
                  </p>
                  <p className="d-flex flex-column align-items-center hotelIcons__texts">
                    <i className="fa-solid fa-kitchen-set"></i>
                    Kitchen
                  </p>
                  <p className="d-flex flex-column align-items-center hotelIcons__texts">
                    <i className="fa-solid fa-sink"></i>
                    Washing Machine
                  </p>
                  <p className="d-flex flex-column align-items-center hotelIcons__texts">
                    <i className="fa-solid fa-wifi"></i>
                    Free WiFi
                  </p>
                  <p className="d-flex flex-column align-items-center hotelIcons__texts">
                    <i className="fa-solid fa-fan"></i>
                    Air Conditioner
                  </p>
                  <p className="d-flex flex-column align-items-center hotelIcons__texts">
                    <i className="fa-solid fa-ban-smoking"></i>
                    Non-smoking rooms
                  </p>
                </div>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b>({days}nights)
                </h2>
                <button onClick={handleClick} className="rButton">Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      <div className="w-100 h-100">
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}

      </div>
    </>
  );
};

export default Hotel;
