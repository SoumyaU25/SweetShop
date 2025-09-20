const express = require('express');
const router = express.Router();
const {createSweets, updateSweet, getAllSweets, getSweetById, deleteSweet, searchSweets, purchaseSweet, restockSweet} = require('../controllers/sweetController')
const {protected, adminOnly} = require('../middlewares/authMiddleware')

//puclic
router.get('/', getAllSweets)
router.get('/search', searchSweets)
router.get('/:id', getSweetById)

// Admin-only actions
router.post('/create', protected, adminOnly, createSweets);
router.put('/:id', protected, adminOnly, updateSweet);
router.delete('/delete/:id', protected, adminOnly, deleteSweet);

//Inventory
router.post('/:id/purchase', protected, purchaseSweet);
router.post('/:id/restock', protected, adminOnly, restockSweet);

module.exports = router;
