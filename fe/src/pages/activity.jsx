import React, { useEffect } from "react";
import "../styles/activity.css";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

function VanHoa(img, i) {
  const quote = [
    "Văn hóa là linh hồn mỗi dân tộc, giữ gìn bản sắc qua bao thế hệ",
    "Văn hóa là ngọn lửa bền bỉ, luôn cháy sáng trong mỗi con người",
    "Văn hóa là sức mạnh vô hình, kết nối quá khứ, hiện tại và tương lai"
  ];

  return (
    <div
      key={i}
      className="activity-card"
      style={{ backgroundImage: `url(./images/${img})` }}
    >
      <p className="hidden">{quote[i]}</p>
      <img src="./decoration/dec1.png" />
    </div>
  );
}

function Activity() {
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
    <div className="activity-container">
      {/* Title */}
      <div className="activity-title">
        <h1>Chào mừng đến với</h1>
        <h2>Làng Văn Hóa</h2>
      </div>

      {/* Tour 3d */}
      <div className="activity-3d" style={{ marginBottom: '120px' }}>
        <h3>Hành Trình Về Cội Nguồn</h3>
        <h2>Khám Phá Bảo Tàng Hùng Vương</h2>
        <div style={{ width: '1200px', height: '700px', margin: '0 auto', marginTop: '50px' }}>
          <iframe
            src="https://vnmh.egal.vn/tours/dongson/"
            title="Dong Son Tour"
            width="1200"
            height="700"
            style={{
              border: 'none',
            }}
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Văn hoá là gì section */}
      <div className="activity-section">
        <div className="vertical-title">
          {"VĂN HOÁ LÀ GÌ".split(" ").map((word, wordIndex) => (
            <div className="vertical-word" key={wordIndex}>
              {word.split("").map((char, charIndex) => (
                <span key={charIndex} className="hidden">{char}</span>
              ))}
            </div>
          ))}
        </div>
        <div className="activity-cards">
          {["parade1.jpg", "parade2.jpg", "parade3.jpg"].map(VanHoa)}
        </div>
      </div>

      {/* Nét đẹp ngày Giỗ Tổ */}
      <div className="activity-highlight">
        <h3>Nét đẹp ngày Giỗ Tổ</h3>
        <Swiper
          modules={[Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          initialSlide={4}
          speed={600}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 0,
            stretch: 80,
            depth: 350,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          onClick={(swiper) => {
            swiper.slideTo(swiper.clickedIndex);
          }}
          className="activity-swiper"
        >
          <SwiperSlide><img src="./images/festival1.jpg" /></SwiperSlide>
          <SwiperSlide><img src="./images/festival2.jpg" /></SwiperSlide>
          <SwiperSlide><img src="./images/festival3.jpg" /></SwiperSlide>
          <SwiperSlide><img src="./images/festival4.jpg" /></SwiperSlide>
          <SwiperSlide><img src="./images/festival5.jpg" /></SwiperSlide>
          <SwiperSlide><img src="./images/parade1.jpg" /></SwiperSlide>
          <SwiperSlide><img src="./images/parade2.jpg" /></SwiperSlide>
          <SwiperSlide><img src="./images/temple1.jpg" /></SwiperSlide>
          <SwiperSlide><img src="./images/temple2.jpg" /></SwiperSlide>
        </Swiper>
      </div>

      {/* Video */}
      <div className="activity-video">
        <iframe
          width="900"
          height="500"
          src="https://www.youtube.com/embed/Qw3XCMRxMr8"
          title="Giỗ Tổ Hùng Vương"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Quote */}
      <div className="activity-quote">
        <p>
          Biển Việt ngàn xưa đã có chủ<br />
          Bờ Nam vạn đại hữu nhân ông<br />
          Giang sơn gấm vóc từ bao thuở<br />
          Hậu thế lưu truyền nếp Tổ Tông
        </p>
      </div>
    </div>
  );
}

export default Activity;
