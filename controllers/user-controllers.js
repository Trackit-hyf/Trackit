const firebase = require('../config/firebase');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const signup = async (req, res, next) => {
	//check the info of the user
	const errors = validationResult(req);
	console.log('signup -> errors', errors);
	if (!errors.isEmpty()) {
		return next(errors);
	}
	//register the user in firebase
	const { name, email, password } = req.body;

    
	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (err) {
        res.status(500).json({
			msg: 'Could not save user'
		});
		return next(error);
    }
    
	try {
		await firebase.auth().createUserWithEmailAndPassword(email, password);
	} catch (error) {
		console.log(error);
		return next(error);
	}
	//get token for the user
	let token;
	try {
		token = await firebase.auth().currentUser.getIdToken(true);
	} catch (error) {
		console.log(error, 'no token');
		return next(error);
	}

	//create new user in the database mongodb.
	const newUser = new User({ name, email, password: hashedPassword });

	try {
		await newUser.save();
	} catch (err) {
		res.status(500).json({
			msg: 'Could not save user in database'
		});
		return next(error);
	}
	//send back to frontend
	res.status(201).json({
		userId: newUser.id,
		email: newUser.email,
		token
	});
};

const login = async (req, res, next) => {
	const { email, password } = req.body;

    //Check if the user exists already in the database
    let user;
	try {
		user = await User.findOne({email: email})
	} catch (error) {
		res.status(500).json({
			msg: 'Logging in failed, please try again later'
		});
		return next(error);
	}
	
	if (!user) {
		res.status(403).json({
			msg: 'Invalid credentials, could not log you in.'
		});
		return next(error);
	}
	//check the password
    let isValidPassword = false;
	try {
		isValidPassword = await bcrypt.compare(password, user.password);
	} catch (err) {
		res.status(500).json({
			msg: 'could not verify the user'
		});
		return next(error);
	}

	if (!isValidPassword) {
		res.status(500).json({
			msg: 'password is not valid'
		});
		return next(error);
	}
	//log in using firebase
	try {
		await firebase.auth().signInWithEmailAndPassword(email, password);
	} catch (error) {
		console.log(error);
		return next(error);
    }
    
	//get token for the user
    let token;
	try {
		token = await firebase.auth().currentUser.getIdToken(true);
	} catch (error) {
		console.log(error, 'no token');
		return next(error);
	}

	res.status(201).json({
		userId: user.id,
		token
	});
};

exports.signup = signup;
exports.login = login;
