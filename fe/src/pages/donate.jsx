import React, { useEffect } from "react";
import "../styles/donate.css";

function Donate() {
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
    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
  }, []);

  return (
    <>
      <div className="introduction">
        <div className="donate-introduction">
          <h1 className="donate-title">Một Tấm Lòng Ngàn Năm Cội Rễ</h1>
          <p className="donate-subtitle">
            Chúng ta không thể quay về quá khứ, nhưng có thể góp phần xây dựng nơi bắt đầu của nó – để những giá trị thiêng liêng không bao giờ bị lãng quên
          </p>
          <div className="donate-button"><button>Quyên góp</button></div>
        </div>
        <img src="./images/parade.jpg" alt="Parade" />
      </div>

      <div className="donate-stats">
        <div className="stat"><h2>1M</h2><p>Người ủng hộ</p></div>
        <div className="stat"><h2>1K+</h2><p>Tình nguyện viên</p></div>
        <div className="stat"><h2>150+</h2><p>Đền được trùng tu</p></div>
      </div>

      <section className="donate-about">
        <h2>Chúng tôi ở đây</h2>
        <p>
        Chúng tôi mong muốn truyền tải những giá trị văn hóa và lịch sử của lễ Giỗ Tổ Hùng Vương đến thế hệ trẻ, giúp các em hiểu và trân trọng cội nguồn dân tộc. Mục tiêu của chúng tôi là khơi dậy niềm tự hào và ý thức gìn giữ di sản văn hóa Việt Nam trong mỗi người yêu nước.
        </p>
      </section>

      <section className="donate-temples">
        <h2>Một số ngôi đền đã được trùng tu</h2>
        <div className="temple-gallery">
          {["temple1.jpg", "temple2.jpg", "temple3.jpg"].map((img, i) => (
            <div key={i} className="temple-card" style={{ backgroundImage: `url('./images/${img}')` }}>
              <button>Đọc thêm</button>
            </div>
          ))}
        </div>
      </section>

      <section className="donate-help">
        <h2>Hãy cùng chung tay giúp đỡ</h2>
        <div className="qr-code">
          <img src="./images/qrcode.png" className="hidden" alt="QR Code" />
        </div>
      </section>
    </>
  );
}

export default Donate;
