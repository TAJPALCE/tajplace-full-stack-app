import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
import Swal from 'sweetalert2'
import Footer from "../../components/Footer/Footer";

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { dispatch, loading } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleClick = async (e) => {
    e.preventDefault()
    const userObject = {
      username,
      password,
    }
      ;
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/auth/login", userObject);
      // console.log(res)
      Swal.fire({
        icon: 'success',
        title: `${res.statusText}`,
        text: 'Logged in successfully!',
      })
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      res.statusText === "OK" && localStorage.setItem("token", JSON.stringify(res.data.access_token) ?? null)
      navigate("/")
      setTimeout(function () {
        res && window.location.reload();
      }, [1000])
      return clearTimeout(setTimeout())
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Logged in failed',
        text: 'Wrong credentials',
      })
    }
  };


  return (
    <>
      <GlobalNav />
      <div className="login">
        <div className="lContainer">
          <h5>Welcome back</h5>
          <form className="form">
            <input
              type="text"
              placeholder="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              className="lInput form-control"
              required
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="lInput form-control"
              required
            />
            <button disabled={loading} onClick={handleClick} className="lButton">
              Login
            </button>
          </form>
          <div className="forgot">
            <span className="stext">Don't have an account? <Link to="/signup">Sign up</Link> </span> <br />
            <span className="stext">forgot your password?</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
