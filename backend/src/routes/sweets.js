const express = require('express');
const router = express.Router();
const {createSweets} = require('../controllers/sweetController')
const {protected, adminOnly} = require('../middlewares/authMiddleware')



// Admin-only actions
router.post('/create', protected, adminOnly, createSweets);

module.exports = router;
