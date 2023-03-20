import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const FooterStyles = styled.div`
  margin-top: 50px;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; */
  padding-top: 50px;
  background-color: #f0f0f0;
  .footer-top {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .footer-column {
    display: flex;
    flex-direction: column;
    gap: 30px 0;
  }
  .footer-title {
    font-size: 20px;
    font-weight: 600;
    position: relative;
  }
  .footer-title::after {
    position: absolute;
    content: "";
    top: 100%;
    width: 40%;
    left: 0;
    height: 4px;
    background-color: ${(props) => props.theme.primary};
  }
  .footer-content {
    display: flex;
    flex-direction: column;
    gap: 10px 0;
  }
  .footer-content p {
    font-size: 14px;
    color: #333;
  }
  .footer-link:hover {
    color: ${(props) => props.theme.primary};
  }
  .footer-link {
    font-size: 16px;
    color: #333;
  }
`;

const Footer = () => {
  return (
    <FooterStyles>
      <div className="container">
        <div className="footer-top py-3">
          <div className="footer-column">
            <NavLink>
              <img src="logo.svg" alt="" />
            </NavLink>
            <ul className="footer-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
                libero id et, in gravida. Sit diam duis mauris nulla cursus.
                Erat et lectus vel ut sollicitudin elit at amet.
              </p>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="footer-title">CHÍNH SÁCH HỖ TRỢ</h3>
            <ul className="footer-content">
              <NavLink className="footer-link">
                Chính sách đổi - trả - hoàn tiền
              </NavLink>
              <NavLink className="footer-link">Chính sách bảo hành</NavLink>
              <NavLink className="footer-link">Chính sách vận chuyển</NavLink>
              <NavLink className="footer-link">
                Phương thức thanh toán và xuất HĐ
              </NavLink>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="footer-title">DỊCH VỤ</h3>
            <ul className="footer-content">
              <NavLink className="footer-link">Điều khoản sử dụng</NavLink>
              <NavLink className="footer-link">
                Chính sách bảo mật thông tin cá nhân
              </NavLink>
              <NavLink className="footer-link">
                Chính sách bảo mật thanh toán
              </NavLink>
              <NavLink className="footer-link">
                Hệ thống trung tâm - nhà sách
              </NavLink>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="footer-title">LIÊN HỆ</h3>
            <ul className="footer-content">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8857432929085!2d108.16728081477798!3d16.07141778887958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218e0ffef24e7%3A0x997b4bc2eeeaa45a!2zMTEzIE5ndXnhu4VuIFjDrSwgSG_DoCBNaW5oLCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1679305327010!5m2!1svi!2s"
                width="300px"
                height="100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <p>
                <span>SĐT:</span> <span>0357984421</span>
              </p>
              <p>
                <span>email</span> <span>anhcoder03@gmail.com</span>
              </p>
              <p>
                <span>Địa chỉ:</span>{" "}
                <span>
                  113 Nguyễn Xí -P.Hoà Minh - Q.Liên Chiểu - TP.Đà Nẵng
                </span>
              </p>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom bg-gray-200 py-3">
        <p className="text-center text-sm text-gray-00">
          @2023. Design by Nguyen Phi Anh
        </p>
      </div>
    </FooterStyles>
  );
};

export default Footer;
