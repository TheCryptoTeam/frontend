import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

// =================================================================

const Register = ({ setShowLogin, setShowSignup }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [userName, setUserName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const role_id = "1";
  const [message, setMessage] = useState("");

  // =================================================================

  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "https://goodnight-crypto.herokuapp.com/users",
        {
          userName,
          email,
          password,
          phone,
          role_id,
        }
      );
      if (result.data.success) {
        setMessage("The user has been created successfully");
        navigate("/home");
        setShowSignup(false);
        setShowLogin(true);
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.massage);
      }
      setMessage("Error happened while register, please try again");
    }
  };

  // =================================================================

  return (
    <div>
      <div className="form-floating">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label> Name </label>
      </div>

      <br />
      <div className="form-floating">
        <input
          type="text"
          name="phone"
          className="form-control"
          placeholder="phone"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <label> phone </label>
      </div>

      <br />
      <div className="form-floating">
        <input
          type="text"
          name="login_email"
          className="form-control"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label> Email </label>
      </div>

      <br />

      <div className="password-with-toggler input-group floating-input-group">
        <div className="form-floating flex-grow-1">
          <input
            type={showPassword ? "text" : "password"}
            name="login_password"
            className="password form-control"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label> Password </label>
        </div>
        <span className="input-group-text">
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              onClick={() => setShowPassword(false)}
              className="bi bi-eye-fill"
              viewBox="0 0 16 16"
              style={{ cursor: "pointer" }}
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              onClick={() => setShowPassword(true)}
              className="bi bi-eye-slash-fill"
              style={{ cursor: "pointer" }}
              viewBox="0 0 16 16"
            >
              <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
              <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
            </svg>
          )}
        </span>
      </div>

      <br />

      <div className="form-check">
        <input
          type="checkbox"
          name="remember_me"
          id="remember_me"
          className="form-check-input"
        />
        <label className="form-check-label" for="remember_me">
          By Clicking Signup, I agree to Good Night{" "}
          <span
            style={{
              color: "blue",
              cursor: "pointer",
              textDecorationLine: "underline",
            }}
          >
            Terms Of Services .
          </span>
        </label>
      </div>
      <div className="form-group mt-4">
        <button
          type="submit"
          className="btn btn-success d-flex w-100 justify-content-center"
          onClick={addNewUser}
        >
          Sign up
        </button>
      </div>
      <br />
      <div className="message">
        {message ? <p className="alert alert-success">{message}</p> : <></>}
      </div>
    </div>
  );
};

export default Register;
