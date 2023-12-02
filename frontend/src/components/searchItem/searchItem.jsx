import { Link } from "react-router-dom";
import "./searchItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { differenceInDays } from "date-fns";
const SearchItem = ({ item, dates, options }) => {
  const [priceData, setPriceData] = useState("");
  const [days, setDays] = useState("");
  // console.log(options, item, dates);
  const [finalRoom, setFinalRoom] = useState("");
  useEffect(() => {
    const roomPrice = () => {
      const startDate = new Date(dates[0].startDate);
      const endDate = new Date(dates[0].endDate);

      if (
        !isNaN(startDate) &&
        !isNaN(endDate) &&
        startDate < endDate &&
        options
      ) {
        const numberOfDays = differenceInDays(endDate, startDate) + 1;
        setDays(numberOfDays);
        localStorage.setItem("numberOfDays", JSON.stringify(numberOfDays));
        const finalPrice =
          numberOfDays > 0
            ? numberOfDays * item.price * options.room
            : item.price;

        setPriceData(finalPrice);
      } else {
        setDays(1);
        localStorage.setItem("numberOfDays", JSON.stringify(1));
        setPriceData(item.price * options.room);
      }
    };

    roomPrice();
  }, [dates, item.price]);
  // console.log(finalRoom, "final room ");
  useEffect(() => {
    const calculateFinalRoom = () => {
      let totalPerson = options.adult + options.children;

      const roomConfigurations = {
        1: "Single Bed Room",
        2: "Double Bed Room",
        3: "Triple Bed Room",
        4: "Triple Bed Room & Single Bed Room",
        5: "Triple Bed Room & Double Bed Room",
        6: "Triple Bed & Two Rooms",
        7: "Triple Bed Two Rooms & Single Room",
        8: "Triple Bed Two Rooms & Double Room",
        9: "Triple Bed Three Rooms",
        10: "Triple Bed Three Rooms & Single Room",
        11: "Triple Bed Three Rooms & Double Room",
        12: "Triple Bed Three Rooms & Double Room & Single Room",
        13: "Triple Bed Three Rooms & Two Double Room",
        14: "Triple Bed Three Rooms & Two Double Room & Single Room",
        15: "Triple Bed Three Rooms & Three Double Room",
        16: "Triple Bed Three Rooms & Three Double Room & Single Room",
        17: "Triple Bed Three Rooms & Four Double Room",
        18: "Triple Bed Three Rooms & Four Double Room & Single Room",
        19: "Triple Bed Three Rooms & Five Double Room",
        20: "Triple Bed Three Rooms & Five Double Room & Single Room",
        21: "Triple Bed Three Rooms & Six Double Room",
        22: "Triple Bed Three Rooms & Six Double Room & Single Room",
        23: "Triple Bed Three Rooms & Six Basic Double Room & Deluxe Double Room",
        24: "Triple Bed Three Rooms & Six Basic Double Room & Deluxe Double Room & Single Room",
        25: "Triple Bed Three Rooms & Six Double Room & Two Deluxe Double Room",
        26: "Triple Bed Three Rooms & Six Double Room & Two Deluxe Double Room & Single Room",
        27: "Triple Bed Three Rooms & Six Double Room & Three Deluxe Double Room ",
        28: "Triple Bed Three Rooms & Six Double Room & Three Deluxe Double Room & Single Room",
        29: "Triple Bed Three Rooms & Six Double Room & Four Deluxe Double Room",
        30: "Triple Bed Three Rooms & Six Double Room & Four Deluxe Double Room & Single Room",
        31: "Triple Bed Three Rooms & Six Double Room & Five Deluxe Double Room",
        32: "Triple Bed Three Rooms & Six Double Room & Five Deluxe Double Room & Single Room",
        34: "Triple Bed Three Rooms & Six Double Room & Five Deluxe Double Room & Two Single Room",
        35: "Triple Bed Three Rooms & Six Double Room & Five Deluxe Double Room & Three Single Room",
        36: "Triple Bed Three Rooms & Six Double Room & Five Deluxe Double Room & Four Single Room",
      };

      setFinalRoom(roomConfigurations[totalPerson] || "");
    };

    calculateFinalRoom();
  }, [options.adult]);

  return (
    <>
      <div className="searchItem">
        <img
          src={
            item.img
              ? item.img
              : "https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
          }
          alt=""
          className="siImg"
        />
        <div className="siDesc">
          <h1 className="siTitle">{item.title}</h1>
          <span className="siTaxiOp">Free internet</span>
          <span
            className=" siCancelOp "
            style={{ color: item.ac === true ? "green" : "red" }}
          >
            AC installed :{"   "}
            {item.ac === true ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              <FontAwesomeIcon icon={faTimes} />
            )}
          </span>

          <span className="siDistance">Room for {item.maxPeople} Persons</span>

          <span className="siSubtitle">{item.desc}</span>
          <span className="siCancelOpSubtitle">
            Discounted price, so lock in this great price today!
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span>Excellent services</span>
            <button>{item.rating}</button>
          </div>
          <div className="siDetailTexts">
            <span className="siPrice">{priceData} PKR</span>
            <span className="siTaxOp">
              {`${days} nights, ${options.adult} adult,  ${
                options.children !== 0
                  ? options.children === 1
                    ? `${options.children} child`
                    : `${options.children} children`
                  : ""
              } `}
            </span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <Link to={`/rooms/${item._id}`}>
              <button className="siCheckButton">Check Room and Booking</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchItem;
