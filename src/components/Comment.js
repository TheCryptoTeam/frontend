import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import { useSelector } from "react-redux";
import axios from "axios";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";

const Comment = ({ id }) => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });
  //===============================================================

  //===============================================================

  const userName = localStorage.getItem("userName");

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  const createNewComment = async () => {
    const body = {
      comment,
    };
    const headers = {
      Authorization: `Bearer ${state.token}`,
    };
    await axios
      .post(
        `https://goodnight-crypto.herokuapp.com/hotels/${id}/comments`,
        body,
        { headers }
      )
      .then((res) => {
        if (res.data.success) {
          setMessage(res.data.massege);
          getComments();
        }
      })
      .catch((err) => {
        setMessage(err.response.data.massege);
      });
  };

  const getComments = async () => {
    await axios
      .get(`https://goodnight-crypto.herokuapp.com/hotels/${id}/comments`)
      .then((res) => {
        if (res.data.success) {
          setComments(res.data.comments);
          setMessage(res.data.massege);
        }
      })
      .catch((err) => {
        setMessage(err.response.data.massege);
      });
  };

  const deleteComment = async (id) => {
    await axios
      .delete(`https://goodnight-crypto.herokuapp.com/hotels/${id}/comments`)
      .then((res) => {
        if (res.data.success) {
          getComments();

          setMessage(res.data.massege);
        }
      })
      .catch((err) => {
        setMessage(err.response.data.massege);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      {state.isLoggedIn ? (
        <div className="writeComment-continar ms-4">
          <div className="writeComment">
            <input
              className="commentHere"
              style={{ padding: "12px", width: "500px" }}
              placeholder="comment here"
              onChange={(e) => setComment(e.target.value)}
            />
            <HiOutlinePencilAlt
              style={{ cursor: "pointer" }}
              size={35}
              className="addComment m-4"
              onClick={() => {
                createNewComment();
              }}
            />
          </div>
          <br />
        </div>
      ) : (
        <h2>register to add a comment</h2>
      )}
      {comments.map((comment, index) => {
        return (
          <div>
            <div className="CommentDiv" key={index}>
              <div className="test4-continar">
                <div className="test4 row ms-1">
                  <div
                    className="col-lg-6 col-sm-6 ms-3"
                    style={{
                      boxShadow:
                        " 4px 4px 4px 4px rgba(0, 0, 0, 0.1), 6px 6px 6px 6px rgba(0, 0, 0, 0.1)",
                      padding: "15px",
                    }}
                  >
                    <h5 className="block">{comment.commenter}</h5>
                    {/* <br /> */}
                    <p
                      className="block pComment"
                      style={{ marginBottom: "0", marginTop: "2px" }}
                    >
                      {comment.comment}
                    </p>
                  </div>

                  {userName == comment.commenter ? (
                    <AiOutlineDelete
                      style={{ width: "120px", cursor: "pointer" }}
                      size={35}
                      className="delComment col-lg-2 col-sm-2 mt-4"
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
                            deleteComment(comment.id);
                          }
                        })
                      }
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <br />
          </div>
        );
      })}
    </>
  );
};

export default Comment;
