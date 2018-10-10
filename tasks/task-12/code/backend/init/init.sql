CREATE USER docker;
CREATE DATABASE docker;
GRANT ALL PRIVILEGES ON DATABASE docker TO docker;

CREATE SEQUENCE public.users_id_seq;

ALTER SEQUENCE public.users_id_seq
    OWNER TO student;

CREATE SEQUENCE public.websites_id_seq;

ALTER SEQUENCE public.websites_id_seq
    OWNER TO student;

CREATE TABLE public."Users"
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Users"
    OWNER to student;

CREATE TABLE public."Websites"
(
    id integer NOT NULL DEFAULT nextval('websites_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    url character varying(255) COLLATE pg_catalog."default" NOT NULL,
    status character varying(255) COLLATE pg_catalog."default" NOT NULL DEFAULT 'online'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer,
    CONSTRAINT websites_pkey PRIMARY KEY (id),
    CONSTRAINT "websites_userId_fkey" FOREIGN KEY ("UserId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Websites"
    OWNER to student;