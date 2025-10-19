const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/docenteController');

router.get('/', ctrl.getAll);

module.exports = router;
