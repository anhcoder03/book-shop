import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth-context";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
    }
  }
`;
const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
      toast.warning("Vui lòng đăng nhập để sử dụng tính năng này!");
    }
    if (userInfo?.role === "User") {
      toast.error("Không đủ quyền!");
      navigate("/");
    }
    console.log(userInfo?.role);
  }, [userInfo]);
  return (
    <DashboardStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
