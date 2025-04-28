
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/imageSlider.css';
import { FaRegHeart } from "react-icons/fa";
import { GrView } from "react-icons/gr";

function ImageSlider() {
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch('http://localhost:3000/api/user/random-media?num=10');
        const data = await res.json();
        console.log('Fetched media:', data);

        // Assuming your backend sends an array of media
        setSlides(
          data.map((item) => ({
            id_media: item.id_media,
            file_url: item.file_url,
            likes: Math.floor(Math.random() * 500),  // TEMP FAKE likes
            views: Math.floor(Math.random() * 3000)  // TEMP FAKE views
          }))
        );
      } catch (error) {
        console.error('Failed to fetch media', error);
      }
    }

    fetchSlides();
  }, []);
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
          <SwiperSlide key={slide.id_media}>
            <div className="slide-card">
              <div className="image-container">
                <img src={slide.file_url} alt={`Media ${slide.id_media}`} />
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