import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Home from "./components/Home";
import Navigation from "./components/Navigation";

import Footer from "./components/Footer/Footer";
import Hotels from "./components/Hotels";

import Cities from "./components/Cities";

import "./App.css";

import WishList from "./components/WishList";
import Detail from "./components/Detail/Detail";

import Search from "./components/Search/Search";
import Admin from "./components/Admin/Admin";
import StripePayment from "./components/Stripe/StripContainer";
//===============================================================

const App = () => {
  const [hotelName, setHotelName] = useState("");
  const role = localStorage.getItem("myRole");
  return (
    <div className="App">
      <Navigation setHotelName={setHotelName} />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/cities" element={<Cities />} />

        <Route path="/hotels" element={<Hotels />} />
        <Route path="/wishList" element={<WishList />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/payment" element={<StripePayment />} />
        <Route path="/search" element={<Search hotelName={hotelName} />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/Admin"
          element={
            role === "2" ? (
              <Admin />
            ) : (
              <>
                <img
                  style={{ margin:"4rem", height: "40rem", width: "80rem" }}
                  src="https://res.cloudinary.com/cryptoteam/image/upload/v1647692701/ywwdapoeigntg7sorbgg.svg"
                  alt="401 Unauthorized"
                />
              </>
            )
          }
        />

        <Route
          path="*"
          exact={true}
          element={
            <>
              <img
                style={{ height: "40rem", width: "90rem" }}
                src="https://res.cloudinary.com/cryptoteam/image/upload/v1647692917/g0xrimqejlp3rqd6y5hk.svg"
                alt="404 Page not found"
              />
            </>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
