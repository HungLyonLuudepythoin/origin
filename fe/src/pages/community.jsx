import React from "react";
import "../styles/community.css";
import { Navigation, Pagination, Autoplay, EffectCoverflow} from 'swiper/modules';
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
      className="community-card"
      style={{ backgroundImage: `url(./images/${img})` }}
    >
      <p>{quote[i]}</p>
      <img src="./decoration/dec1.png" />
    </div>
  );
}

function Community() {
  return (
    <div className="community-container">
      {/* Title */}
      <div className="community-title">
        <h1>Chào mừng đến với</h1>
        <h2>Làng Văn Hóa</h2>
      </div>

      {/* Tour 3d */}
        <div className="community-3d" style={{ marginBottom: '120px' }}>
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
      <div className="community-section">
        <div className="vertical-title">
          {"VĂN HOÁ LÀ GÌ".split(" ").map((word, wordIndex) => (
            <div className="vertical-word" key={wordIndex}>
              {word.split("").map((char, charIndex) => (
                <span key={charIndex}>{char}</span>
              ))}
            </div>
          ))}
        </div>
        <div className="community-cards">
          {["parade1.jpg", "parade2.jpg", "parade3.jpg"].map(VanHoa)}
        </div>
      </div>
      {/* Nét đẹp ngày Giỗ Tổ */}
      <div className="community-highlight">
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
          className="community-swiper"
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
      <div className="community-video">
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
      <div className="community-quote">
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

export default Community;