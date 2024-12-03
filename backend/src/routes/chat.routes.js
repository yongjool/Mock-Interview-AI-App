const express = require('express');
const chatController = require('../controllers/chat.controller');
const router = express.Router();


router.post('/chat', chatController.chat); 
router.post('/chat2', chatController.chat2); 

module.exports = router;
