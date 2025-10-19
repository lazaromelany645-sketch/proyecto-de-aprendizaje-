DROP DATABASE IF EXISTS veterinaria;
CREATE DATABASE veterinaria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE veterinaria;

CREATE TABLE cliente (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  telefono VARCHAR(30),
  correo VARCHAR(120)
);

CREATE TABLE mascota (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  especie VARCHAR(80),
  raza VARCHAR(80),
  edad INT,
  id_cliente INT,
  FOREIGN KEY (id_cliente) REFERENCES cliente(id) ON DELETE CASCADE
);

CREATE TABLE veterinario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  especialidad VARCHAR(120)
);

CREATE TABLE cita (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATE,
  hora TIME,
  motivo TEXT,
  id_mascota INT,
  id_veterinario INT,
  FOREIGN KEY (id_mascota) REFERENCES mascota(id) ON DELETE CASCADE,
  FOREIGN KEY (id_veterinario) REFERENCES veterinario(id) ON DELETE SET NULL
);

-- sample data
INSERT INTO cliente (nombre, telefono, correo) VALUES ('Ana Torres', '999111222', 'ana@mail.com'), ('Carlos Díaz', '988333444', 'carlos@mail.com');

INSERT INTO mascota (nombre, especie, raza, edad, id_cliente) VALUES ('Luna', 'Perro', 'Labrador', 3, 1), ('Michi', 'Gato', 'Siamés', 2, 2);

INSERT INTO veterinario (nombre, especialidad) VALUES ('Dr. García', 'Medicina interna'), ('Dra. Pérez', 'Dermatología');

INSERT INTO cita (fecha, hora, motivo, id_mascota, id_veterinario) VALUES
('2025-10-20', '10:00:00', 'Vacunación', 1, 1),
('2025-10-21', '15:30:00', 'Chequeo general', 2, 2),
('2025-10-22', '09:00:00', 'Limpieza dental', 1, 2);
