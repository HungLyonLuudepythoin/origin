import React, { useEffect, useState } from "react";
import "../styles/community.css";
import 'swiper/css';
import 'swiper/css/pagination';
import ImageSlider from "./imageSlider";

function Community() {
    const [openPostPopup, setOpenPostPopup] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [description, setDescription] = React.useState("");
    const [media, setMedia] = useState([]);  // State to store the media URLs
    const [previews, setPreviews] = useState([]); // State to store preview URLs

    // Fetch random media from the API
    useEffect(() => {
        const fetchRandomMedia = async () => {
            try {
                const response = await fetch("http://zlink.ddns.net:3368/api/minio/random-media?num=5");
                const data = await response.json();

                if (data && data.results) {
                    setMedia(data.results);  // Store the results in the media state
                    fetchPreviews(data.results);  // Fetch previews for the media
                }
            } catch (error) {
                console.error("Error fetching random media:", error);
            }
        };

        fetchRandomMedia();
    }, []);

    // Fetch previews for each media file
    const fetchPreviews = async (media) => {
        try {
            const previewUrls = await Promise.all(
                media.map(async (item) => {
                    const previewResponse = await fetch(`http://zlink.ddns.net:3368/api/minio/preview?path=${item.file}`);
                    if (previewResponse.ok) {
                        return previewResponse.url;  // URL to the preview image or video
                    }
                    throw new Error(`Failed to fetch preview for ${item.file}`);
                })
            );
            setPreviews(previewUrls);  // Set the preview URLs
        } catch (error) {
            console.error("Error fetching previews:", error);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            alert("Please select a file!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('description', description);

            const userId = 1;  // Assume user id is 1 for now
            const response = await fetch(`http://localhost:3000/api/user/${userId}/media`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Đã đăng ảnh thành công!');
                setOpenPostPopup(false);
                setSelectedFile(null);
                setDescription("");
            } else {
                alert('Đăng ảnh thất bại.');
            }
        } catch (err) {
            console.error('Error uploading file:', err);
            alert('Đăng ảnh thất bại.');
        }
    };

    return (
        <>
            {/* Post popup for posting */}
            {openPostPopup && (
                <div className="overlay">
                    <div className="post-popup">
                        <div className="popup-content">
                            <h2>Đăng tải trải nghiệm</h2>
                            <input
                                type="text"
                                className="name-input"
                                placeholder="Miêu tả hình ảnh..."
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                            <input
                                type="file"
                                name="post-img"
                                id="post-img"
                                className="img-input"
                                onChange={handleFileChange}
                            />
                            <div className="action-buttons">
                                <button className="close-button" onClick={() => { setShowConfirm(true); }}>Đóng</button>
                                <button type="submit" className="submit-button" onClick={handleSubmit}>
                                    Đăng tải
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showConfirm && (
                <div className="overlay">
                    <div className="confirm-popup">
                        <p>Bạn có chắc chắn muốn đóng không?</p>               
                        <div className="confirm-buttons">
                            <button className="close-button" onClick={() => setShowConfirm(false)}>Không</button>
                            <button className="submit-button" onClick={() => {
                                setOpenPostPopup(false);
                                setShowConfirm(false);
                            }}>Có</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Welcome view */}
            <div className="welcome">
                <h1>Chào mừng đến với</h1>
                <h1>Làng Văn Hoá</h1>
                {/* Posting button */}
                <button className="post-button" onClick={() => setOpenPostPopup(true)}>Đăng tải trải nghiệm của bạn</button>
            </div>

            {/* Story view */}
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

            {/* Users' posting slider */}
            <div className="posts">
                <h1>Nét đẹp ngày Giỗ Tổ</h1>
                <div className="img-slider">
                    <ImageSlider media={media} previews={previews} />  {/* Pass the media and previews to ImageSlider */}
                </div>
            </div>

            {/* Poem view */}
            <div className="community-poetry">
                <p>Biển Việt ngàn xưa đà có chủ <br/>
                Bờ Nam vạn đại hữu nhân ông <br/>
                Giang sơn gấm vóc từ bao thuở <br/>
                Hậu thế lưu truyền nếp Tổ Tông</p>
            </div>
        </>
    );
}

export default Community;
