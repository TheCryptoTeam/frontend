import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Modal,
  Form,
  Table,
  Pagination,
} from "react-bootstrap";
import "./Admin.css";
import UploadFile from "./Upload";
import Swal from "sweetalert2";
import { RiDeleteBinLine } from "react-icons/ri";

import { BsPencilSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  setHotels,
  addHotel,
  updateHotelById,
  deleteHotelById,
} from "../../reducer/hotels";
const Admin = () => {
  const [hotels, setHotels] = useState([]);
  const [show, setShow] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [hotelName, setHotelName] = useState("");
  const [hotelId, setHotelId] = useState(false);
  const [elementId, setElementId] = useState([]);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);

  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [beds, setBeds] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [guests, setGuests] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city_id, setCity_id] = useState("");

  const createHotel = async () => {
    const body = {
      hotelName,
      image,
      image2,
      image3,
      image4,
      image5,
      guests,
      bedrooms,
      beds,
      bathrooms,
      description,
      city_id,
      price,
    };

    await axios
      .post("https://goodnight-crypto.herokuapp.com/hotels", body)
      .then((result) => {
        getHotels();
        Swal.fire({
          icon: "success",
          title: "created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const getHotels = async () => {
    await axios
      .get(
        `https://goodnight-crypto.herokuapp.com/hotels/page?skip=${skip}&limit=5`
      )
      .then((result) => {
        setHotels(result.data.results);
        setShowTable(true);
      })
      .catch((err) => {
        throw err;
      });
  };
  //==========================================================================
  //update hotel

  //update hotel
  const [updateBox, setUpdateBox] = useState(false);

  const handleUpdateClick = (hotel) => {
    setUpdateBox(!updateBox);
    setHotelId(hotel.id);
    setHotelName(hotel.hotelName);
    setGuests(hotel.guests);
    setBedrooms(hotel.bedrooms);
    setBeds(hotel.beds);
    setBathrooms(hotel.bathrooms);

    setPrice(hotel.price);
    setElementId([...elementId, hotel.id]);

    if (updateBox) updateHotel(hotel.id);
  };

  const updateHotel = async (id) => {
    const body = {
      hotelName,
      guests,
      bedrooms,

      bathrooms,

      price,
    };

    try {
      await axios.put(
        `https://goodnight-crypto.herokuapp.com/hotels/${id}`,
        body
      );

      dispatch(updateHotelById(body));
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      getHotels();
    } catch (error) {
      throw error;
    }
  };

  //==========================================================================
  const deleteHotel = (id) => {
    axios
      .delete(`https://goodnight-crypto.herokuapp.com/hotels/${id}`)
      .then((res) => {
        getHotels();
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getHotels();
  }, [skip]);
  const inc = () => {
    setSkip(skip + 5);
    setPage(page + 1);
  };
  const dec = () => {
    if (page > 1) {
      setSkip(skip - 5);
      setPage(page - 1);
    }
  };

  return (
    <Container className="marginAdmin">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Create New Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 ms-4 col-11">
              <Form.Control
                type="text"
                placeholder="hotelName"
                onChange={(e) => {
                  setHotelName(e.target.value);
                }}
              />
            </Form.Group>
            <div className="image">
              <Form.Group className="mb-3 col-5">
                <UploadFile setImage={setImage} />
                {/* <Form.Control type="file" placeholder="Image"  onChange={(e)=>{setImage(e.target.value)}}/> */}
              </Form.Group>
              <Form.Group className="mb-3 col-5" placeholder="Image2">
                <UploadFile setImage={setImage2} />
                {/* <Form.Control type="file" placeholder="Image2"  onChange={(e)=>{setImage2(e.target.value)}}/> */}
              </Form.Group>
              <Form.Group className="mb-3 col-5" placeholder="Image2">
                <UploadFile setImage={setImage3} />
                {/* <Form.Control type="file" placeholder="Image3"  onChange={(e)=>{setImage3(e.target.value)}}/> */}
              </Form.Group>
              <Form.Group className="mb-3 col-5" placeholder="Image4">
                <UploadFile setImage={setImage4} />
                {/* <Form.Control type="file" placeholder="Image4"  onChange={(e)=>{setImage4(e.target.value)}}/> */}
              </Form.Group>
              <Form.Group className="mb-3 col-5" placeholder="Image5">
                <UploadFile setImage={setImage5} />
                {/* <Form.Control type="file" placeholder="Image5"  onChange={(e)=>{setImage5(e.target.value)}}/> */}
              </Form.Group>
            </div>
            <div className="detailAdmin">
              <Form.Group className="mb-3 col-3">
                <Form.Control
                  type="number"
                  placeholder="Guests"
                  onChange={(e) => {
                    setGuests(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-3">
                <Form.Control
                  type="number"
                  placeholder="bedroom"
                  onChange={(e) => {
                    setBedrooms(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-3">
                <Form.Control
                  type="number"
                  placeholder="Bed"
                  onChange={(e) => {
                    setBeds(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-3">
                <Form.Control
                  type="number"
                  placeholder="Bathroom"
                  onChange={(e) => {
                    setBathrooms(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-3">
                <Form.Control
                  type="number"
                  placeholder="City_id"
                  onChange={(e) => {
                    setCity_id(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-3">
                <Form.Control
                  type="number"
                  placeholder="Price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3 ms-4 col-11">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            className="col-12"
            onClick={() => {
              createHotel();
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <h2>Hotels Table</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th> Name</th>
            <th>Guests</th>
            <th>Bedrooms</th>
            <th>Bathrooms</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {showTable &&
            hotels.map((hotel) => {
              return (
                <tr>
                  <td>{hotel.id}</td>
                  <td>
                    {updateBox && hotelId === hotel.id ? (
                      <input
                        type="text"
                        defaultValue={hotel.hotelName}
                        placeholder="Name here"
                        onChange={(e) => setHotelName(e.target.value)}
                      />
                    ) : (
                      hotel.hotelName
                    )}
                  </td>
                  <td>
                    {updateBox && hotelId === hotel.id ? (
                      <input
                        type="text"
                        defaultValue={hotel.guests}
                        placeholder="guests"
                        onChange={(e) => setGuests(e.target.value)}
                      />
                    ) : (
                      hotel.guests
                    )}
                  </td>
                  <td>
                    {updateBox && hotelId === hotel.id ? (
                      <input
                        type="text"
                        defaultValue={hotel.bedrooms}
                        placeholder="bedrooms"
                        onChange={(e) => setBedrooms(e.target.value)}
                      />
                    ) : (
                      hotel.bedrooms
                    )}
                  </td>
                  <td>
                    {updateBox && hotelId === hotel.id ? (
                      <input
                        type="text"
                        defaultValue={hotel.bathrooms}
                        placeholder="bathrooms"
                        onChange={(e) => setBathrooms(e.target.value)}
                      />
                    ) : (
                      hotel.bathrooms
                    )}
                  </td>
                  <td>
                    {updateBox && hotelId === hotel.id ? (
                      <input
                        type="text"
                        defaultValue={hotel.price}
                        placeholder="price"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    ) : (
                      "$" + hotel.price + "/night"
                    )}
                  </td>

                  <td>
                    {updateBox && hotelId === hotel.id ? (
                      <svg
                        onClick={() => {
                          Swal.fire({
                            icon: "info",
                            title: "Close...",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          setUpdateBox(false);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        fill="currentColor"
                        className="bi bi-x-circle close"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    ) : (
                      <></>
                    )}

                    <BsPencilSquare
                      id="update"
                      onClick={() => handleUpdateClick(hotel)}
                    />
                    {updateBox && hotelId === hotel.id && <></>}

                    <RiDeleteBinLine
                      id="delete"
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
                            deleteHotel(hotel.id);
                          }
                        })
                      }
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <Pagination className="Pagination">
        <Pagination.First
          onClick={() => {
            dec();
          }}
        />
        <Pagination.Prev
          onClick={() => {
            dec();
          }}
        />

        <Pagination.Item>{page - 1}</Pagination.Item>
        <Pagination.Item id="active">{page}</Pagination.Item>
        <Pagination.Item>{page + 1}</Pagination.Item>

        <Pagination.Next
          onClick={() => {
            inc();
          }}
        />
        <Pagination.Last
          onClick={() => {
            inc();
          }}
        />
      </Pagination>
      <div className="create ">
        <Button className="col-2" variant="success" onClick={handleShow}>
          Create
        </Button>
      </div>
    </Container>
  );
};
export default Admin;
