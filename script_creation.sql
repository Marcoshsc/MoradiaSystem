-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2
-- PostgreSQL version: 12.0
-- Project Site: pgmodeler.io
-- Model Author: ---


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: new_database | type: DATABASE --
-- -- DROP DATABASE IF EXISTS new_database;
-- CREATE DATABASE new_database;
-- -- ddl-end --
-- 

-- object: public."user" | type: TABLE --
-- DROP TABLE IF EXISTS public."user" CASCADE;
CREATE TABLE public."user" (
	id serial NOT NULL,
	name character varying(100) NOT NULL,
	description text,
	email character varying(100) NOT NULL,
	password text NOT NULL,
	phone character varying(30),
	location character varying(100) NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	image text NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public."user" OWNER TO postgres;
-- ddl-end --

-- object: public.place | type: TABLE --
-- DROP TABLE IF EXISTS public.place CASCADE;
CREATE TABLE public.place (
	id serial NOT NULL,
	name character varying(50) NOT NULL,
	rooms smallint NOT NULL,
	bathrooms smallint NOT NULL,
	location character varying(50) NOT NULL,
	description text NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	status character varying(50) NOT NULL,
	area smallint NOT NULL,
	value double precision NOT NULL,
	image text NOT NULL,
	id_user integer NOT NULL,
	CONSTRAINT status_ck CHECK (status in ('USING', 'SELL', 'RENT')),
	CONSTRAINT place_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.place OWNER TO postgres;
-- ddl-end --

-- object: user_fk | type: CONSTRAINT --
-- ALTER TABLE public.place DROP CONSTRAINT IF EXISTS user_fk CASCADE;
ALTER TABLE public.place ADD CONSTRAINT user_fk FOREIGN KEY (id_user)
REFERENCES public."user" (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.rentcontract | type: TABLE --
-- DROP TABLE IF EXISTS public.rentcontract CASCADE;
CREATE TABLE public.rentcontract (
	id serial NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	start date NOT NULL,
	"end" date NOT NULL,
	value double precision NOT NULL,
	id_place integer NOT NULL,
	id_user integer NOT NULL,
	CONSTRAINT rentcontract_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.rentcontract OWNER TO postgres;
-- ddl-end --

-- object: place_fk | type: CONSTRAINT --
-- ALTER TABLE public.rentcontract DROP CONSTRAINT IF EXISTS place_fk CASCADE;
ALTER TABLE public.rentcontract ADD CONSTRAINT place_fk FOREIGN KEY (id_place)
REFERENCES public.place (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: user_fk | type: CONSTRAINT --
-- ALTER TABLE public.rentcontract DROP CONSTRAINT IF EXISTS user_fk CASCADE;
ALTER TABLE public.rentcontract ADD CONSTRAINT user_fk FOREIGN KEY (id_user)
REFERENCES public."user" (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.sellcontract | type: TABLE --
-- DROP TABLE IF EXISTS public.sellcontract CASCADE;
CREATE TABLE public.sellcontract (
	id serial NOT NULL,
	value double precision NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	id_place integer NOT NULL,
	id_user integer NOT NULL,
	CONSTRAINT sellcontract_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.sellcontract OWNER TO postgres;
-- ddl-end --

-- object: place_fk | type: CONSTRAINT --
-- ALTER TABLE public.sellcontract DROP CONSTRAINT IF EXISTS place_fk CASCADE;
ALTER TABLE public.sellcontract ADD CONSTRAINT place_fk FOREIGN KEY (id_place)
REFERENCES public.place (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: user_fk | type: CONSTRAINT --
-- ALTER TABLE public.sellcontract DROP CONSTRAINT IF EXISTS user_fk CASCADE;
ALTER TABLE public.sellcontract ADD CONSTRAINT user_fk FOREIGN KEY (id_user)
REFERENCES public."user" (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.interest | type: TABLE --
-- DROP TABLE IF EXISTS public.interest CASCADE;
CREATE TABLE public.interest (
	id serial NOT NULL,
	proposed_value double precision NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	id_place integer NOT NULL,
	id_user integer NOT NULL,
	CONSTRAINT interest_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE public.interest OWNER TO postgres;
-- ddl-end --

-- object: place_fk | type: CONSTRAINT --
-- ALTER TABLE public.interest DROP CONSTRAINT IF EXISTS place_fk CASCADE;
ALTER TABLE public.interest ADD CONSTRAINT place_fk FOREIGN KEY (id_place)
REFERENCES public.place (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: user_fk | type: CONSTRAINT --
-- ALTER TABLE public.interest DROP CONSTRAINT IF EXISTS user_fk CASCADE;
ALTER TABLE public.interest ADD CONSTRAINT user_fk FOREIGN KEY (id_user)
REFERENCES public."user" (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


