-- 1. Crear la bd
create database duacoders_db;

-- 2. Usar la bd
use duacoders_db;

-- 3. Crear tabla 'users'
create table users(
	id int primary key auto_increment not null,
	email varchar(255) not null,
	password varchar(255) not null
);

-- 4. Crear tabla 'skills'
create table skills(
	id int primary key auto_increment not null,
    nombre varchar(255) not null
);

-- 5. Crear tabla 'departamentos'
create table departamentos(
	id int primary key auto_increment not null,
    nombre varchar(255) not null
);

-- 6. Crear tabla 'puestos'
create table puesto(
	id int primary key auto_increment not null,
    nombre varchar(255) not null,
    departamento_id int not null,
    foreign key(departamento_id) references departamentos(id)
);

-- 7. Crear tabla 'duacoders'
create table duacoders(
	nif varchar(255) primary key not null,
    puesto_id int not null,
    nombre varchar(255) not null,
	biografia varchar(300),
    foto varchar(255),
    tortilla_con_cebolla bool not null,
    fecha_nacimiento date not null,
    foreign key(puesto_id) references puesto(id)
);

-- 8. Crear tabla 'skillsXduacoder'
create table skillsXduacoder(
  id integer primary key auto_increment not null,
	duacoder_id varchar(255) not null,
  skills_id integer not null,
  foreign key(duacoder_id) references duacoders(nif),
  foreign key(skills_id) references skills(id)
);