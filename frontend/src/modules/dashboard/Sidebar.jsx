import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const SidebarStyles = styled.div`
  width: 200px;
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
  border-radius: 12px;
  .menu-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 14px 20px;
    font-weight: 500;
    color: ${(props) => props.theme.gray80};
    margin-bottom: 20px;
    cursor: pointer;
    &.active,
    &:hover {
      background: #ff655114;
      color: ${(props) => props.theme.primary};
    }
  }
`;
const sidebarLinks = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <i className="fa-solid fa-layer-group"></i>,
  },
  {
    title: "Product",
    url: "/manage/product",
    icon: <i className="fa-solid fa-folder"></i>,
  },
  {
    title: "Category",
    url: "/manage/category",
    icon: <i className="fa-solid fa-list-check"></i>,
  },
  {
    title: "Comment",
    url: "/manage/comment",
    icon: <i className="fa-solid fa-comment"></i>,
  },
  {
    title: "User",
    url: "/manage/user",
    icon: <i className="fa-regular fa-user"></i>,
  },
  {
    title: "Logout",
    url: "/",
    icon: <i className="fa-solid fa-right-from-bracket"></i>,
    onClick: () => {},
  },
];
const Sidebar = () => {
  return (
    <SidebarStyles className="sidebar">
      {sidebarLinks.map((link) => (
        <NavLink to={link.url} className="menu-item" key={link.title}>
          <span className="menu-icon">{link.icon}</span>
          <span className="menu-text">{link.title}</span>
        </NavLink>
      ))}
    </SidebarStyles>
  );
};

export default Sidebar;
