<<<<<<< HEAD
# Veterinaria

Sistema CRUD para una clínica veterinaria.
=======
# Cursos Virtuales - Proyecto
>>>>>>> 8dd17250913ad1033eec85766e23d0eeebb7adb3

## Requisitos
- Node.js
- XAMPP (MySQL)
<<<<<<< HEAD

## Instalación
1. Importa `veterinaria.sql` en phpMyAdmin.
2. Verifica `.env` si necesitas cambiar credenciales (por defecto root sin contraseña).
3. Instala dependencias:

```bash
npm install
```

4. Ejecuta el servidor:

```bash
node server.js
```

5. Abre en el navegador:

```
http://localhost:3000
```

## Rutas API
- GET /api/clientes
- POST /api/clientes
- PUT /api/clientes/:id
- DELETE /api/clientes/:id

- GET /api/mascotas
- GET /api/mascotas/cliente/:id_cliente
- POST /api/mascotas
- PUT /api/mascotas/:id
- DELETE /api/mascotas/:id

- GET /api/veterinarios
- POST /api/veterinarios
- PUT /api/veterinarios/:id
- DELETE /api/veterinarios/:id

- GET /api/citas
- POST /api/citas
- PUT /api/citas/:id
- DELETE /api/citas/:id

=======
- npm

## Configuración rápida
1. Importa `sql/cursis_virtuaels.sql` en phpMyAdmin (o ejecuta desde consola).
2. Verifica `.env` (por defecto está para XAMPP: root, sin contraseña).
3. Instala dependencias:
   ```bash
   npm install
   ```
4. Inicia servidor:
   ```bash
   node server.js
   ```
5. Abre en el navegador: http://localhost:3000/

## Rutas importantes
- GET /api/categorias
- GET /api/subcategorias
- GET /api/docentes
- GET /api/cursos
- POST /api/cursos
- PUT /api/cursos/:id
- DELETE /api/cursos/:id
>>>>>>> 8dd17250913ad1033eec85766e23d0eeebb7adb3
