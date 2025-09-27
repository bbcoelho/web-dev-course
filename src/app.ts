import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';
import mongoose from 'mongoose';
import { Campground } from './models/campground.js';
import methodOverride from 'method-override';
import morgan from 'morgan';
import dotenv from 'dotenv';

const require = createRequire(import.meta.url);
const ejsMate = require('ejs-mate');
dotenv.config();

// set environment variables
let DB_NAME: string | undefined;
if (process.env.NODE_ENV === 'development') {
    DB_NAME = process.env.DEV_DB;
} else {
    DB_NAME = process.env.PROD_DB;
}

// connect to database
if (!DB_NAME) {
    throw new Error('DB_NAME is not set');
}
const MONGO_URI = `mongodb+srv://bbcoelho_db_user:${process.env.MONGO_PASSWORD}@cluster0.pve7jcd.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
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

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

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

// Show edit campground form
app.get('/campgrounds/:id/edit', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        return res.status(404).send('Campground not found');
    }
    res.render('campgrounds/edit', { campground });
});

// Update a campground
app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground?._id}`);
});

// Delete a campground
app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
});

// 404
app.use((req, res) => {
    res.status(404).send('NOT FOUND!');
});