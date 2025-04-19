import React from 'react';
import '../styles/paymentConfirm.css';
import { FaCcMastercard, FaCcVisa, FaCcPaypal, FaCreditCard, FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PaymentConfirmation = () => {
  const navigate = useNavigate();
  const navigationClick = () => {
    navigate('/thank');
  };
  return (
    <div className="cf-wrap">
      <div className="cf-left">
        <div className="cf-methods">
          <div className="cf-icon mastercard"><FaCcMastercard /></div>
          <div className="cf-icon visa"><FaCcVisa /></div>
          <div className="cf-icon paypal"><FaCcPaypal /></div>
          <div className="cf-icon other"><FaCreditCard /></div>
        </div>

        <div className="cf-form">
          <div className="cf-group">
            <label>Số thẻ Holder</label>
            <input type="text" placeholder="Nhập số thẻ" className="cf-input" />
          </div>

          <div className="cf-group">
            <label>Tên thẻ Holder</label>
            <input type="text" placeholder="Nhập tên" className="cf-input" />
          </div>

          <div className="cf-row">
            <div className="cf-group">
              <label>Ngày hết hạn</label>
              <input type="text" placeholder="mm/dd" className="cf-input" />
            </div>

            <div className="cf-group">
              <label>Mã bảo mật</label>
              <div className="cf-cvv-box">
                <input type="text" placeholder="NNN" className="cf-input" />
                <div className="cf-cvv-icon"><FaQuestionCircle /></div>
              </div>
            </div>
          </div>

          <div className="cf-check">
            <input type="checkbox" id="cf-save" defaultChecked />
            <label htmlFor="cf-save">Lưu lại thông tin cho những lần sau</label>
          </div>

          <div className="cf-total">
            <div className="cf-label">Total Amount</div>
            <div className="cf-value">XX.000 VND</div>
          </div>

          <button className="cf-button" onClick={navigationClick}>XÁC NHẬN</button>
        </div>
      </div>

      <div className="cf-right">
        <div className="cf-right-content">
          <img src="images/cờ việt nam.jpg" alt="Ảnh" className="cf-img" />
          <p className="cf-desc">
            Sự đóng góp quỹ bầu của bạn không chỉ tiếp sức cho
            hoạt động ý nghĩa, mà còn lan tỏa tinh thần "uống nước
            nhớ nguồn", góp phần gìn giữ nét đẹp văn hóa dân tộc.
          </p>
          <h1 className="cf-title">Chích Chòe</h1>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
