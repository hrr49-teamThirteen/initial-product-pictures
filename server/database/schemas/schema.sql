DROP DATABASE IF EXISTS fec;

CREATE DATABASE fec;

USE fec;

CREATE TABLE photos (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  photourl VARCHAR(255),
  colorid INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  colorid INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  reviewscore DECIMAL(10, 2) NOT NULL,
  questions INT NOT NULL,
  title VARCHAR(255),
  PRIMARY KEY (id)
);

ALTER TABLE photos ADD FOREIGN KEY (product_id) REFERENCES products(id);

