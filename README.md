# Cursis Virtuaels - Proyecto

## Requisitos
- Node.js
- XAMPP (MySQL)
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
