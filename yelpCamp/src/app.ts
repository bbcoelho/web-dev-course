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

app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log('SERVER IS RUNNING ON PORT 3000');
});

app.get('/', (req, res) => {
    res.render('home');
});

// Show all campgrounds
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
});

// Show new campground form
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

// Create a new campground
app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
});

// Show a specific campground
app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        return res.status(404).send('Campground not found');
    }
    res.render('campgrounds/show', { campground });
});
