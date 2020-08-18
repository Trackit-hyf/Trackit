var firebase = require('firebase/app');
require('firebase/auth');

var firebaseConfig = {
	apiKey: 'AIzaSyDojVtvrosXV3--GDe6Eus6bce7GhiUYt4',
	authDomain: 'trackit-2020.firebaseapp.com',
	databaseURL: 'https://trackit-2020.firebaseio.com',
	projectId: 'trackit-2020',
	storageBucket: 'trackit-2020.appspot.com',
	messagingSenderId: '143600066583',
	appId: '1:143600066583:web:db2596faf8aa901412bc52',
	measurementId: 'G-EHHPPE0XH3'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


module.exports = firebase; 