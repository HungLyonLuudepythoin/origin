import React from 'react';
import '../styles/thankYou.css';
import { useNavigate } from 'react-router-dom';
const ThankYou = () => {
  const navigate = useNavigate();
  const navigationClick = () => {
    navigate('/');
  };
  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <h1>Cảm ơn bạn đã góp một phần vào hành trình lưu giữ nơi bắt đầu của dân tộc.</h1>
        <p>
            Hành động của bạn không chỉ giúp trùng tu một công trình, mà còn là lời
            tri ân sâu sắc gửi đến tổ tiên – những người đã dựng nên hình hài
            đất nước hôm nay.
        </p>
        <div className="thank-button" style={{marginTop: '30px'}}><button onClick={navigationClick}>Go Back Home</button></div>
      </div>
    </div>
  );
};

export default ThankYou;
