import React, { useRef } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo2 from "../../Assets/logo2.webp";
import PersonIcon from "@material-ui/icons/Person";
import { logout } from "../../actions/userAction";
import { ToastContainer, toast } from "react-toastify";

import HomeIcon from "@material-ui/icons/Home";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HeartIcon from "@material-ui/icons/FavoriteBorder";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Support from "@material-ui/icons/ReportProblem";
import DashboardIcon from "@material-ui/icons/Dashboard";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { favouriteItems } = useSelector((state) => state.favourite);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const switcherTab = useRef(null);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      document.querySelector(".navbar").classList.add("active");
    } else {
      document.querySelector(".navbar").classList.remove("active");
    }
  });

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }

  const options = [
    {
      icon: <HomeIcon className="menuIcon" />,
      name: "Trang chủ",
      link: "/",
    },
    {
      icon: <ListAltIcon className="menuIcon" />,
      name: "Đơn hàng",
      link: "/orders",
    },
    {
      icon: (
        <ShoppingCartIcon
          className="menuIcon"
          style={{ color: cartItems.length === 0 ? "" : "tomato" }}
        />
      ),
      name: `Giỏ hàng (${cartItems.length})`,
      link: "/cart",
    },
    {
      icon: (
        <HeartIcon
          className="menuIcon"
          style={{ color: favouriteItems.length === 0 ? "" : "tomato" }}
        />
      ),
      name: `Yêu thích (${favouriteItems.length})`,
      link: "/favourites",
    },
    {
      icon: <PersonIcon className="menuIcon" />,
      name: "Tôi",
      link: "/me",
    },
    {
      icon: <Support className="menuIcon" />,
      name: "Báo cáo",
      link: "/support",
    },
  ];

  if (user && user !== null) {
    if (user.role === "admin" || user.role === "Creator") {
      options.unshift({
        icon: <DashboardIcon className="menuIcon" />,
        name: "Quản lý",
        link: "/dashboard",
      });
    }
  }

  return (
    <div className="Header">
      {/* Phần thông báo phía trên */}
      <div className="Header__announcement">
        <span>Mừng sinh nhật 2 tuổi, nhiều quà tặng khuyến mãi, miễn phí vẫn chuyển toàn quốc!</span>
      </div>

      {/* Thanh menu với logo2 */}
      <div className="navbar flex pz__10 space__beetween" ref={switcherTab}>
        {/* Logo */}
        <div className="logo2 pxy__10">
          <Link to="/">
            <img
              src={logo2}
              alt="Logo"
              className="logoImage"
            />
          </Link>
        </div>

        {/* Navigation */}
        <div className="navigation">
          <ul className="navList">
            <Link to="/">
              <li>Trang chủ</li>
            </Link>
            <Link to="/about">
              <li>Giới thiệu</li>
            </Link>
            <Link to="/Products">
              <li>Sản phẩm</li>
            </Link>
            <Link to="/faq">
              <li>Điều khoản người dùng</li>
            </Link>
            <Link to="/contact">
              <li>Liên hệ</li>
            </Link>
            <Link to="/creator">
              <li>Blog</li>
            </Link>
          </ul>
        </div>

        {/* Icon bên phải */}
        <div className="rightOption flex align__items__center">
          <Link to="/search" className="iconLink">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-search pxz__20 black pointer" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </Link>

          <Link to="/favourites" className="iconLink heart__products">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-heart pxz__20 black" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>
            <div className="badge">{favouriteItems.length}</div>
          </Link>

          <Link to="/cart" className="iconLink cart__items">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart3 pxz__20 black" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <div className="badge">{cartItems.length}</div>
          </Link>

          {user ? (
            <div className="dropdown">
              <button className="dropbtn">
                <img
                  className="avatarOptions"
                  src={user.avatar ? user.avatar.url : "/profile.png"}
                  alt="Profile"
                />
              </button>
              <div className="dropdown-content">
                {options.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
                <div className="divlogout">
                  <button className="LogOutBtn" onClick={logoutUser}>
                    <ExitToAppIcon className="menuIcon" />
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="user__account">
              <PersonIcon className="menuIcon" />
            </Link>
          )}
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Header;
