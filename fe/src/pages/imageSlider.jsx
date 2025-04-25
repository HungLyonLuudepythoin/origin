
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/imageSlider.css';
import { FaRegHeart } from "react-icons/fa";
import { GrView } from "react-icons/gr";

function ImageSlider() {
  const slides = [
    {
      id: 1,
      imageUrl: './images/post-sample-1.png', 
      likes: 130,
      views: 230
    },
    {
      id: 2,
      imageUrl: './images/post-sample-2.png', 
      likes: 370,
      views: 2280
    },
    {
      id: 3,
      imageUrl: './images/post-sample-3.png', 
      likes: 100,
      views: 280
    }
  ];

  return (
    <div className="slider-container">
      <Swiper
        modules={[Pagination]}
        grabCursor={true}
        centeredSlides={true}
        initialSlide={1}
        spaceBetween={60}
        speed={600}
        slidesPerView={3}
        pagination={{ clickable: true }}
        onClick={(swiper) => {
            swiper.slideTo(swiper.clickedIndex);
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide-card">
              <div className="image-container">
                <img src={slide.imageUrl} alt={`Cultural event ${slide.id}`} />
              </div>
              <div className="slide-stats">
                <div className="stat-item">
                    <FaRegHeart />    
                  <span>{slide.likes}</span>
                </div>
                <div className="stat-item">
                  <GrView />
                  <span>{slide.views}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;