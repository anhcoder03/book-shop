import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-main {
      display: grid;
      grid-template-columns: 200px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
    }
  }
`;
const DashboardLayout = ({ children }) => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
      toast.warning("Đăng nhập để vào trang quản trị!");
    }
    if (!user.admin) {
      navigate("/");
      toast.warning("Tài khoản của bạn không phải là người quản trị");
    }
  }, [user]);
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
