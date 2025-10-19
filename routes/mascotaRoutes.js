const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/mascotaController');
router.get('/', ctrl.getAll);
router.get('/cliente/:id_cliente', ctrl.getByCliente);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.delete);
module.exports = router;
