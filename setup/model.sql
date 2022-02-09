create database olchauz;

create table users (
  id serial not null primary key,
  username varchar(100) not null unique,
  password varchar(20) not null,
  contact varchar(20) not null,
  email varchar(50) not null,
  role boolean not null default false
);

create table categories (
  id serial not null primary key,
  name varchar(70) not null
);

create table products (
  id serial not null primary key,
  category_id int references categories(id),
  name varchar(70) not null,
  price int not null,
  shortDesc varchar(200) not null,
  longDesc varchar(500) not null,
  picture_url text not null 
);


create table orders (
  id serial not null primary key,
  user_id int not null references users(id),
  product int not null references products(id),
  order_created_at timestamp default current_timestamp,
  is_paid boolean not null default false 
);

insert into users (username, password, contact, email, role) values 
  ('dilmurod', 'yt123', '+998991231245', 'erkinovdilmurod1@gmail.com', false),
  ('blvckeasy', 'islom1029', '+998994654655', 'islomhello_world9@gmail.com', true),
  ('john', 'pageio', '+998977896541', 'j0hnpoty_1@gmail.com', false),
  ('safia', '102938a', '+998991231245', 'saf1a_123@gmail.com', false);


insert into categories (name) values 
  ('Kompyuterlar'), 
  ('Kiyim-kechaklar'), 
  ('Mashinalar'), 
  ('Sport anjomlari'), 
  ('Maishiy texnikalar'), 
  ('Telefonlar');

insert into products ( category_id, name, price, shortDesc, longDesc, picture_url ) values 
  (1, 'Acer', 5000000, 'Aspire-370', 'core i7 holati ideal', '/1234567acer.jpg'),
  (1, 'Lenovo', 7000000, 'core i5', 'holati yangi RTX video karta', '/1234567lenovo.jpg'),
  (1, 'HP', 10000000, 'core i9', 'gamer kompyuter', '/1234567hp1.jpg'),
  (1, 'Asus', 3000000, 'Celeron', 'ofis uchun', '/1234567asus7.jpg'),
  (2, 'Jinsi', 100000, 'erkaklar uchun jinsi shim', 'arzon va sifatli', '/1234567jinsi_shim.jpg'),
  (2, 'Futbolka', 50000, 'oq futbolka', 'oq futbolka optom va arzon', '/1234567_oq_futbolka.jpg'),
  (2, 'Kepka', 35000, 'kuzgi kepka', 'qora rangli kepka', '/1234567kepka.jpg'),
  (2, 'Krasofka', 190000, 'bahorgi krasofka', 'bahorda kiyish uchun', '/1234567krasofka.jpg'),
  (3, 'Malibu', 320000000, '2021-yilgi holati ideal', 'oq yangi kelishamiz', '/1234567malibu.jpg'),
  (3, 'Gentra', 130000000, '2022-yilgi holati ideal', 'qora kotta bollaniki', '/1234567gentra.jpg'),
  (3, 'Spark', 70000000, '2017-yil 40ming probeg', 'skromniy bolla haydagan urilmagan', '/1234567spark.jpg'),
  (4, 'Gantel', 100000, '10kg massali gantel', 'sport zallari uchun', '/1234567gantel1.jpg'),
  (4, 'Velosiped', 1000000, 'yangi holatda', 'holati yaxshi haydalmagan', '/1234567velosiped.jpg'),
  (5, 'Kir yuvish mashina', 3500000, 'yangi holatda', 'holati yaxshi', '/1234567kir_yuvish_mashinasi.jpg'),
  (6, 'Iphone 13 Pro Max', 10000000, 'yangi rangi kok', 'narxini kelishamiz', '/1234567iphone13promax.jpg');



SELECT
	*
FROM products
WHERE	
	CASE
		WHEN length('K') > 0 THEN (SELECT id FROM categories WHERE name ILIKE concat('K', '%')) is not null
		ELSE TRUE
	END
LIMIT 1;