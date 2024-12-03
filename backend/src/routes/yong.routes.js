const express = require('express');
const yongController = require('../controllers/yong.controller');
const router = express.Router();


router.post('/yong', yongController.yong); 
router.post('/yongTest', yongController.yongTest); 

module.exports = router;
