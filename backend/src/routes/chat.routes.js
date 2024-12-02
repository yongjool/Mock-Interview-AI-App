const express = require('express');
const chatController = require('../controllers/chat.controller');
const router = express.Router();


router.get('/chat', chatController.chat); 


module.exports = router;
