import React, { useEffect, useRef, useState } from "react";
import { redirect, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "../styles/donate.css";
function Donate() {
  const HOST = import.meta.env.VITE_DOMAIN
  const [description, setDescription] = useState('');
  const [amountDonate, setAmountDonate] = useState('');
  const [userName, setUserName] = useState('');
  const [userDonateList, setUserDonateList] = useState([]);
  const [topDonaters, setTopDonaters] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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
  useEffect(() => {
    const fetchUserDonate = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const resUser = await fetch(`${HOST}/auth/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        });
        const dataUser = await resUser.json();
        const userId = dataUser.user.id_user;
        const userName = dataUser.user.ho_ten;
        setUserName(userName);
  
        const resUserDonate = await fetch(`${HOST}/api/donate/${userId}`, { 
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const dataUserDonate = await resUserDonate.json();
        setUserDonateList(dataUserDonate.data.total_donated);  // bạn cần coi backend trả về thế nào để set cho chuẩn
      } catch (error) {
        console.error("loi fetch donate", error);
      }
    }
  
    fetchUserDonate();
  }, []);
  useEffect(() => {
    const fetchTopDonaters = async () => {
      try {
        const res = await fetch(`${HOST}/api/donate/topDonaters`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.error === 0) {
          setTopDonaters(data.data);  // backend đã trả về list [{ id_user, total_donated }]
        }
      } catch (error) {
        console.error("Failed to fetch top donaters:", error);
      }
    };
  
    fetchTopDonaters();
  }, []);  
  const [status, setStatus] = useState('top');
  function switchTable(value) {
    setStatus(value);
  }
  function StatusTable({status}) {
    if (status==="top") {
      return (
        <Table borderless responsive hover className="tableTop">
          <tbody>
            {topDonaters.map((donate, index) => (
              <tr key={index}>
                <td>#{index + 1}</td>
                <td style={{ color: '#0077CC', fontWeight: '600' }}>{donate.ho_ten}</td>
                <td style={{ fontWeight: '700' }}>{donate.total_donated} đ</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
    else if (status==="search") {
      return (
      <>
        <form id="searchForm" className="search-container" onSubmit={handleSearch}>
          <input 
            type="text" 
            name="name" 
            placeholder="Nhập tên..." 
            className="search-input1" 
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input 
            type="text" 
            name="id" 
            placeholder="Nhập ID..." 
            className="search-input2" 
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button type="submit" className="search-button">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
        <Table responsive hover className="tableTop">
          <thead>
            <tr>
              <th>ID</th>
              <th>Họ và Tên</th>
              <th>Mã Giao Dịch</th>
              <th>Số Tiền</th>
              <th>Ngày donate</th>
              <th>Lời Chúc</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((search, index) => (
              <tr key={index}>
                <td>{search.id_user}</td>
                <td style={{ fontWeight: '700'}}>{search.ho_ten}</td>
                <td>{search.magiaodich}</td>
                <td>{search.sotien}</td>
                <td>{search.ngaydonate}</td>
                <td>{search.mota}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
      )
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập trước khi quyên góp!");
      navigate("/login");
      return;
    } 
    const resUser = await fetch(`${HOST}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });
    const dataUser = await resUser.json()
    const userId = dataUser.user.id_user
    const resDonate = await fetch(`${HOST}/api/donate/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: description,
        amountDonate: amountDonate,
        userId: userId,
      }),
    });
    const dataDonate = await resDonate.json();
    if (dataDonate.error === 0 && dataDonate.data.checkoutUrl) {
      window.location.href = dataDonate.data.checkoutUrl;
    } else {
      alert('Có lỗi xảy ra!');
    }
    } catch(err) {
      console.log("loi donate",err)
    }
  }; 
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams();
      if (searchId) queryParams.append("userId", searchId);
      if (searchName) queryParams.append("userName", searchName);
  
      const res = await fetch(`${HOST}/api/donate/find?${queryParams.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await res.json();
      if (data.error === 0) {
        setSearchResults(data.data);
      } else {
        alert("Không tìm thấy kết quả phù hợp.");
      }
    } catch (error) {
      console.error("Lỗi tìm kiếm donate:", error);
    }
  };
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
        <img src="./images/logo.png" alt="Parade" />
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
        <form className="donation" onSubmit={handleSubmit} >
          <div className="donation-info">
            <p>Thông Tin Quyên Góp Của Bạn</p>
            <div className="donation-details">
            <span>{userName}</span>
            <span>{userDonateList}</span>
            </div>
          </div>

          <label>Số Tiền Quyên Góp</label>
          <input
            type="number"
            name="amountDonate"
            placeholder="Amount (VND)"
            required
            value={amountDonate}
            onChange={(e) => setAmountDonate(e.target.value)}
          />
          <label>Lời Chúc Tốt Đẹp</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit" className="confirm-button">Xác Nhận</button>
        </form>
      </section>
    </>
  );
}

export default Donate;
