-- Database

CREATE TABLE carts (
    id integer NOT NULL,
    user_id integer
);

CREATE TABLE carts_products (
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer
);


CREATE TABLE orders (
    id integer NOT NULL,
    user_id integer,
    status character varying,
    "time" timestamp without time zone,
    total_price money
);

CREATE TABLE orders_products (
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer,
    price money
);

CREATE TABLE products (
    id integer NOT NULL,
    name character varying NOT NULL,
    price money NOT NULL,
    description character varying
);

CREATE TABLE users (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL
);

ALTER TABLE ONLY carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY carts_products
    ADD CONSTRAINT carts_products_pkey PRIMARY KEY (cart_id, product_id);

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);

ALTER TABLE ONLY orders_products
    ADD CONSTRAINT orders_products_pkey PRIMARY KEY (order_id, product_id);

ALTER TABLE ONLY products
    ADD CONSTRAINT products_name_key UNIQUE (name);

ALTER TABLE ONLY products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_id_fkey FOREIGN KEY (id) REFERENCES public.users(id);

ALTER TABLE ONLY carts_products
    ADD CONSTRAINT carts_products_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id);

ALTER TABLE ONLY carts_products
    ADD CONSTRAINT carts_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);

ALTER TABLE ONLY orders_products
    ADD CONSTRAINT orders_products_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);

ALTER TABLE ONLY orders_products
    ADD CONSTRAINT orders_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

INSERT INTO products (id, name, price, description)
VALUES (1, '1 Bedroom Floorplan', 875, 'Single bedroom floorplan.'),
(2, '2 Bedroom Floorplan', 1500, 'Two bedroom floorplan.'),
(3, '3 Bedroom Floorplan', 2000, 'Three bedroom floorplan.');