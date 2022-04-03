import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setWishList, deleteWishList } from "../reducer/wishLish";
import Swal from "sweetalert2";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import "./hotels.css";

const WishList = () => {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      wishList: state.wishListReducer.wishList,
      token: state.loginReducer.token,
    };
  });
  //=========================================
  const getMyWishLists = async () => {
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    await axios
      .get("https://goodnight-crypto.herokuapp.com/wishList", { headers })

      .then((res) => {
        if (res.data.results.length) {
          dispatch(setWishList(res.data.results));
          setShow(true);
        }
      })
      .catch((err) => {
        setMessage("The Wishlists is empty");
      });
  };

  //=================================================
  const deleteWishListById = async (id) => {
    await axios
      .delete(`https://goodnight-crypto.herokuapp.com/wishList/${id}`)
      .then((res) => {
        dispatch(deleteWishList(id));
        getMyWishLists();
      });
  };

  useEffect(() => {
    getMyWishLists();
  }, []);

  return (
    <div class="container-fluid col-11 ">
      <div className="row " style={{ marginTop: "130px" }}>
        {show &&
          state.wishList.map((hotel) => {
            return (
              <div
                class="col col-xl-3  col-sm-6 "
                style={{
                  paddingLeft: "0",
                  paddingRight: "0",
                  boxShadow: " 5px 10px 8px #888888",
                  width: "355px",
                  margin: "15px",
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
                    ></img>
                  </div>
                  <div class="button2">
                    <RiDeleteBinLine
                      size={45}
                      onClick={() =>
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteWishListById(hotel.id);
                          }
                        })
                      }
                    />
                  </div>
                </div>

                <div className="row" style={{ marginTop: "80px" }}>
                  <div className="col-xl-8 ">
                    <h5
                      class="card-title"
                      style={{ height: "20px", marginLeft: "10px" }}
                    >
                      {hotel.hotelName}
                    </h5>
                  </div>
                  <div className="col-xl-4 d-flex flex-row-reverse bd-highlight ">
                    <p className="price"> {"$" + hotel.price}/night</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default WishList;
