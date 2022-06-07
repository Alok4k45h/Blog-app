import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { Context } from "../../components/context/Context";
import axios from "axios";
import "./login.css";

export default function Login() {
  // Defining User and Password state Variable using useRef
  const userRef = useRef();
  const passwordRef = useRef();

  // fetching the global variable provided by Context js
  const { dispatch, isFetching } = useContext(Context);

  // Event Listener to be triggered on submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // dispatching LOGIN_START
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      // dispatching LOGIN_SUCCESS
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      // dispatching LOGIN_FAILURE
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>

      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your username..."
          ref={userRef}
        />

        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />

        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>

      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          REGISTER
        </Link>
      </button>
    </div>
  );
}
