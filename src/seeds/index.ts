import mongoose from 'mongoose';
import { Campground } from '../models/campground.js';
import dotenv from 'dotenv';

dotenv.config();

// set environment variables
let DB_NAME: string | undefined;
if (process.env.NODE_ENV === 'development') {
    DB_NAME = process.env.DEV_DB;
} else {
    DB_NAME = process.env.PROD_DB;
}

if (!DB_NAME) {
    throw new Error('DB_NAME is not set');
}
const MONGO_URI = `mongodb+srv://bbcoelho_db_user:${process.env.MONGO_PASSWORD}@cluster0.pve7jcd.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const seedData = [
    {
        name: 'Salmon Creek',
        price: 20,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, sunt.',
        location: 'Montana'
    },
    {
        name: 'Granite Hill',
        price: 30,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, sunt.',
        location: 'Colorado'
    },
    {
        name: 'Mountain Goat\'s Rest',
        price: 15,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, sunt.',
        location: 'Utah'
    },
    {
        name: 'Desert Mesa',
        price: 25,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, sunt.',
        location: 'Arizona'
    },
    {
        name: 'Pine Valley',
        price: 18,
        description: 'A peaceful campground surrounded by towering pine trees.',
        location: 'Oregon'
    },
    {
        name: 'Rocky Ridge',
        price: 35,
        description: 'Experience breathtaking mountain views and challenging hiking trails.',
        location: 'Wyoming'
    },
    {
        name: 'Sunset Lake',
        price: 22,
        description: 'Beautiful lakeside camping with perfect sunset views.',
        location: 'Minnesota'
    },
    {
        name: 'Wildflower Meadow',
        price: 28,
        description: 'Spring and summer bring spectacular wildflower displays.',
        location: 'California'
    },
    {
        name: 'Forest Haven',
        price: 16,
        description: 'Deep in the forest, perfect for a quiet getaway.',
        location: 'Washington'
    },
    {
        name: 'Canyon View',
        price: 40,
        description: 'Dramatic canyon overlooks and world-class stargazing.',
        location: 'New Mexico'
    }
];

const seedDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        console.log('Clearing existing data...');
        await Campground.deleteMany({});
        console.log('Existing data cleared');

        console.log('Seeding database...');
        const campgrounds = await Campground.insertMany(seedData);
        console.log(`Created ${campgrounds.length} campgrounds`);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    }
};

seedDB();