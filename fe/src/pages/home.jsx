
import React from 'react';
import '../styles/home.css';

function Home() {
  return (
    <div className="home">
      <div className="picture-container">
        <a href=""><button>Khám phá</button></a>
      </div>
      <div className="schedule-container">
        <h1>Lịch trình tham quan</h1>
        <div className="content-layout">
          <div className="left-column">
            <div className="content-box">
              {/* Empty content box */}
            </div>
            
            <div className="section">
              <h2>Tham quan Đền Hạ - Đền Trung</h2>
              <p className="text">text</p>
              <p className="para">para</p>
            </div>
            
            <div className="content-box">
              {/* Empty content box */}
            </div>
            
            <div className="section">
              <h2>header</h2>
              <p className="text">text</p>
              <p className="para">para</p>
            </div>
          </div>
          
          <div className="center-column">
            <div className="number-marker n1">
              <span>1</span>
            </div>
            <div className="number-marker n2">
              <span>2</span>
            </div>
            <div className="number-marker n3">
              <span>3</span>
            </div>
            <div className="number-marker n4">
              <span>4</span>
            </div>
            <div className="number-marker n5">
              <span>5</span>
            </div>
          </div>
          
          <div className="right-column">
            <div className="section">
              <h2>Dâng hương tại Đền Thượng</h2>
              <p className="text">text</p>
              <p className="paragraph">paragraph</p>
            </div>
            
            <div className="content-box">
              {/* Empty content box */}
            </div>
            
            <div className="section">
              <h2>header</h2>
              <p className="text">text</p>
              <p className="para">para</p>
            </div>
            
            <div className="content-box">
              {/* Empty content box */}
            </div>
            
            <div className="conclusion">
              <h2>Kết thúc</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="poetry">
        <p>Dù ai đi ngược về xuôi <br />
        Nhớ ngày Giỗ Tổ mùng 10 tháng 3</p>
      </div>
    </div>
  );
}

export default Home;