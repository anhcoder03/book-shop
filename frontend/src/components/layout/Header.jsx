import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { logout } from "../../redux/apiRequest";
import { logoutSuccess } from "../../redux/authSlice";
import { createAxios } from "../../utils/createInstance";

const HeaderStyles = styled.header`
  padding: 20px 0;
  border-bottom: 1px solid #d1d1d1;
  .header-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: block;
    max-width: 200px;
  }
  .search {
    display: flex;
    align-items: center;
    padding: 12px 25px;
    border: 1px solid #eee;
    border-radius: 20px;
    width: 100%;
    max-width: 500px;
    position: relative;
  }
  .search-input {
    flex: 1;
    padding-right: 80px;
    font-weight: 500;
  }
  .search-icon {
    position: absolute;
    background-color: #ff6651;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 40px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 20px;
    right: 4px;
    cursor: pointer;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .login {
    padding-right: 20px;
    border-right: 2px solid #ff6651;
  }
  .login .nav-link {
    color: #000;
  }
  .cart-icon:hover,
  .login .nav-link:hover {
    color: #ff6651;
    cursor: pointer;
  }
  .user {
    font-size: 14px;
    position: relative;
    cursor: pointer;
  }
  .action-user.show {
    display: block;
  }
  .action-user {
    display: none;
    transition: all 0.2s linear;
    position: absolute;
    z-index: 9;
    width: 150px;
    top: calc(100% + 10px);
    background-color: #ff6651;
  }
  .action-user p {
    padding: 10px;
    color: #eee;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 1px solid #d1d1d1;
    transition: all 0.2s linear;
    text-align: center;
  }
  .action-user p:hover {
    background-color: #fff;
    color: #ff6651;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  .user-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .fullname {
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 500;
  }
  .user-avatar {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = user?.accessToken;
  const id = user?._id;
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const handleSignOut = () => {
    logout(dispatch, id, navigate, accessToken, axiosJWT);
    // toast.success("Đăng xuất thành công!");
  };
  return (
    <HeaderStyles>
      <div className="header-top"></div>
      <div className="container">
        <div className="header-main">
          <NavLink href="/">
            <img src="logo.svg" alt="" className="logo" />
          </NavLink>
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search posts..."
            />
            <span className="search-icon">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#fff"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          <div className="header-right">
            <div className="login">
              {!user ? (
                <NavLink to={"sign-in"} className="nav-link">
                  Đăng nhập <i className="fa-solid fa-user"></i>
                </NavLink>
              ) : (
                <div className="user">
                  <div className="user-wrapper">
                    <span
                      className="fullname"
                      onClick={() => {
                        setShowDropdown(!showDropdown);
                      }}
                    >
                      <img src={user.avatar} className="user-avatar" alt="" />
                      {user.fullname}
                    </span>
                  </div>
                  <div className={`action-user ${showDropdown ? "show" : ""}`}>
                    <p onClick={handleSignOut}>Đăng xuất</p>
                    <p>Cập nhật tài khoản</p>
                    {user?.admin === true ? (
                      <NavLink to={"/dashboard"}>Dashboard</NavLink>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
            <div className="cart-icon">
              <i className="fa-sharp fa-solid fa-cart-shopping"></i>
            </div>
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
