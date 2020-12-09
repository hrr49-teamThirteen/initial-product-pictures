

DROP TABLE IF EXISTS "photos", "products", "users", "ratings";

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
  "questions" int,
  "title" varchar(255)
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar(255)
);

CREATE TABLE "ratings" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "product_id" int,
  "rating_given" int
);

ALTER TABLE "ratings"
  ADD CONSTRAINT "fk_rated_product"
  FOREIGN KEY ("product_id")
  REFERENCES "products" ("id")
  ON DELETE CASCADE;

ALTER TABLE "ratings"
  ADD CONSTRAINT "fk_user_id"
  FOREIGN KEY ("user_id")
  REFERENCES "users" ("id")
  ON DELETE CASCADE;

ALTER TABLE "photos"
  ADD CONSTRAINT "fk_product_id"
  FOREIGN KEY ("product_id")
  REFERENCES "products" ("id")
  ON DELETE CASCADE;

CREATE INDEX "photos_product_id_index" ON photos(product_id);
CREATE INDEX "ratings_product_id_index" ON ratings(product_id);


