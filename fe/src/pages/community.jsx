import React from "react";
import "../styles/community.css";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { GrView } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import ImageSlider from "./imageSlider";

function Community() {
    return (
        <>
            <div className="welcome">
                <h1>Chào mừng đến với</h1>
                <h1>Làng Văn Hoá</h1>
                <button className="post-btn">Đăng tải trải nghiệm của bạn</button>
            </div>
            <div className="story">
                <div className="story-box">
                    <h3>Lễ Giỗ Tổ Hùng Vương</h3>
                    <p>- Lễ Giỗ Tổ Hùng Vương, diễn ra vào ngày 10 tháng 3 âm lịch hàng năm, là dịp để người dân Việt Nam tưởng nhớ và tri ân các vua Hùng. </p><br />
                     <p>- Lễ hội không chỉ mang ý nghĩa lịch sử sâu sắc mà còn thể hiện lòng biết ơn đối với những thế hệ đi trước, những người đã đóng góp cho sự phát triển và bảo vệ đất nước. </p><br/>    
                     <p>- Trong suốt nhiều thế kỷ, lễ Giỗ Tổ Hùng Vương đã trở thành một nghi lễ quan trọng, gắn liền với các hoạt động văn hóa, thể thao, và những nghi thức trang trọng diễn ra ở khắp nơi từ đền Hùng cho đến các địa phương trong cả nước. 
                    </p>
                </div>
                <div className="story-img"> 
                    <img src="/images/story-img.png" alt="Hung King image" />
                </div>
            </div>
            <div className="posts">
                <h1>Nét đẹp ngày Giỗ Tổ</h1>
                <div className="img-slider"><ImageSlider /></div>
            </div>
            
            <div className="poetry">
                <p>Biển Việt ngàn xưa đà có chủ <br/>
                Bờ Nam vạn đại hữu nhân ông <br/>
                Giang sơn gấm vóc từ bao thuở <br/>
                Hậu thế lưu truyền nếp Tổ Tông</p>
            </div>
        </>
    )
}

export default Community;