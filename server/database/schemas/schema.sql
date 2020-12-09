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
  questions INT NOT NULL,
  title VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id int PRIMARY KEY AUTO_INCREMENT,
  username varchar(50)
);

CREATE TABLE ratings (
  id int PRIMARY KEY AUTO_INCREMENT,
  user_id int,
  product_id int,
  rating_given int
);

ALTER TABLE ratings ADD FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE ratings ADD FOREIGN KEY (user_id) REFERENCES users(id);


ALTER TABLE photos ADD FOREIGN KEY (product_id) REFERENCES products(id);

