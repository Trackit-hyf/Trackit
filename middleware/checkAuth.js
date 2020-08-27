const admin = require('../config/firebaseAdmin');

module.exports = async (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}
	let token;
	try {
		token = await req.headers.authorization.split(' ')[1];
		if (!token) {
			throw new Error('Authentication failed!');
		}
	} catch (err) {
		console.log(err);
		return next(err);
	}

	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		req.userData = { firebaseId: decodedToken.uid };
		return next();
	} catch (err) {
		console.log(err);
		return next(err);
	}
};
