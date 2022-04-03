import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHotels } from "../../reducer/hotels";

import "./Search.css";

const Search = ({ hotelName }) => {
  const [elementId, setElementId] = useState([]);

  const dispatch = useDispatch();
  const [show, setShow] = useState(0);
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      hotels: state.hotelsReducer.hotels,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const getHotelByName = async (hotelName) => {
    await axios
      .get(
        `https://goodnight-crypto.herokuapp.com/hotels/search_name?hotelName=${hotelName}`
      )
      .then((res) => {
        if (!res.data.result[0]) {
          setShow(2);
        } else {
          dispatch(setHotels(res.data.result));
          setShow(1);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  //=======================================
  const addToWishList = async (id) => {
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };

    await axios
      .post(`/wishList/${id}`, {}, { headers })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHotelByName(hotelName);
  }, [hotelName]);

  /////////////////////////////
  const handlecolor = (element) => {
    setElementId([...elementId, element.id]);
  };

  return (
    <div>
      <div>
        <h1>Search Result</h1>
        <div>
          {show === 1 ? (
            <div class="container-fluid col-11">
              <div className="row mt-5">
                {state.hotels.map((hotel) => {
                  return (
                    <div
                      class="col col-xl-3 col-sm-6"
                      style={{
                        paddingLeft: "0",
                        paddingRight: "0",
                        boxShadow: " 5px 10px 8px #888888",
                        width: "23%",
                        margin: "12px",
                      }}
                    >
                      <div class=" ">
                        <img
                          src={hotel.image}
                          class="card-img-top rounded "
                          style={{ height: "360px" }}
                          alt="Hollywood Sign on The Hill"
                        />
                        <div class="card-body " style={{ paddingBottom: "0" }}>
                          <div className="row">
                            <div className="col-xl-6">
                              <h5 class="card-title" style={{ height: "20px" }}>
                                {" "}
                                {hotel.hotelName}
                              </h5>
                            </div>
                            <div className="col-xl-6 d-flex flex-row-reverse bd-highlight ">
                              <p>price: {hotel.price}</p>
                            </div>
                          </div>
                          <p>
                            <p
                              className="col"
                              onClick={() => {
                                addToWishList(hotel.id);
                              }}
                            >
                              {/* {hotel.description}{" "} */}
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : show === 2 ? (
            <>
              <img
                className="notFound"
                src="https://res.cloudinary.com/cryptoteam/image/upload/v1647712664/pryqq1blxc1rs8osuqk5.svg"
                alt="Not found !!"
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
