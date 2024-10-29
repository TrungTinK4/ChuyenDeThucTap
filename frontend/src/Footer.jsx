import React from "react";
import { Link } from "react-router-dom";
import logo2 from "./Assets/logo2.webp";  // Thay logo bằng logo của bạn

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        {/* Logo và thông tin liên hệ */}
        <div className="footer-section footer-contact">
          <img src={logo2} alt="Logo" className="footer-logo" />
          <div className="contact-info">
            <p><i className="fas fa-phone-alt"></i> Tổng đài CSKH: 02873066060</p>
            <p><i className="fas fa-envelope"></i> Email: cskh@icondenim.com</p>
          </div>

          {/* Đăng ký nhận tin */}
          <div className="newsletter">
            <h4>ĐĂNG KÝ NHẬN TIN</h4>
            <p>Hãy là người đầu tiên nhận khuyến mãi lớn!</p>
            <input type="email" placeholder="Nhập địa chỉ email" />
            <button>ĐĂNG KÝ</button>
          </div>
          
          {/* Kết nối với chúng tôi */}
          <div className="social-media">
            <h4>KẾT NỐI VỚI CHÚNG TÔI</h4>
            <div className="social-icons">
              <Link to="/zalo"><i className="fab fa-zalo"></i></Link>
              <Link to="/facebook"><i className="fab fa-facebook"></i></Link>
              <Link to="/instagram"><i className="fab fa-instagram"></i></Link>
              <Link to="/tiktok"><i className="fab fa-tiktok"></i></Link>
            </div>
          </div>
        </div>

        {/* Hỗ trợ khách hàng */}
        <div className="footer-section">
          <h4>HỖ TRỢ KHÁCH HÀNG</h4>
          <ul>
            <li><Link to="/doi-hang">Chính sách đổi hàng và bảo hành</Link></li>
            <li><Link to="/membership">Chính sách Membership</Link></li>
            <li><Link to="/sinh-nhat">Chính sách ưu đãi sinh nhật</Link></li>
            <li><Link to="/bao-mat">Chính sách bảo mật</Link></li>
            <li><Link to="/giao-hang">Chính sách giao hàng</Link></li>
          </ul>
        </div>

        {/* Hệ thống cửa hàng */}
        <div className="footer-section">
          <h4>HỆ THỐNG CỬA HÀNG</h4>
          <p>Store 1: 12-12Bis, CMT8, P.Bến Thành, Q1, HCM</p>
          <p>Store 2: 484, Lê Văn Sỹ, P.14, Q.3, HCM</p>
          <p>Store 3: 477 - 481, Sư Vạn Hạnh, P.12, Q.10, HCM</p>
          <p>Store 4: 261, Quang Trung, P.10, Q.Gò Vấp, HCM</p>
          {/* Thêm các địa chỉ cửa hàng khác nếu cần */}
        </div>

        {/* Fanpage */}
        <div className="footer-section">
          <h4>FANPAGE CHÚNG TÔI</h4>
          <div className="fanpage">
            <Link to="/facebook"><img src="fanpage-image.jpg" alt="Fanpage" /></Link>
          </div>
        </div>
      </div>

      {/* Phương thức thanh toán */}
      <div className="footer-bottom">
        <div className="payment-methods">
          <h4>PHƯƠNG THỨC THANH TOÁN</h4>
          <i className="fab fa-momo"></i>
          <i className="fab fa-vnpay"></i>
          <i className="fas fa-cash-register"></i>
        </div>
        <div className="certifications">
          <img src="dathongbao.webp" alt="Đã thông báo Bộ Công Thương" />
          <img src="dmca.png" alt="DMCA Protected" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
