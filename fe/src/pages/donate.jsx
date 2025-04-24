import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "../styles/donate.css";
import { Tab } from "bootstrap";
function Donate() {
  const targetRef = useRef(null);
  const navigate = useNavigate();
  const scrollClick = () => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
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

  const navigationClick = () => {
    navigate('/paymentInfo');
  };
  const topDonate = [
    { name: "Nguyễn Mạnh Tuấn Tú", amount: "500000" },
    { name: "Trần Thị Linh", amount: "450000" },
    { name: "Lê Văn Đạt", amount: "350000" },
    { name: "Lương Thị Đoan Trang", amount: "300000" },
    { name: "Hoàng Văn Phước Đại", amount: "280000" },
    { name: "Phan Tường Vi", amount: "250000" },
    { name: "Võ Minh Quân", amount: "200000" },
    { name: "Hoàng Thùy Linh", amount: "150000" },
    { name: "Trần Thị Minh Thư", amount: "120000" },
    { name: "Đinh Văn Tùng", amount: "100000" },
  ]
  const allSearch = [
    { id: "1", name: "Lương Thị Đoan Trang", transaction: "28561245", amount: "50000", description: "Hi vọng lưu giữ giá trị văn hóa" },
    { id: "1", name: "Lương Thị Đoan Trang", transaction: "32617893", amount: "75000", description: "Góp phần bảo tồn di sản dân tộc" },
    { id: "3", name: "Nguyễn Thị Đoan Trang", transaction: "41256738", amount: "100000", description: "Chung tay bảo vệ di tích lịch sử" },
    { id: "3", name: "Nguyễn Thị Đoan Trang", transaction: "52937862", amount: "60000", description: "Để lại dấu ấn cho thế hệ sau" }
  ]
  const [status, setStatus] = useState('top');
  function switchTable(value) {
    setStatus(value);
  }
  function StatusTable({status}) {
    if (status==="top") {
      return (
        <Table borderless responsive hover className="tableTop">
          <tbody>
            {topDonate.map((donate, index) => (
              <tr key={index}>
                <td>#{index + 1}</td>
                <td style={{ color: '#0077CC', fontWeight: '600' }}>{donate.name}</td>
                <td style={{ fontWeight: '700', fontSize: '17px' }}>{donate.amount} đ</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
    else if (status==="search") {
      return (
      <>
        <form id="searchForm" className="search-container">
            <input type="text" name="name" placeholder="Nhập tên..." className="search-input1" />
            <input type="text" name="id" placeholder="Nhập ID..." className="search-input2" />
            <button type="submit" className="search-button"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </form>
        <Table responsive hover className="tableTop">
          <thead>
            <tr>
              <th>ID</th>
              <th>Họ và Tên</th>
              <th>Mã Giao Dịch</th>
              <th>Số Tiền</th>
              <th>Lời Chúc</th>
            </tr>
          </thead>
          <tbody>
            {allSearch.map((search, index) => (
              <tr key={index}>
                <td>{search.id}</td>
                <td style={{ fontWeight: '700', fontSize: '17px' }}>{search.name}</td>
                <td>{search.transaction}</td>
                <td>{search.amount}</td>
                <td>{search.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
      )
    }
  } 
  return (
    <>
      <div className="introduction">
        <div className="donate-introduction">
          <h1 className="donate-title">Một Tấm Lòng Ngàn Năm Cội Rễ</h1>
          <p className="donate-subtitle">
            Chúng ta không thể quay về quá khứ, nhưng có thể góp phần xây dựng nơi bắt đầu của nó – để những giá trị thiêng liêng không bao giờ bị lãng quên
          </p>
          <div className="donate-button"><button onClick={scrollClick}>Quyên góp</button></div>
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

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '100px'}}>
        <div className="container-table">
          <div className="donateTableButton">
            <button onClick={() => switchTable('top')} className={`${status !== 'top' ? 'inactive' : 'active'}`}>Top Donate</button>
            <button onClick={() => switchTable('search')} className={` ${status !== 'search' ? 'inactive' : 'active'}`}>Search</button>
          </div>
          <StatusTable status={status} />
        </div>
      </div>

      <section ref={targetRef} className="donate-help">
        <h2>Hãy cùng chung tay giúp đỡ</h2>
        <form className="donation">
          <div className="donation-info">
            <p>Thông Tin Quyên Góp Của Bạn</p>
            <div className="donation-details">
              <span>Võ Minh Quân</span>
              <span>150.000đ</span>
            </div>
          </div>

          <label>Số Tiền Quyên Góp</label>
          <input placeholder="Nhập Số Tiền"/>

          <label>Lời Chúc Tốt Đẹp</label>
          <input placeholder="Type Message"/>

          <button type="submit" className="confirm-button">Xác Nhận</button>
        </form>
      </section>
    </>
  );
}

export default Donate;
