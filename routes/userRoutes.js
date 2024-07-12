const express = require("express");
const router = express.Router();
const upload = require("../utils/upload.js");
const verifyToken = require("../middlewares/verifyToken")


const {signup,signIn,logout} = require('../controllers/userController.js')

router.post('/signup', upload.single('profilePicture'), signup);
router.post('/signIn', signIn);
router.get('/logout',verifyToken, logout);

module.exports = router;