DROP DATABASE IF EXISTS cursis_virtuaels;
CREATE DATABASE cursis_virtuaels CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cursis_virtuaels;

CREATE TABLE categoria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL
);

CREATE TABLE subcategoria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  id_categoria INT,
  FOREIGN KEY (id_categoria) REFERENCES categoria(id) ON DELETE SET NULL
);

CREATE TABLE docente (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL
);

CREATE TABLE curso (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT,
  fecha_inicio DATE,
  fecha_fin DATE,
  duracion_horas INT,
  precio DECIMAL(10,2),
  id_subcategoria INT,
  id_docente INT,
  FOREIGN KEY (id_subcategoria) REFERENCES subcategoria(id) ON DELETE SET NULL,
  FOREIGN KEY (id_docente) REFERENCES docente(id) ON DELETE SET NULL
);

-- Seed data
INSERT INTO categoria (nombre) VALUES ('Tecnología'), ('Negocios'), ('Diseño');

INSERT INTO subcategoria (nombre, id_categoria) VALUES
('Programación', 1),
('Bases de Datos', 1),
('Marketing Digital', 2),
('Emprendimiento', 2),
('UX/UI', 3),
('Diseño Gráfico', 3);

INSERT INTO docente (nombre) VALUES ('Juan Pérez'), ('María Gómez'), ('Luis Torres');

INSERT INTO curso (titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, precio, id_subcategoria, id_docente) VALUES
('JavaScript Básico', 'Fundamentos de JS', '2025-10-20', '2025-11-20', 40, 220.00, 1, 1),
('SQL Intermedio', 'Consultas y optimización', '2025-11-01', '2025-12-01', 30, 180.00, 2, 2),
('Marketing Digital 101', 'Introducción al marketing online', '2025-10-25', '2025-11-25', 25, 200.00, 3, 3);
