const express = require('express');
const router = express.Router();
const { SECTORS, SECTOR_METADATA } = require('../config/constants');

// GET /api/sectors - returns supported sectors and their labor metadata
router.get('/', (req, res) => {
  res.json({
    success: true,
    sectors: Object.values(SECTORS),
    metadata: SECTOR_METADATA
  });
});

module.exports = router;
