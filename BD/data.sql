-- Poblar tabla 'users'
insert into users(email, password) values 
('pedro1@gmail.com', '2805726d7d2dcb2f2588eede59ef54b9');

-- Poblar tabla 'skills'
insert into skills(nombre) values
('PHP'), ('MySQL'), ('UX-UI'), ('NestJS'), ('Python');

-- Poblar tabla 'departamentos'
insert into departamentos(nombre) values
('Desarrollo'),
('QA / Testing'),
('Diseño'),
('Soporte Técnico'),
('Recursos Humanos');

-- Poblar tabla 'puesto'
insert into puesto(nombre, departamento_id) values
('Desarrollador Senior', 1),
('Tester QA', 2),
('Diseñador UX/UI', 3),
('Soporte Técnico', 4),
('Gerente de Recursos Humanos', 5);

-- Poblar la tabla 'duacoders'
insert into duacoders (nif, puesto_id, nombre, biografia, foto, tortilla_con_cebolla, fecha_nacimiento) VALUES
('11111111A', 1, 'Juan', 'Biografía de Juan', null, true, '1990-01-01'),
('22222222B', 2, 'María', 'Biografía de María', null, false, '1992-03-15'),
('33333333C', 3, 'Carlos', null, null, true, '1985-07-20'),
('44444444D', 4, 'Laura', null, null, false, '1988-09-10'),
('55555555E', 5, 'Ana', 'Biografía de Ana', null, true, '1995-12-25');

-- Poblar la tabla 'skillsXduacoder'
insert into skillsXduacoder (duacoder_id, skills_id) VALUES
('11111111A', 1),
('22222222B', 2),
('33333333C', 3),
('44444444D', 4),
('55555555E', 5);