import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCities } from "../reducer/cities";
import Cities from "./Cities";
import TopRating from "./TopRating";



const Home = () => {
  // const [skip, setSkip] = useState(0);
  // const [page, setPage] = useState(1);
  // const [elementId, setElementId] = useState([]);

  // const [show1, setShow1] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);
  // const [showSignup, setShowSignup] = useState(false);

  // const navigate = useNavigate();
  // const [show, setShow] = useState(false);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <div>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100 "
              style={{ height: "48rem" }}
              src="https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              alt="First slide"
            />
            <Carousel.Caption >
              <div style={{paddingBottom:'300px'}}>
            <h1 style={{display: 'flex',color:"black",fontSize:'70px',}}>GOOD NIGHT</h1>
            <p style={{display: 'flex',color:"black",fontSize:'35px'}}>Find your next stay</p>
            {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}</div>
          </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              style={{ height: "48rem" }}
              src="https://images.pexels.com/photos/6636247/pexels-photo-6636247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
          "
              alt="Second slide"
            />
              <Carousel.Caption style={{paddingBottom:"300px",color:"black",fontSize:'25px'}}>
              <h1 style={{color:"black",fontSize:'60px'}}>FOR MORE CONFORT</h1>
            <p>We have different types of rooms that contain th finest types of furniture and services</p>
          </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              style={{ height: "48rem" }}
              src="https://images.pexels.com/photos/756076/pexels-photo-756076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
"
              alt="Third slide"
            />

            <Carousel.Caption style={{paddingBottom:"300px",color:"black",fontSize:'25px'}}>
            <h1 style={{color:"black",fontSize:'60px'}}>FOR MORE ENJOYMENT</h1>
            <p>
              We have beautiful places with great views
            </p>
          </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <br /> <br />
      <br />
      <Cities />
      <br /> <br />
      <br />
      <h2 className="mb-3  mt-5 mb-5  container-fluid col-11 display-5 fw-bold">
        TOP RAITNG HOTELS
      </h2>
    
      <TopRating/>
      <div className="container-fluid col-11 mt-5  mb-5">
        

        <div class="fluid-container  my-5 bac ">
          <div class="col-md-12 d-flex align-items-center justify-content-center h-100 c">
            <div class="become_host-wrapper">
              <h3 className="ready"> Ready To Earn </h3>
              <div class="text-center">
                
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
