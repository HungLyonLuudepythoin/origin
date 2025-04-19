import React from 'react';
import '../styles/aboutUs.css';

export default function AboutUs() {
  return (
    <>
      <div className="frame">
        <header>
          <div className="about-title">Về chúng tôi</div>
          <div className="intro">
            <p>Chúng tôi là một tổ chức/tập thể (hoặc nhóm, dự án) dành riêng cho việc bảo tồn và lan tỏa những giá trị văn hóa, lịch sử của dân tộc Việt Nam, đặc biệt là ngày Giỗ Tổ Hùng Vương.</p>
            <p>Chúng tôi theo đuổi các giá trị Tôn vinh, Giáo dục, Khởi đầy và Sáng tạo, nhằm đưa di sản văn hóa Việt Nam đến gần hơn với cộng đồng, đồng thời phát huy tinh thần yêu nước trong mỗi con người Việt.</p>
          </div>
        </header>

        <section className="purpose">
          <div className="content">
            <h2 className="section-title">SỨ MỆNH</h2>
            <div className="content-text">
              <p>Chúng tôi mong muốn truyền tải những giá trị văn hóa và lịch sử của lễ Giỗ Tổ Hùng Vương đến thế hệ trẻ, giúp các em hiểu và trân trọng cội nguồn dân tộc. Mục tiêu của chúng tôi là khơi dậy niềm tự hào và ý thức gìn giữ di sản văn hóa Việt Nam trong mỗi người yêu nước.</p>
            </div>
          </div>
          <div className="purpose-image">
            <img src="images/purpose image.jpeg" alt="Ảnh Vua Hùng" className="purpose-image" />
          </div>
        </section>

        <section className="values">
          <h2 className="values-title">Những Giá Trị Mà Chúng Tôi Theo Đuổi</h2>

          <div className="value-cards">
            <div className="value-card">
              <div className="card-image ton-vinh">
                <img src="images/tôn vinh.jpg" alt="Ảnh tôn vinh" className="purpose-image" />
              </div>
              <div className="card-title">Tôn vinh</div>
            </div>

            <div className="value-card">
              <div className="card-image giao-duc">
                <img src="images/sleeping beauty.jpg" alt="Ảnh Vua Hùng" className="purpose-image" />
              </div>
              <div className="card-title">Giáo dục</div>
            </div>

            <div className="value-card">
              <div className="card-image khoi-day">
                <img src="images/sleeping beauty.jpg" alt="Ảnh Vua Hùng" className="purpose-image" />
              </div>
              <div className="card-title">Khởi đầy</div>
            </div>

            <div className="value-card">
              <div className="card-image sang-tao">
                <img src="images/.jpeg" alt="Ảnh Vua Hùng" className="purpose-image" />
              </div>
              <div className="card-title">Sáng tạo</div>
            </div>
          </div>
        </section>
      </div>

    </>
  );
}