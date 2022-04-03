import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Carousel,
  Modal,
  Form,
} from "react-bootstrap";
import "./detail.css";
import Rating from "./Rating";
import Comment from "../Comment";
import { FaBed } from "react-icons/fa";
import {
  MdPerson,
  MdBathroom,
  MdBedroomParent,
  MdPriceChange,
} from "react-icons/md";
import Swal from "sweetalert2";
import StripePayment from "../Stripe/StripContainer";

const Detail = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  let { id } = useParams();
  const [hotel, setHotel] = useState([]);
  const [images, setImages] = useState([]);
  const [show1, setShow1] = useState(false);
  const getHotel = async () => {
    await axios
      .get(`https://goodnight-crypto.herokuapp.com/hotels/search_id/${id}`)
      .then((res) => {
        setHotel(res.data.result);
        setImages([
          res.data.result[0].image,
          res.data.result[0].image2,
          res.data.result[0].image3,
          res.data.result[0].image4,
          res.data.result[0].image5,
        ]);

        setShow1(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHotel();
  }, []);

  const handleBooking = () => {
    handleClose();
    setShow2(true);
  };
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="container-fluid col-11" style={{ marginTop: "100px" }}>
      <Container fluid>
        <Row xs={1} lg={2}>
          <Col className="d-flex align-items-center justify-content-center">
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              style={{ height: "25rem", width: "40rem" }}
            >
              {show1 &&
                images.map((elemnet) => {
                  return (
                    <Carousel.Item interval={3000}>
                      <img
                        className="d-block w-100 "
                        style={{ height: "25rem", borderRadius: "8px" }}
                        src={elemnet}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  );
                })}
            </Carousel>
          </Col>

          {show1 && (
            <Col className="details shadow bg-white rounded  col-sm-11  col-lg-6 ms-lg-0  mt-md-1   ms-sm-4">
              <div className="center ">
                {" "}
                <p className="fs-4 mt-2 ms-3 mb-3 center">
                  {hotel[0].hotelName}{" "}
                </p>
              </div>
              <p className="fs-4 ms-3">
                <Rating />
              </p>
              <div className="detail">
                <p className="fs-4 ms-3">
                  {" "}
                  <MdPerson /> {hotel[0].guests} Guests . <MdBedroomParent />{" "}
                  {hotel[0].bedrooms} Bedrooms . <FaBed /> {hotel[0].beds} Beds
                  . <MdBathroom /> {hotel[0].bathrooms} WC
                </p>
              </div>
              <hr />
              <p className="fs-4 ms-3"> {hotel[0].description} </p>
              <div className="booking">
                <p className="fs-4 ms-3 price">
                  <MdPriceChange /> {hotel[0].price} $/Night
                </p>
                <Button
                  className="col-3 mb-3"
                  variant="success"
                  onClick={handleShow}
                >
                  Booking Now
                </Button>
              </div>
            </Col>
          )}
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header id="booking" closeButton>
            <Modal.Title>Make Your Reservation</Modal.Title>
            <img
              className="d-block w-100 "
              style={{ height: "15rem", borderRadius: "8px" }}
              src={show1 && hotel[0].image}
              alt="First slide"
            />
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="date">
                <Form.Group className="mb-3 col-5">
                  <Form.Label>Check in</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
                <Form.Group className="mb-3 col-5">
                  <Form.Label>Check out</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </div>

              <div className="detailBooking">
                <Form.Group className="mb-3 col-3">
                  <Form.Label>Guests</Form.Label>
                  <Form.Control type="number" placeholder="Guests" />
                </Form.Group>
                <Form.Group className="mb-3 col-3">
                  <Form.Label>Adults</Form.Label>
                  <Form.Control type="number" placeholder="Adults" />
                </Form.Group>
                <Form.Group className="mb-3 col-3">
                  <Form.Label>KDS</Form.Label>
                  <Form.Control type="number" placeholder="KDS" />
                </Form.Group>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => {
                handleBooking();
              }}
            >
              Book Now
            </Button>
          </Modal.Footer>
        </Modal>
        {/* payment */}
        <Modal show={show2} onHide={() => setShow2(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <StripePayment />
          </Modal.Body>
        </Modal>
      </Container>
      <Comment id={show1 && hotel[0].id} />
    </div>
  );
};
export default Detail;
