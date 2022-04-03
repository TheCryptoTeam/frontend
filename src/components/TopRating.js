import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHotels } from "../reducer/hotels";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { BsFillHeartFill } from "react-icons/bs";

const TopRating = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      hotels: state.hotelsReducer.hotels,
    };
  });

  //=========================================
  const getTopRating = async () => {
    await axios
      .get("https://goodnight-crypto.herokuapp.com/hotels/search_city/4")
      .then((result) => {
        dispatch(setHotels(result.data.result));

        setShow(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  //=====================================
  const addToWishList = async (id) => {
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    await axios
      .post(
        `https://goodnight-crypto.herokuapp.com/wishList/${id}`,
        {},
        { headers }
      )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTopRating();
  }, []);

  //========================================

  return (
    <div class="container-fluid col-11 ">
      <div className="row ">
        {show &&
          state.hotels.map((hotel) => {
            return (
              <div
                class=" col-xl-3 col-lg-3 col-md-3  col-sm-3 "
                style={{
                  paddingLeft: "0",
                  paddingRight: "0",
                  boxShadow: " 5px 10px 8px #888888",
                  width: "23%",
                  marginLeft: "15px",
                }}
              >
                <div class="container1">
                  <div
                    onClick={() => {
                      navigate(`/detail/${hotel.id}`);
                    }}
                  >
                    <img
                      src={hotel.image}
                      class="card-img-top rounded img1"
                      style={{ height: "360px" }}
                      alt=""
                    ></img>
                  </div>
                  <div
                    class="button1 
        
    "
                    style={{ width: "300px" }}
                  >
                    <BsFillHeartFill
                      class="test"
                      size={50}
                      onClick={() => {
                        Swal.fire({
                          icon: "success",
                          title: "Added successfully to wishList",
                          showConfirmButton: false,
                          timer: 1500,
                        });

                        addToWishList(hotel.id);
                      }}
                    />{" "}
                  </div>
                </div>

                <div className="row" style={{ marginTop: "80px" }}>
                  <div className="col-xl-8 ">
                    <h5
                      class="card-title1"
                      style={{ height: "20px" }}
                      onClick={() => {
                        navigate(`/detail/${hotel.id}`);
                      }}
                    >
                      {" "}
                      {hotel.hotelName}
                    </h5>
                  </div>
                  <div className="col-xl-4 d-flex flex-row-reverse bd-highlight ">
                    <p className="price">{"$" + hotel.price}/night</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default TopRating;
