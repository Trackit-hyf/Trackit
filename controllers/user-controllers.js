var firebase = require("firebase/app");
require("firebase/auth");

var firebaseConfig = {
    apiKey: "AIzaSyDojVtvrosXV3--GDe6Eus6bce7GhiUYt4",
    authDomain: "trackit-2020.firebaseapp.com",
    databaseURL: "https://trackit-2020.firebaseio.com",
    projectId: "trackit-2020",
    storageBucket: "trackit-2020.appspot.com",
    messagingSenderId: "143600066583",
    appId: "1:143600066583:web:db2596faf8aa901412bc52",
    measurementId: "G-EHHPPE0XH3"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);




const User = require('../models/user')

const signup = async (req, res, next) => {

    //1.check the info of the user
    const {name , email, password} = req.body; 
    //Check if the user exists already in the database
    let existingUser; 
    try {
        existingUser = await User.findOne({email: email})
    } catch (err) {
        res.status(500).json({
            msg: "Could not find user"
        })
        return next(err)
    }

    
    if(existingUser) {
        res.status(403).json({
            msg: "User exists already . Please login instead!"
        })
        return next(err);
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    
    //2.register the user in database.
    const newUser = new User({name, email, password}); 

    try {
		await newUser.save();
	} catch (err) {
		res.status(500).json({
            msg: "Could not save user"
        })
		return next(error);
	}
    
    res.status(201).json({
		userId: newUser.id,
		email: newUser.email,
	});
}


const login = async (req, res, next) => {

    const {email, password} = req.body; 
    //Check if the user exists already in the database
    let existingUser; 
    try {
        existingUser = await User.findOne({email: email})
    } catch (err) {
        res.status(500).json({
            msg: "Could not find user"
        })
    }

    //2.check the password of the user
    if (password === existingUser.password) {
        res.status(201).json({
            userId: existingUser.id,
            email: existingUser.email,
        });
    } else {
       res.status(403).json({
           msg: "invalid credentials . Please try again!"
       })
    }
    
}


exports.signup = signup; 
exports.login = login; 

