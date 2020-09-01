const mongoose = require('mongoose');


mongoose.set('useCreateIndex', true);
mongoose
	.connect(
		`mongodb+srv://${process.env.MongoDb_user_name}:${process.env
			.MongoDB_password}@cluster0-ptw2q.azure.mongodb.net/${process.env
			.MonogDb_collection}?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		}
	)
	.then(() => {
		console.log('connected to db');
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = mongoose;
