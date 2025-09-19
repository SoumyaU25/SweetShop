const express = require('express');
const router = express.Router();
const {createSweets, updateSweet, getAllSweets, getSweetById, deleteSweet, searchSweets} = require('../controllers/sweetController')
const {protected, adminOnly} = require('../middlewares/authMiddleware')

//puclic
router.get('/', getAllSweets)
router.get('/search', searchSweets)
router.get('/:id', getSweetById)

// Admin-only actions
router.post('/create', protected, adminOnly, createSweets);
router.put('/:id', protected, adminOnly, updateSweet);
router.post('/delete/:id', protected, adminOnly, deleteSweet);

module.exports = router;
