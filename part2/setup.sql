CREATE DATABASE IF NOT EXISTS DogWalkService;
USE DogWalkService;

DROP TABLE IF EXISTS WalkRequests;
DROP TABLE IF EXISTS Dogs;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  role ENUM('owner', 'walker') NOT NULL
);

CREATE TABLE Dogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT,
  name VARCHAR(50),
  FOREIGN KEY (owner_id) REFERENCES Users(id)
);

CREATE TABLE WalkRequests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT,
  dog_id INT,
  requested_datetime DATETIME,
  duration_minutes INT,
  location VARCHAR(100),
  FOREIGN KEY (owner_id) REFERENCES Users(id),
  FOREIGN KEY (dog_id) REFERENCES Dogs(id)
);

INSERT INTO Users (email, password, role) VALUES ('owner1@example.com', 'password123', 'owner');
INSERT INTO Dogs (owner_id, name) VALUES (1, 'Bruno');
