import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import { DateRange } from "react-date-range";
import { useContext, useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ type }) => {
  const notify = () => toast("Please login first to search, thank you!");
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    // couple: 0,
    allrooms: true,
    room: 1,
  });

  const loadDatesFromStorage = () => {
    const storedDates = localStorage.getItem("selectedDates");
    if (storedDates) {
      setDates(
        JSON.parse(storedDates).map((date) => ({
          ...date,
          startDate: new Date(date.startDate),
          endDate: new Date(date.endDate),
        }))
      );
    }
  };

  const saveDatesToStorage = () => {
    localStorage.setItem("selectedDates", JSON.stringify(dates));
  };
  useEffect(() => {
    // Load dates from localStorage when the component mounts
    loadDatesFromStorage();
  }, []);

  const navigate = useNavigate();

  // const handleOption = (name, operation) => {
  //   setOptions((prev) => {
  //     return {
  //       ...prev,
  //       [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
  //     };
  //   });
  // };

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      if (options.allrooms === false) {
        let newValue;
        if (operation === "i") {
          newValue = prev[name] + 1;
        } else {
          newValue = prev[name] - 1;
        }

        // Ensure that the value stays within the desired range
        if (name === "adult") {
          newValue = Math.min(37, Math.max(1, newValue)); // Limit adult between 1 and 37
        } else if (name === "children") {
          newValue = Math.min(37 - options.adult, Math.max(0, newValue)); // Limit children based on the remaining capacity
        }

        return {
          ...prev,
          [name]: newValue,
        };
      } else {
        return {
          ...prev,
          adult: 1,
          children: 0,
        };
      }
    });
  };

  const handleCheckboxChange = () => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      allrooms: !prevOptions.allrooms,
    }));
  };

  useEffect(() => {
    if (options.allrooms === true) {
      setOptions((prev) => {
        return {
          ...prev,
          adult: 1,
          children: 0,
        };
      });
    }
  }, [options.allrooms]);

  const { dispatch } = useContext(SearchContext);
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/allroom", { state: { destination, dates, options } });
    saveDatesToStorage();
  };

  // ANIMATE ON SCROLL
  useEffect(() => {
    AOS.init({ offset: 120, duration: 2000, easing: "easeOut" });
  });

  // user login or not
  const { user } = useContext(AuthContext);

  return (
    <div className="header container">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList" data-aos="fade-left">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span className="ms-1">Stays</span>
          </div>
          <div className="headerListItem ">
            <FontAwesomeIcon icon={faPlane} />
            <span className="ms-1">Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span className="ms-1">Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span className="ms-1">Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span className="ms-1">Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle sticker" data-aos="fade-left">
              A lifetime of discounts? It's Genius.
            </h1>
            <h1 data-aos="fade-left" className="sticker">
              Find your next stay here.
            </h1>

            <h6 data-aos="fade-left" className="headerDesc">
              Search deals on hotels, homes, and much more...
            </h6>
            <h6 className="headerDesc" data-aos="fade-left">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free hotel booking account.
            </h6>
            <button className="headerBtn" data-aos="fade-left">
              Sign in / Register
            </button>
            {/* hotel search */}
            <div className="headerSearch">
              {/* <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div> */}
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >
                  {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                    dates[0].endDate,
                    "MM/dd/yyyy"
                  )}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >
                  {" "}
                  {/* {`${options.adult} adult · ${options.children} children · ${options.room} room . All Rooms `} */}
                  {` All Rooms `}
                  {options.allrooms ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} />
                  )}
                </span>
                {openOptions && (
                  <div className="options">
                    {/* <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div> */}
                    {/* <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div> */}

                    {/* <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div> */}
                    {/* <div className="container">
                      <span style={{ fontSize: "12px" }}>
                        if you want to see all rooms , mark <br />
                        the checkbox
                      </span>
                      <hr />
                    </div> */}
                    {/* <div className="optionItem">
                      <span className="optionText">All rooms</span>
                      <div className="optionCounter">
                        <label>
                          <input
                            type="checkbox"
                            className="optionCounterButton"
                            checked={options.allrooms}
                            onChange={handleCheckboxChange}
                          />
                        </label>
                      </div>
                    </div> */}
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                {user ? (
                  <button className="headerBtn" onClick={handleSearch}>
                    Search
                  </button>
                ) : (
                  <div>
                    <button
                      type="button"
                      className="headerDisablebtn"
                      // onClick={notify}
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </button>
                    <ToastContainer />
                  </div>
                  // <Link className="link" to="/login">
                  //   <button type="button" className="headerDisablebtn" id="liveToast">
                  //     Login
                  //   </button>
                  // </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
