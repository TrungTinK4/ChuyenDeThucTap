import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata.js";
import Loading from "../../more/Loader.js";
import { getAdminProduct } from "../../actions/ProductActions.js";
import { getAllOrders } from "../../actions/OrderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import currency from "currency-formatter";
import IncomeChart from "./Chart/IncomeChart.jsx";
import OderChart from "./Chart/OderChart.jsx";
import ProductSell from "./Chart/ProductSell.jsx";
import UserBuyMost from "./Chart/UserBuyMost.jsx"; 
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.AllOrders);
  const { users } = useSelector((state) => state.allUsers);

  const [showIncomeChart, setShowIncomeChart] = useState(false);
  const [showOrderChart, setShowOrderChart] = useState(false);
  const [showProductSell, setShowProductSell] = useState(false);
  const [showUserBuyMost, setShowUserBuyMost] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [showIncomeChartDetail, setShowIncomeChartDetail] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State cho chế độ sáng/tối

  let outOfStock = 0;
  let canNhapHang = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock < 30) {
        canNhapHang += 1;
      }
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    if (canNhapHang > 0) {
      toast.warning(
        "Có sản phẩm sắp hết hàng!! Quản lý nhớ chú ý việc nhập hàng sớm nhất."
      );
    }
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      if (
        item.orderStatus !== "Hủy đơn hàng" &&
        item.paymentMethod !== "Thanh toán khi nhận hàng !"
      ) {
        totalAmount += item.totalPrice;
      } else if (
        item.paymentMethod === "Thanh toán khi nhận hàng !" &&
        item.orderStatus === "Đã giao hàng"
      ) {
        totalAmount += item.totalPrice;
      }
    });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Chuyển đổi chế độ sáng/tối
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      {loading ? (
        <Loading />
      ) : (
        <div className="dashboard">
          <MetaData title="Quản lý" />
          <Sidebar />

          <div className="dashboardContainer">
            <div className="dashboardHeader">
              <Typography component="h1" variant="h3">Dashboard</Typography>
              <div className="dashboardOptions">
                <Link to="/me" className="dashboardOption">Quản lý</Link>
                <div className="dashboardOption" onClick={toggleTheme}>
                  Cài đặt
                </div>
              </div>
            </div>

            <div className="dashboardSummaryBox2">
              <Link 
                to="#" 
                className="dashboardCard" 
                onClick={() => setShowIncomeChartDetail(!showIncomeChartDetail)}
              >
                <div className="cardContent">
                  <p>Tổng thu nhập</p>
                  <h2>{currency.format(totalAmount, { code: "VND" })}</h2>
                </div>
                <div className="cardIcon">
                  <i className="fas fa-wallet"></i>
                </div>
              </Link>

              <Link to="/admin/products" className="dashboardCard">
                <div className="cardContent">
                  <p>Sản phẩm</p>
                  <h2>{products && products.length}</h2>
                </div>
                <div className="cardIcon">
                  <i className="fas fa-box"></i>
                </div>
              </Link>

              <Link to="/admin/orders" className="dashboardCard">
                <div className="cardContent">
                  <p>Đơn hàng</p>
                  <h2>{orders && orders.length}</h2>
                </div>
                <div className="cardIcon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
              </Link>

              <Link to="/admin/users" className="dashboardCard">
                <div className="cardContent">
                  <p>Tài khoản</p>
                  <h2>{users && users.length}</h2>
                </div>
                <div className="cardIcon">
                  <i className="fas fa-users"></i>
                </div>
              </Link>

              <Link to="/admin/products" className="dashboardCard">
                <div className="cardContent">
                  <p>Sản phẩm hết hàng</p>
                  <h2>{products && outOfStock}</h2>
                </div>
                <div className="cardIcon">
                  <i className="fas fa-exclamation-circle"></i>
                </div>
              </Link>

              {/* Thêm ô ví */}
              <Link to="/admin/wallet" className="dashboardCard">
                <div className="cardContent">
                  <p>Ví</p>
                  <h2>0</h2>
                </div>
                <div className="cardIcon">
                  <i className="fas fa-wallet"></i>
                </div>
              </Link>

              {/* Thêm ô đánh giá */}
              <Link to="/admin/reviews" className="dashboardCard">
                <div className="cardContent">
                  <p>Đánh giá</p>
                  <h2>0</h2>
                </div>
                <div className="cardIcon">
                  <i className="fas fa-star"></i>
                </div>
              </Link>

              {/* Ô vuông để hiển thị danh sách biểu đồ */}
              <div className="dashboardCard" onClick={() => setShowCharts(!showCharts)}>
                <div className="cardContent">
                  <p>Hiển thị biểu đồ</p>
                </div>
                <div className="cardIcon">
                  <i className="fas fa-chart-bar"></i>
                </div>
              </div>
            </div>

            {/* Hiển thị biểu đồ thu nhập hàng ngày ngay lập tức */}
            {showIncomeChartDetail && (
              <div className="lineChart">
                <IncomeChart />
              </div>
            )}

            {/* Hiển thị danh sách các button cho biểu đồ */}
            {showCharts && (
              <div className="chartsContainer">
                <div className="chartButtons">
                  <button onClick={() => setShowIncomeChart(!showIncomeChart)}>
                    {showIncomeChart ? "Ẩn biểu đồ thu nhập" : "Hiện biểu đồ thu nhập"}
                  </button>
                  <button onClick={() => setShowOrderChart(!showOrderChart)}>
                    {showOrderChart ? "Ẩn biểu đồ đơn hàng" : "Hiện biểu đồ đơn hàng"}
                  </button>
                  <button onClick={() => setShowProductSell(!showProductSell)}>
                    {showProductSell
                      ? "Ẩn biểu đồ bán sản phẩm"
                      : "Hiện biểu đồ bán sản phẩm"}
                  </button>
                  <button onClick={() => setShowUserBuyMost(!showUserBuyMost)}>
                    {showUserBuyMost ? "Ẩn biểu đồ người mua nhiều nhất" : "Hiện biểu đồ người mua nhiều nhất"}
                  </button>
                </div>

                {/* Hiển thị các biểu đồ tương ứng */}
                {showIncomeChart && (
                  <div className="lineChart">
                    <IncomeChart />
                  </div>
                )}

                {showOrderChart && (
                  <div className="lineChart">
                    <OderChart />
                  </div>
                )}

                {showProductSell && (
                  <div className="lineChart">
                    <ProductSell />
                  </div>
                )}

                {showUserBuyMost && (
                  <div className="lineChart">
                    <UserBuyMost />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
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

export default Dashboard;
