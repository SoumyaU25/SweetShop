const express = require('express');
const router = express.Router();
const {createSweets, updateSweet, getAllSweets, getSweetById, deleteSweet, searchSweets, purchaseSweet, restockSweet} = require('../controllers/sweetController')
const {protect, adminOnly} = require('../middlewares/authMiddleware')

//puclic
router.get('/', getAllSweets)
router.get('/search', searchSweets)
router.get('/:id', getSweetById)

// Admin-only actions
router.post('/create', protect, adminOnly, createSweets);
router.put('/:id', protect, adminOnly, updateSweet);
router.delete('/delete/:id', protect, adminOnly, deleteSweet);

//Inventory
router.post('/:id/purchase', protect, purchaseSweet);
router.post('/:id/restock', protect, adminOnly, restockSweet);

module.exports = router;
