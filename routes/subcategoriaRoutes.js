const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/subcategoriaController');

router.get('/', ctrl.getAll);

module.exports = router;
