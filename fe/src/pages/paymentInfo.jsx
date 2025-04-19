import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../styles/paymentInfo.css';

const PaymentInfo = () => {
    const navigate = useNavigate();
    const paymentMove = () => {
        navigate('/paymentConfirm');
      };
  return (
    <div className="pi-container">
      <div className="pi-left">
        <div className="pi-left-content">
          <img src="images/hùng vương.png" alt="Ảnh" className="pi-image" />
          <p className="pi-desc">
            Sự đóng góp quỹ bầu của bạn không chỉ tiếp sức cho 
            hoạt động ý nghĩa, mà còn lan tỏa tinh thần "uống nước 
            nhớ nguồn", góp phần gìn giữ nét đẹp văn hóa dân tộc.
          </p>
          <h1 className="pi-title">Chích Chòe</h1>
        </div>
      </div>
      <div className="pi-right">
        <div className="pi-form">
          <h2 className="pi-form-title">Thông tin của bạn</h2>

          <div className="pi-group">
            <label htmlFor="username">Nhập số tiền ủng hộ</label>
            <input type="text" id="username" placeholder="Your username" className="pi-input" />
          </div>

          <p className="pi-note">
            Bạn sẽ nhận được một email xác nhận về thông tin đóng góp của mình
          </p>

          <div className="pi-amounts">
            <button className="pi-amount">20.000vnd</button>
            <button className="pi-amount">20.000vnd</button>
            <button className="pi-amount">20.000vnd</button>
          </div>

          <div className="pi-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your username" className="pi-input" />
          </div>

          <p className="pi-note">
            Bạn sẽ nhận được một email xác nhận về thông tin đóng góp của mình
          </p>

          <div className="pi-checkbox">
            <input type="checkbox" id="anonymous" />
            <label htmlFor="anonymous">Ủng hộ ẩn danh</label>
          </div>

          <h2 className="pi-form-title">Thông tin ủng hộ</h2>

          <div className="pi-group">
            <label htmlFor="donation-info">Nhập số tiền ủng hộ</label>
            <input type="text" id="donation-info" placeholder="Your username" className="pi-input" />
          </div>

          <div className="pi-group">
            <label htmlFor="organization">Tổ chức</label>
            <input type="text" id="organization" placeholder="Your username" className="pi-input" />
          </div>

          <button className="pi-submit" onClick={paymentMove}>Ủng hộ</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
