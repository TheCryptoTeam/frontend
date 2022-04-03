import React from "react";
import { useState } from "react";
import axios from "axios";
import {
 
  Form,
  
} from "react-bootstrap";
const UploadFile = ({ setImage }) => {
  const [file, setFile] = useState();
  const [filelink, setFilelink] = useState(null);
  const imageUpload = (imageFile) => {
    const formData = new FormData();

    formData.append("file", imageFile);

    formData.append("upload_preset", "zy79gcay");
    axios
      .post(`https://api.cloudinary.com/v1_1/cryptoteam/image/upload`, formData)
      .then((res) => {
        setFilelink(res.data.secure_url);
        setImage(res.data.secure_url);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <Form.Control
      type="file"
      placeholder="Image2"
      onChange={async (event) => {
        setFile(event.target.files[0]);
        imageUpload(event.target.files[0]);
      }}
    />
  );
};

export default UploadFile;
