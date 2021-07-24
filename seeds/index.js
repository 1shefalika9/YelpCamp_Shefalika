const mongoose = require('mongoose');
const cities = require('./citiesInd');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 200; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10
		const camp = new Campground({
			author: "60eaa03da4328302cc30f4d1",		
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo	consequat. Duis aute irure dolor in reprehenderit',
			price: price,
			geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
			images:  [
			    {
			      url: 'https://res.cloudinary.com/sg14/image/upload/v1626250212/YelpCamp/z48yjplfvruo12wnlhrw.jpg',
			      filename: 'YelpCamp/z48yjplfvruo12wnlhrw'
			    },
			    {
			      url: 'https://res.cloudinary.com/sg14/image/upload/v1626250213/YelpCamp/xjflukdcr0gfyydle2vx.jpg',
			      filename: 'YelpCamp/xjflukdcr0gfyydle2vx'
			    }
			]
		})
		await camp.save();
	}
}

//seedDB() is an async func so it returns a promise so we can use then()
seedDB().then(() => {
	mongoose.connection.close();
})