

DROP TABLE "photos", "products";

CREATE TABLE "photos" (
  "id" SERIAL PRIMARY KEY,
  "product_id" int,
  "photourl" varchar(255),
  "colorid" int
);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "colorid" int,
  "price" decimal(10,2),
  "reviewscore" decimal(10,2),
  "questions" int,
  "title" varchar(255)
);

ALTER TABLE "photos" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");


