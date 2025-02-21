CREATE TABLE admins (
   admin_id bigserial PRIMARY KEY,
   admin_email text not null,
   admin_password text not null,
   admin_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
   id bigserial PRIMARY KEY,
   name text,
   age int,
   phone_number text,
   email text,
   password text,
   weight NUMERIC(10, 1),
   height NUMERIC(10, 2),
   mode_id text,
   expired_date text,
   premium boolean DEFAULT false,
   avarage_period text,
   cycle_duration text,
   last_period_date text,
   fetal_age text,
   baby_born_date text,
   chat_id bigint,
   bot_step text,
   telegram boolean DEFAULT false,
   created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE otp (
   id bigserial PRIMARY KEY,
   chat_id bigint,
   code text,
   status boolean DEFAULT true,
   created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE devices (
   id bigserial PRIMARY KEY,
   user_id int REFERENCES users(id) ON DELETE CASCADE,
   phone_brand text,
   phone_lang text,
   app_lang text,
   platform text,
   created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories_article (
   id bigserial PRIMARY KEY,
   name text,
   lang text,
   type text,
   image_url text,
   image_name text,
   free boolean DEFAULT true,
   created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE articles (
   id bigserial PRIMARY KEY,
   category_id int REFERENCES categories_article(id) ON DELETE CASCADE,
   title text,
   description text,
   image_url text,
   image_name text,
   source text,
   video_url text,
   featured boolean DEFAULT false,
   free boolean DEFAULT true,
   created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);