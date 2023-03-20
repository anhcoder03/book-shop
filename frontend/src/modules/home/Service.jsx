import React from "react";
import styled from "styled-components";

const ServiceStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 30px;
  margin-bottom: 4rem;
  .service-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    padding-right: 30px;
    border-right: 1px solid rgb(218, 225, 231);
  }
  .service-item:last-child {
    border-right: none;
    padding-right: 0;
  }
  .service-icon i {
    font-size: 28px;
    color: ${(props) => props.theme.primary};
  }
  .service-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
  .service-title {
    font-size: 16px;
    font-weight: 500;
  }
  .service-text {
    font-size: 14px;
    color: rgb(125, 135, 156);
  }
`;
const listService = [
  {
    icon: <i className="fa-solid fa-truck"></i>,
    title: "Giao hàng nhanh chóng",
    text: "Chỉ từ 3 -5 ngày",
  },
  {
    icon: <i className="fa-solid fa-money-check-dollar"></i>,
    title: "Đảm bảo tiền",
    text: "7 ngày trở lại",
  },
  {
    icon: <i className="fa-solid fa-clock-rotate-left"></i>,
    title: "365 ngày",
    text: "Để được trả lại miễn phí",
  },
  {
    icon: <i className="fa-solid fa-building-columns"></i>,
    title: "Sự chi trả",
    text: "Hệ thống an toàn",
  },
];
const Service = () => {
  return (
    <ServiceStyles>
      {listService.length > 0 &&
        listService.map((item) => (
          <div className="service-item" key={item.title}>
            <div className="service-icon">{item.icon}</div>
            <div className="service-content">
              <h4 className="service-title">{item.title}</h4>
              <p className="service-text">{item.text}</p>
            </div>
          </div>
        ))}
    </ServiceStyles>
  );
};

export default Service;
