import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px 40px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  .sidebar-logo {
    img {
      max-width: 200px;
    }
  }
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
`;

const DashboardHeader = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  return (
    <DashboardHeaderStyles>
      <div className="sidebar-logo">
        <img src="./logo.svg" alt="" />
      </div>
      <div className="header-avatar">
        <img
          src={
            user?.image
              ? user.avatar
              : "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
          }
          alt=""
        />
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
