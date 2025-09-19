const express = require('express');
const router = express.Router();

// placeholder - we'll replace with real controller next steps
router.get('/', (req, res) => res.json({ msg: 'auth root' }));

module.exports = router;
