CREATE TABLE Users (
  id_user INT(11) NOT NULL AUTO_INCREMENT,
  ho_ten NVARCHAR(30) NOT NULL,
  PRIMARY KEY (id_user)
)
CREATE TABLE Donaters (
  magiaodich CHAR(1) NOT NULL,
  sotien INT(11) NOT NULL,
  ngaydonate DATETIME NOT NULL,
  id_user INT(11) NOT NULL,
  mota NVARCHAR(1000) NOT NULL,
  INDEX (id_user),
  FOREIGN KEY (id_user) REFERENCES Users(id_user)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
) 

CREATE TABLE Media_files (
  id_media INT(11) NOT NULL AUTO_INCREMENT,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_url VARCHAR(255) NOT NULL,
  minio_key VARCHAR(512) NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_user INT(11) NOT NULL,
  PRIMARY KEY (id_media),
  INDEX (id_user),
  FOREIGN KEY (id_user) REFERENCES Users(id_user)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
)

CREATE TABLE Posts (
  id_post int(11) AUTO_INCREMENT,
  post NVARCHAR(1024) NOT NULL,
  id_user INT(11) NOT NULL,
  PRIMARY KEY (id_post),
  INDEX (id_user),
  FOREIGN KEY (id_user) REFERENCES Users(id_user)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT
)