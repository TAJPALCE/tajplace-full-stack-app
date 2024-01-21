import "./List.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/searchItem";
import axios from "axios";
import GlobalNav from "../../components/GlobalNav/GlobalNav";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [data, setData] = useState([]);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [loading, setLoading] = useState(true);
  //FETCHING DATA FROM DATABASE

  // console.log(options);
  // FETCH DATA BY DESTINATIONS
  const config = {
    headers: { token: `Bearer ${JSON.parse(localStorage.getItem("token"))}` },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/room/getAllRooms",
          config
        );
        const allRooms = res.data;

        let filteredRooms = allRooms;
        let totalPerson = options.adult + options.children;
        if (options.allrooms == false) {
          if (options.adult) {
            filteredRooms = filteredRooms.filter((room) => {
              let roomcap;
              if (totalPerson <= 3 && room.maxPeople <= 3) {
                roomcap = room.maxPeople >= options.adult;
              } else if (totalPerson >= 4 && room.maxPeople < 4) {
                roomcap = room.maxPeople < totalPerson;
              }
              return roomcap;
            });
          }

          if (totalPerson < 2) {
            filteredRooms = filteredRooms.filter((room) => {
              return room.title.toLowerCase().includes("single bed");
            });
          } else if (totalPerson > 1 && totalPerson == 2) {
            filteredRooms = filteredRooms.filter((room) => {
              return room.title.toLowerCase().includes("double bed");
            });
          } else if (totalPerson >= 3) {
            filteredRooms = filteredRooms.filter((room) => {
              return room.title.toLowerCase().includes("tripple bed");
            });
          }
        }
        setData(filteredRooms);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  // SEARCH MIN AND MAX
  const handleClick = async () => {
    let filteredRooms = [...data];
    if (min !== undefined && max !== undefined) {
      filteredRooms = filteredRooms.filter((room) => {
        return room.price >= min && room.price <= max;
      });
    } else {
      alert("please type in the input first");
    }
    setData(filteredRooms);
  };

  // DATA FETCH LOADER
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, [100]);
    return () => clearTimeout(timeout);
  });
  return (
    <>
      <GlobalNav />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h3 className="lsTitle">All Room Categories</h3>
            <div className="lsItem">
              <label className="text-info">i. Select the Room</label>
              <label>ii. If you're facing any issue in booking</label>
              <label>Just call us, we are here for your support</label>

              {/* <input placeholder={destination} type="text" /> */}
            </div>
            {/* <div className="lsItem">
              <label>Check-in Date</label>
              <span
                className="Ls__date"
                onClick={() => setOpenDate(!openDate)}
              >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div> */}
            <div className="lsIte">
              {/* <label>Options</label> */}
              <div className="lsOption">
                {/* <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div> */}
                {/* <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    defaultValue={options.adult}
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    defaultValue={options.children}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    defaultValue={options.room}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div> */}
              </div>
            </div>
            {/* <button onClick={handleClick}>Search</button> */}
          </div>
          <div className="listResult">
            {loading
              ? "loading please wait..."
              : data.map((item) => (
                  <SearchItem
                    key={item._id}
                    item={item}
                    dates={dates}
                    options={options}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
