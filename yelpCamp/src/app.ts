import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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

// use `mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// mongoose.connect('mongodb://127.0.0.1:27017/movieApp')
//     .then(() => {
//         console.log('CONNECTED TO DB');
//     })
//     .catch(err => {
//         console.error('Error connecting to DB:', err);
//     });