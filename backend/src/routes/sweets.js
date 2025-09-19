const express = require('express');
const router = express.Router();

// placeholder
router.get('/', (req, res) => res.json({ msg: 'sweets root' }));

module.exports = router;
