import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const menuLinks = [
  {
    url: "/",
    title: "Trang chủ",
  },
  {
    url: "/product",
    title: "Sản Phẩm",
  },
  {
    url: "/theloai",
    title: "Thể loại",
  },
  {
    url: "/news",
    title: "Tin Tức",
  },
  {
    url: "/contact",
    title: "Liên Hệ",
  },
];
const MenuStyles = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  .menu-wrapper {
    display: flex;
    align-items: center;
    gap: 40px;
    margin-left: 40px;
    list-style: none;
  }
  .menu-link {
    color: #000;
    font-size: 16px;
    font-weight: 500;
  }
  .menu-link.active {
    color: #ff6651;
    font-weight: 600;
  }
  .menu-link:hover {
    color: #ff6651;
  }
`;
const Menu = () => {
  return (
    <MenuStyles>
      <div className="menu-wrapper">
        {menuLinks.map((item) => (
          <li className="menu-item" key={item.title}>
            <NavLink
              to={item.url}
              className={`menu-link ${({ isActive }) =>
                isActive ? "active" : ""}`}
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </div>
    </MenuStyles>
  );
};

export default Menu;
