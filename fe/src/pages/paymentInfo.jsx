import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/paymentInfo.css';

const PaymentInfo = () => {
  const navigate = useNavigate();

  const paymentMove = (e) => {
    e.preventDefault();
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
        
        <form className="pi-form" onSubmit={paymentMove} action="/api/donate/create" method="POST">
          <h2 className="pi-form-title">Thông tin của bạn</h2>

          <div className="pi-group">
            <label htmlFor="amount">Nhập số tiền ủng hộ</label>
            <input type="number" id="amount" name="amount" placeholder="VD: 20000" className="pi-input" required />
          </div>

          <p className="pi-note">
            Bạn sẽ nhận được một email xác nhận về thông tin đóng góp của mình
          </p>

          <div className="pi-amounts">
            <button type="button" className="pi-amount">20.000vnd</button>
            <button type="button" className="pi-amount">50.000vnd</button>
            <button type="button" className="pi-amount">100.000vnd</button>
          </div>

          <div className="pi-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Email của bạn" className="pi-input" required />
          </div>

          <p className="pi-note">
            Bạn sẽ nhận được một email xác nhận về thông tin đóng góp của mình
          </p>

          <div className="pi-checkbox">
            <input type="checkbox" id="anonymous" name="anonymous" />
            <label htmlFor="anonymous">Ủng hộ ẩn danh</label>
          </div>

          <h2 className="pi-form-title">Thông tin ủng hộ</h2>

          <div className="pi-group">
            <label htmlFor="donation-detail">Ghi chú hoặc lời nhắn</label>
            <input type="text" id="donation-detail" name="donationDetail" placeholder="Lời nhắn" className="pi-input" />
          </div>

          <div className="pi-group">
            <label htmlFor="organization">Tổ chức</label>
            <input type="text" id="organization" name="organization" placeholder="Tên tổ chức" className="pi-input" />
          </div>

          <button type="submit" className="pi-submit">Ủng hộ</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentInfo;
