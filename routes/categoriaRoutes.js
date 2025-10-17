const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/categoriaController');

router.get('/', ctrl.getAll);

module.exports = router;
