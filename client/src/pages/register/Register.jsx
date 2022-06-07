import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./register.css";

export default function Register() {
  // Defining required State Variable && respective setter function using useState
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, seterror] = useState(false);

  // Event Listener to be triggered on submitting the form
  const handleSubmit = async (e) => {
    // to prevents the refreshing the page & it's default behaviour
    e.preventDefault();

    seterror(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      // if res.data has some value then go to login page mean after successfull registration, redirect to login page
      res.data && window.location.replace("/login");
    } catch (error) {
      seterror(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>

      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="registerButton" type="submit">
          Register
        </button>
      </form>

      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>

      {/* for error displaying */}
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Somthing Went Wrong!!
        </span>
      )}
    </div>
  );
}
