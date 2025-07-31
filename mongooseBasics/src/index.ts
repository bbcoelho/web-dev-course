import mongoose from 'mongoose';

// use `mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
mongoose.connect('mongodb://127.0.0.1:27017/movieApp')
    .then(() => {
        console.log('CONNECTED TO DB');
    })
    .catch(err => {
        console.error('Error connecting to DB:', err);
    });

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String,
});

const Movie = mongoose.model('Movie', movieSchema);

Movie.insertMany([
    {
        title: 'The Shawshank Redemption',
        year: 1994,
        score: 9.3,
        rating: 'R'
    },
    {
        title: 'The Godfather',
        year: 1972,
        score: 9.2,
        rating: 'R'
    },
    {
        title: 'The Dark Knight',
        year: 2008,
        score: 9.0,
        rating: 'PG-13'
    },
    {
        title: 'Pulp Fiction',
        year: 1994,
        score: 8.9,
        rating: 'R'
    },
    {
        title: 'Forrest Gump',
        year: 1994,
        score: 8.8,
        rating: 'PG-13'
    },
    {
        title: 'Inception',
        year: 2010,
        score: 8.8,
        rating: 'PG-13'
    },
    {
        title: 'The Matrix',
        year: 1999,
        score: 8.7,
        rating: 'R'
    },
    {
        title: 'Goodfellas',
        year: 1990,
        score: 8.7,
        rating: 'R'
    },
    {
        title: 'The Silence of the Lambs',
        year: 1991,
        score: 8.6,
        rating: 'R'
    },
    {
        title: 'Jurassic Park',
        year: 1993,
        score: 8.2,
        rating: 'PG-13'
    }
])
    .then(data => {
        console.log('Movies inserted successfully');
        console.log(data);
    })
    .catch(err => {
        console.error('Error inserting movies:', err);
    });
