import React, { useRef, useState } from "react";

import "./footer.css";
import { AiOutlineMail } from "react-icons/ai";
import emailjs from "emailjs-com";
import { init } from "@emailjs/browser";
init("vkM6vzKr7M-G7h5nE");

const Footer = () => {
  const [txtFeedBack, setTxtFeedBack] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_ll4afdg",
        "template_yvm85b5",
        {
          to_name: "crypto",
          message: txtFeedBack,
        },
        "vkM6vzKr7M-G7h5nE"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  };
  return (
    <footer class="page-footer shadow bg-white rounded mt-4">
      <div class="container-fluid col-11">
        <div class="row justify-content-between py-4 mt-4">
          <div class="col-md-3 col-6 mt-3 mt-md-0">
            <h6> About </h6>
            <ul class="list-unstyled">
              <li>
                <a href="none" class="common-link">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="none" class="common-link">
                  Terms Of Services
                </a>
              </li>
              <li>
                <a href="none" class="common-link">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-3 col-6 mt-3 mt-md-0">
            <h6> Hosting </h6>
            <ul class="list-unstyled">
              <li>
                <a href="none" class="common-link">
                  Why Host
                </a>
              </li>
              <li>
                <a href="none" class="common-link">
                  Responsible hosting
                </a>
              </li>
              <li>
                <a href="none" class="common-link">
                  Trust and Safety
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-3 col-6 mt-3 mt-md-0">
            <div>
              <h4>any suggestion</h4>

              <br />
              <form ref={form} onSubmit={sendEmail} style={{ display: "flex" }}>
                <input
                  type="text"
                  class="form-control"
                  placeholder="suggestion"
                  onChange={(e) => {
                    setTxtFeedBack(e.target.value);
                  }}
                  style={{ width: "200px" }}
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />

                <button class="btn btn-success" role="button">
                  send
                </button>
              </form>
            </div>
          </div>
          <div class="col-md-3 col-12 mt-3 mt-md-0">
            <div class="d-flex flex-wrap store-section justify-content-center justify-content-md-end connect-image-wrapper"></div>
            <div class="social-media-links mt-3 mb-3 mb-md-0">
              <div class="d-flex ">
                <div class="social-links ">
                  <a href="#" title="Facebook" rel="noreferrer">
                    <img
                      class="img src-image-fadeIn"
                      src="https://hyra.cron24.com/images/email/logo_facebook.png"
                      alt="Facebook"
                    />
                  </a>
                </div>
                <div class="social-links">
                  <a href="#" title="Instagram" rel="noreferrer">
                    <img
                      class="img src-image-fadeIn"
                      src="	https://hyra.cron24.com/images/email/logo_instagram.png"
                      alt="Instagram"
                    />
                  </a>
                </div>
                <div class="social-links">
                  <a href="#" title="Twitter" rel="noreferrer">
                    <img
                      class="img src-image-fadeIn"
                      src="	https://hyra.cron24.com/images/email/logo_twitter.png"
                      alt="Twitter"
                    />
                  </a>
                </div>
                <div class="social-links">
                  <a href="#" title="Linkedin" rel="noreferrer">
                    <img
                      class="img src-image-fadeIn"
                      src="https://hyra.cron24.com/images/email/logo_linkedin.png"
                      alt="Linkedin"
                    />
                  </a>
                </div>
                <div class="social-links">
                  <a
                    href="https://www.pinterest.com/cron24Technologies"
                    title="Pinterest"
                    rel="noreferrer"
                  >
                    <img
                      class="img src-image-fadeIn"
                      src="https://hyra.cron24.com/images/email/logo_pinterest.png"
                      alt="Pinterest"
                    />
                  </a>
                </div>
                <div class="social-links">
                  <a href="#" title="Youtube" rel="noreferrer">
                    <img
                      class="img src-image-fadeIn"
                      src="https://hyra.cron24.com/images/email/logo_youtube.png"
                      alt="Youtube"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div class="support-container ms-3 mt-3 mb-3 mb-md-0">
              <div class="mt-2 text-nowrap">
                <AiOutlineMail />
                <a class="ms-2" href="tel">
                  alayedmohammed0
                </a>
              </div>
              <div class="mt-2 text-nowrap">
                <AiOutlineMail />
                <a class="ms-2" href="tel">
                  hawamdey
                </a>
              </div>
              <div class="mt-2 text-nowrap">
                <AiOutlineMail />
                <a class="ms-2" href="tel">
                  omar.haamdan
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-copyright py-3 d-flex justify-content-center flex-wrap">
          <div class="col-md-4 order-2 order-md-1">
            <p class="mb-0 mt-2 mt-0 theme-text">
              © GoodNight 2022. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
