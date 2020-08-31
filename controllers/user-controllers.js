const firebase = require('../config/firebase');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const signup = async (req, res, next) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(errors);
	}

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

	let token;
	let user; 
	try {
		user = await firebase.auth().currentUser
		token = await user.getIdToken(true);
	} catch (error) {
		console.log(error, 'no token');
		return next(error);
	}


	const newUser = new User({ name, email, firebaseId: user.uid, password: hashedPassword });

	try {
		await newUser.save();
	} catch (err) {
		res.status(500).json({
			msg: 'Could not save user in database'
		});
		return next(error);
	}

	res.status(201).json({
		userId: newUser.id,
		email: newUser.email,
		token
	});
};

const login = async (req, res, next) => {
	const { email, password } = req.body;


	let user;
	try {
		user = await User.findOne({email });
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

	try {
		await firebase.auth().signInWithEmailAndPassword(email, password);
	} catch (error) {
		console.log(error);
		return next(error);
	}


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

