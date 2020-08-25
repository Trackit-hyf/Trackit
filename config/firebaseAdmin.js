const admin = require('firebase-admin');

const serviceAccount = require('./trackit-2020-firebase-adminsdk-hq5w1-86f236a4c3.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://trackit-2020.firebaseio.com'
});
 
module.exports = admin; 