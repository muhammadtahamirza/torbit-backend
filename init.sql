-- ====================================================
-- 1. TABLE STRUCTURES & SEQUENCES
-- ====================================================

-- TODOS: you gonna shift to ORMs from sql queries good luck ..
CREATE TABLE public.offers (
    offer_id integer NOT NULL,
    owner_id integer,
    car_name character varying(255) NOT NULL,
    seats_available integer NOT NULL,
    monthly_per_person numeric NOT NULL,
    pickup_points jsonb NOT NULL,
    destination character varying(255) DEFAULT 'CFD Campus'::character varying,
    departure_time time without time zone NOT NULL,
    arrival_time time without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(20) DEFAULT 'active'::character varying,
    CONSTRAINT pickup_points_array CHECK ((jsonb_typeof(pickup_points) = 'array'::text))
);

CREATE SEQUENCE public.offers_offer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.requests (
    request_id integer NOT NULL,
    offer_id integer,
    passenger_id integer,
    status character varying(20) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE SEQUENCE public.requests_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(100) NOT NULL,
    gender character varying(20),
    email character varying(255) NOT NULL,
    password character varying(255),
    otp_code character varying(6),
    otp_expiry timestamp without time zone,
    is_verified boolean DEFAULT false,
    google_id character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    contact character varying(20)
);

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.wanted_ride_requests (
    request_id integer NOT NULL,
    wanted_id integer,
    driver_id integer,
    status character varying(20) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE SEQUENCE public.wanted_ride_requests_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.wanted_rides (
    wanted_id integer NOT NULL,
    student_id integer,
    pickup_points jsonb NOT NULL,
    destination character varying(255) DEFAULT 'FAST CFD Campus'::character varying,
    departure_time time without time zone NOT NULL,
    arrival_time time without time zone NOT NULL,
    monthly_budget numeric NOT NULL,
    seats_needed integer DEFAULT 1,
    status character varying(20) DEFAULT 'active'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pickup_points_array CHECK ((jsonb_typeof(pickup_points) = 'array'::text))
);

CREATE SEQUENCE public.wanted_rides_wanted_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- ====================================================
-- 2. ALTERATIONS & DEFAULT VALUES
-- ====================================================

ALTER TABLE ONLY public.offers ALTER COLUMN offer_id SET DEFAULT nextval('public.offers_offer_id_seq'::regclass);
ALTER TABLE ONLY public.requests ALTER COLUMN request_id SET DEFAULT nextval('public.requests_request_id_seq'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
ALTER TABLE ONLY public.wanted_ride_requests ALTER COLUMN request_id SET DEFAULT nextval('public.wanted_ride_requests_request_id_seq'::regclass);
ALTER TABLE ONLY public.wanted_rides ALTER COLUMN wanted_id SET DEFAULT nextval('public.wanted_rides_wanted_id_seq'::regclass);

-- Reset counter indexing sequences
SELECT pg_catalog.setval('public.offers_offer_id_seq', 1, false);
SELECT pg_catalog.setval('public.requests_request_id_seq', 1, false);
SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);
SELECT pg_catalog.setval('public.wanted_ride_requests_request_id_seq', 1, false);
SELECT pg_catalog.setval('public.wanted_rides_wanted_id_seq', 1, false);

-- ====================================================
-- 3. CONSTRAINT ASSIGNMENTS
-- ====================================================

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_pkey PRIMARY KEY (offer_id);

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_offer_id_passenger_id_key UNIQUE (offer_id, passenger_id);

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (request_id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);

ALTER TABLE ONLY public.wanted_ride_requests
    ADD CONSTRAINT wanted_ride_requests_pkey PRIMARY KEY (request_id);

ALTER TABLE ONLY public.wanted_ride_requests
    ADD CONSTRAINT wanted_ride_requests_wanted_id_driver_id_key UNIQUE (wanted_id, driver_id);

ALTER TABLE ONLY public.wanted_rides
    ADD CONSTRAINT wanted_rides_pkey PRIMARY KEY (wanted_id);

-- Foreign Key Connections
ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(user_id) ON DELETE CASCADE;

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES public.offers(offer_id) ON DELETE CASCADE;

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_passenger_id_fkey FOREIGN KEY (passenger_id) REFERENCES public.users(user_id) ON DELETE CASCADE;

ALTER TABLE ONLY public.wanted_ride_requests
    ADD CONSTRAINT wanted_ride_requests_driver_id_fkey FOREIGN KEY (driver_id) REFERENCES public.users(user_id) ON DELETE CASCADE;

ALTER TABLE ONLY public.wanted_ride_requests
    ADD CONSTRAINT wanted_ride_requests_wanted_id_fkey FOREIGN KEY (wanted_id) REFERENCES public.wanted_rides(wanted_id) ON DELETE CASCADE;

ALTER TABLE ONLY public.wanted_rides
    ADD CONSTRAINT wanted_rides_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
