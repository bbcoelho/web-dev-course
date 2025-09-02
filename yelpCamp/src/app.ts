import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/yelpCamp';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('CONNECTED TO DB:', MONGO_URI);
    })
    .catch(err => {
        console.error('Error connecting to DB:', err);
    });
    
const app = express();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.render('home');
});
