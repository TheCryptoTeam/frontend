import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import { MdPerson } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const Rating = () => {
  const userId = localStorage.getItem("myUserId");
  const { id } = useParams();
  const [ratings, setRatings] = useState([]);
  const [rating, setRating] = useState("");
  const [avarage, setAvarage] = useState(0);

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const avarageCalc = () => {
    setAvarage(7);
    let result = 0;
    for (let i = 0; i < ratings.length; i++) {
      const element = ratings[i];
      result += parseInt(element.rating);
    }
    if (true) {
      let num = result / ratings.length;
      setAvarage(num);
    }
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const createRating = async () => {
    let isVoted = false;
    ratings.forEach((element) => {
      if (element.user_id == userId) {
        return (isVoted = true);
      }
    });
    if (isVoted) {
      return "voted";
    }

    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    await axios
      .post(
        `https://goodnight-crypto.herokuapp.com/rate/${id}`,
        { rating },
        { headers }
      )
      .then((res) => {
        if (res.data.success) {
          getRatings(id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRatings = async () => {
    await axios
      .get(`https://goodnight-crypto.herokuapp.com/rate/${id}`)
      .then((res) => {
        if (res.data.success) {
          setRatings(res.data.results);
        } else {
          setRatings([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRatings();
  }, []);

  useEffect(() => {
    avarageCalc();
  }, [ratings]);

  useEffect(() => {
    createRating();
  }, [rating]);

  return (
    <>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />

      <div className="rating">
        <div className="votes">
          <MdPerson color={"#344055"} size={25} />
          <span id="votes">{ratings.length} </span>{" "}
        </div>
        <div>
          <span className="avarage">
            {avarage.toFixed(1)} <FaStar id="star" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Rating;
