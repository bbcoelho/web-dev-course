import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

// use `mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// mongoose.connect('mongodb://127.0.0.1:27017/movieApp')
//     .then(() => {
//         console.log('CONNECTED TO DB');
//     })
//     .catch(err => {
//         console.error('Error connecting to DB:', err);
//     });