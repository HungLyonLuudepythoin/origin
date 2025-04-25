import React from 'react';
import '../styles/aboutUs.css';

export default function AboutUs() {
  return (
    <div className="us-container">
      <header>
        <h1>Về chúng tôi</h1>
        <div className="us-intro">
          <p>Chúng tôi là một tổ chức/tập thể (hoặc nhóm, dự án) dành riêng cho việc bảo tồn và lan tỏa những giá trị văn hóa, lịch sử của dân tộc Việt Nam, đặc biệt là ngày Giỗ Tổ Hùng Vương.</p>
          <p>Chúng tôi theo đuổi các giá trị Tôn vinh, Giáo dục, Khơi dậy và Sáng tạo, nhằm đưa di sản văn hóa Việt Nam đến gần hơn với cộng đồng, đồng thời phát huy tinh thần yêu nước trong mỗi con người Việt.</p>
        </div>
      </header>

      <section className="us-section">
        <div className="us-text">
          <h2>Sứ mệnh</h2>
          <p>Chúng tôi mong muốn truyền tải những giá trị văn hóa và lịch sử của lễ Giỗ Tổ Hùng Vương đến thế hệ trẻ, giúp các em hiểu và trân trọng cội nguồn dân tộc. Mục tiêu của chúng tôi là khơi dậy niềm tự hào và ý thức gìn giữ di sản văn hóa Việt Nam trong mỗi người yêu nước.</p>
        </div>
        <div className="us-image">
          <img src="./images/logo.png" alt="Logo Team" />
        </div>
      </section>

      <section className="us-values">
        <h2>Những Giá Trị Mà Chúng Tôi Theo Đuổi</h2>
        <div className="us-value-list">
          {[
            { title: 'Tôn vinh', image: './images/tôn vinh.jpg' },
            { title: 'Giáo Dục', image: './images/giáo dục.png' },
            { title: 'Khơi Dậy', image: './images/khơi dậy.jpg' },
            { title: 'Sáng tạo', image: './images/sáng tạo.jpg' }
          ].map((item, i) => (
            <div className="us-value-card" key={i} style={{ backgroundImage: `url('${item.image}')` }}>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
