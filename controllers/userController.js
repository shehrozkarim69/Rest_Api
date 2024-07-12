const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
 
     // Input validation
      const {userName,gender,dateOfBirth, email, password,confirmPassword} = req.body;
      if (!email)  {
      return res.status(400).send({ success: false, message: 'email is not correct' });
     }
     if(!password){
       return res.status(400).send({ success: false, message: 'password is not correct' });
     }
 
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).send({ message: 'Email is already registered' });
 
     }
     // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
    
    let profilePicture = [];
   if (req.file) {
   profilePicture.push(req.file.path);
 }
 
     // console.log(profilePicture)
     // Create a new user
     const user = new User({
        userName,
         gender,
         dateOfBirth,
         password: hashedPassword,
         confirmPassword,
         profilePicture,
         email,
         
     });  
     const newUser = await user.save();
 
     // token expiration
     //  const expirationSeconds = Math.floor(Date.now() / 1000) + (90 * 24 * 60 * 60);
 
     // Sign the token
     const token = await jwt.sign({ _id: newUser._id }, process.env.TOKKENSECRET);
     // , { expiresIn: expirationSeconds }
      res.cookie('token',token)   
 
    return res.status(200).json({ success: true, message: 'Signed in', newUser });
 
   } catch (err) {
     return res.status(500).send({ success: false, message:" interval server error" });
   }
 };  



 const signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
      }
  
      const user = await User.findOne({ email });
      
      if (!user) {
         return res.status(404).json({ success: false, message: 'user not found' });
      }
  
      const isValidPassword =  await bcrypt.compare(password, user.password);
  
      if (!isValidPassword) {
         return res.status(403).json({ success: false, message: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const token =  jwt.sign({ _id: user._id }, process.env.TOKKENSECRET, {
        expiresIn: 90 * 24 * 60 * 60 * 1000
      });
  
      res.cookie("token", token)
      return res.status(200).json({ success: true, message: 'Success', token });
  
    } catch (err) {
       res.status(500).json({ success: false, message: err.message });
    }
  };

  const logout = async (req, res) => {
    try {
      res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
      });
      res.status(200).json({ msg: 'user logged out!' });
    } catch (error) {
      console.log(error)
      return res.status(500).json({success:false, message:"internal server error"})
    }
      };

 module.exports = {signup,signIn,logout};