import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';
import { Campground } from './models/campground.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yelpCamp';
mongoose.connect(MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR:'));
db.once('open', () => {
    console.log('CONNECTED TO DB');
});

const app = express();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(3000, () => {
    console.log('SERVER IS RUNNING ON PORT 3000');
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/makecampground', async (req, res) => {
    const campground = new Campground({
        name: 'My Backyard',
        price: 100,
        description: 'This is a campground in my backyard',
        location: 'This is a location'
    });
    await campground.save();
    res.send(campground);
});