import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import useClickOutSide from "../../hooks/useClickOutSide";
import { logout } from "../../redux/apiRequest";
import { InputSearch } from "../input";
import { debounce } from "lodash";

const HeaderStyles = styled.header`
  padding: 20px 0;
  border-bottom: 1px solid #d1d1d1;
  width: 100%;
  background-color: white;
  .header-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: block;
    max-width: 200px;
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
  .cart-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100rem;
    background-color: #f0f0f0;
    color: #444;
    width: 50px;
    height: 50px;
    position: relative;
  }
  .cart-total {
    position: absolute;
    z-index: 1;
    top: -5px;
    right: -10px;
    background-color: ${(props) => props.theme.red};
    color: white;
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 100rem;
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
  const { show, setShow, nodeRef } = useClickOutSide(".action-user");
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    logout(dispatch, navigate, accessToken);
    toast.success("Đăng xuất thành công!");
  };

  const HeadRef = useRef(null);
  useEffect(() => {
    const windowScroollHandler = debounce((e) => {
      if (window.window.scrollY > HeadRef.current.clientHeight) {
        HeadRef.current.classList.add("header-fixed");
        document.body.style.paddingTop = HeadRef.current.clientHeight + "px";
      } else if (window.window.scrollY < HeadRef.current.clientHeight) {
        HeadRef.current.classList.remove("header-fixed");
        document.body.style.paddingTop = "0px";
      }
    }, 500);
    window.addEventListener("scroll", windowScroollHandler);
    return () => {
      window.removeEventListener("scroll", windowScroollHandler);
    };
  }, []);

  return (
    <HeaderStyles ref={HeadRef}>
      <div className="container">
        <div className="header-main">
          <NavLink to="/">
            <img src="../logo.svg" alt="" className="logo" />
          </NavLink>
          <InputSearch></InputSearch>
          <div className="header-right">
            <div className="login">
              {!user ? (
                <NavLink to={"/sign-in"} className="nav-link">
                  Đăng nhập <i className="fa-solid fa-user"></i>
                </NavLink>
              ) : (
                <div className="user" ref={nodeRef}>
                  <div className="user-wrapper">
                    <span
                      className="fullname"
                      onClick={() => {
                        setShow(!show);
                      }}
                    >
                      <img src={user.image} className="user-avatar" alt="" />
                      {user.fullname}
                    </span>
                  </div>
                  <div className={`action-user ${show ? "show" : ""}`}>
                    <p onClick={handleSignOut}>Đăng xuất</p>
                    <p onClick={() => navigate("/profile")}>
                      Cập nhật tài khoản
                    </p>
                    {user?.admin === true ? (
                      <p onClick={() => navigate("/dashboard")}>Dashboard</p>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
            <div className="cart-icon">
              <i className="fa-sharp fa-solid fa-cart-shopping"></i>
              <span className="cart-total">0</span>
            </div>
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
