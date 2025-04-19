import React from "react";
import "../styles/footer.css";
import { FaLinkedinIn, FaGoogle, FaFacebookF } from "react-icons/fa";

function Footer() {
  return (
      <footer className="footer">
        <div className="footer-container">
            {/* Logo và thông tin */}
            <div className="footer-column">
            <h2 className="footer-logo">Chích Chòe</h2>
            <p className="footer-info">Hotline: 1900 2324 7182</p>
            <p className="footer-info">Địa Chỉ: 47 Đường 3</p>
            <p className="footer-info">Email: support@chichchoe.vn</p>
            </div>

            {/* Các liên kết */}
            <div className="footer-column footer-links">
            <a href="/policy" className="footer-link">Chính sách bảo mật</a>
            <a href="/terms" className="footer-link">Điều Khoản Sử Dụng</a>
            <a href="/privacy" className="footer-link">Quyền Riêng Tư Dữ Liệu</a>
            </div>

            {/* Mạng xã hội */}
            <div className="footer-column">
            <h3 className="social-title">Follow Us</h3>
            <div className="social-icons">
                <a href="#" className="social-icon linkedin">
                <FaLinkedinIn />
                </a>
                <a href="#" className="social-icon google">
                <FaGoogle />
                </a>
                <a href="#" className="social-icon facebook">
                <FaFacebookF />
                </a>
            </div>
            <p className="copyright">Bản quyền thuộc về team Chích Chòe</p>
            </div>
        </div>
      </footer>
  );
}

export default Footer;
