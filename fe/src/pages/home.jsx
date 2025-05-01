import '../styles/home.css';
import React, { useEffect } from 'react';


function Home() {
   useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      document.querySelectorAll('.hidden-left, .hidden-right').forEach(el => observer.observe(el));
    }, []);
  return (
    <>
      <div className="home">
        <div className="picture-container">
          <a href=""><button>Khám phá</button></a>
        </div>
        <div className="schedule-container">
          <div className="h1-container"><h1>Lịch trình tham quan</h1></div>
          <div className="content-layout">
            <div className="left-column">
              <div className="img-box hidden-left" id="img-box-1"></div>
      
              <div className="section" id="section-1">
                <h2>Tham quan Đền Hạ - Đền Trung</h2>
                <p className="text">Thời gian: 8h30 - 9h30</p>
                <p className="para">Nội dung: Tìm hiểu về lịch sử các đời Vua Hùng, lắng nghe thuyết minh về truyền thuyết Lạc Long Quân – Âu Cơ và ý nghĩa tín ngưỡng thờ cúng Hùng Vương.</p>
              </div>
      
              <div className="img-box hidden-left" id="img-box-2"></div>
      
              <div className="section" id="section-2">
                <h2>Tham gia hội trại – trò chơi dân gian</h2>
                <p className="text">Thời gian: 14h00 – 16h00</p>
                <p className="para">Nội dung: Giao lưu văn hóa, trải nghiệm các trò chơi dân gian (bịt mắt bắt dê, kéo co, đánh đu, ném còn...) và tham quan hội trại thanh thiếu niên. </p>
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
              <div className="section" id="section-3">
                <h2>Dâng hương tại Đền Thượng</h2>
                <p className="text">Thời gian: 7h30 – 8h30</p>
                <p className="paragraph">Nội dung: Hành trình lên Đền Thượng – nơi thờ Quốc Tổ Lạc Long Quân và các Vua Hùng, thực hiện nghi thức dâng hương tưởng niệm.</p>
              </div>
      
              <div className="img-box hidden-right" id="img-box-3">
              </div>
      
              <div className="section" id="section-4">
                <h2>Ghé thăm Bảo tàng Hùng Vương</h2>
                <p className="text">Thời gian: 10h00 – 11h00</p>
                <p className="para">Nội dung: Trưng bày nhiều hiện vật, hình ảnh quý giá về thời đại Hùng Vương, nền văn minh Văn Lang – Âu Lạc, và quá trình dựng nước.</p>
              </div>
      
              <div className="img-box hidden-right" id="img-box-4">
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
    </>
  );
}

export default Home;