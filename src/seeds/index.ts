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
    },
    {
        name: 'Blue Ridge Retreat',
        price: 32,
        description: 'Nestled in the Blue Ridge Mountains with hiking trails and scenic overlooks.',
        location: 'Virginia'
    },
    {
        name: 'Coastal Breeze',
        price: 45,
        description: 'Oceanfront camping with direct beach access and stunning sunrises.',
        location: 'Maine'
    },
    {
        name: 'Whispering Pines',
        price: 19,
        description: 'Quiet pine forest setting perfect for relaxation and bird watching.',
        location: 'Michigan'
    },
    {
        name: 'Thunder Valley',
        price: 27,
        description: 'Dramatic valley views with waterfalls and excellent fishing opportunities.',
        location: 'Tennessee'
    },
    {
        name: 'Golden Meadows',
        price: 24,
        description: 'Rolling meadows with wildflowers and panoramic mountain views.',
        location: 'Idaho'
    },
    {
        name: 'Redwood Giants',
        price: 38,
        description: 'Camp among ancient redwood trees in this magical forest setting.',
        location: 'California'
    },
    {
        name: 'Prairie Wind',
        price: 14,
        description: 'Open prairie camping with endless skies and incredible sunsets.',
        location: 'Kansas'
    },
    {
        name: 'Crystal Springs',
        price: 26,
        description: 'Natural springs and crystal-clear streams make this a refreshing retreat.',
        location: 'Arkansas'
    },
    {
        name: 'Eagle\'s Nest',
        price: 42,
        description: 'High-altitude camping with soaring eagles and breathtaking vistas.',
        location: 'Alaska'
    },
    {
        name: 'Moonlight Bay',
        price: 33,
        description: 'Lakeside camping with excellent swimming and moonlit nights.',
        location: 'Wisconsin'
    },
    {
        name: 'Cactus Gardens',
        price: 21,
        description: 'Desert camping surrounded by unique cacti and desert wildlife.',
        location: 'Texas'
    },
    {
        name: 'Maple Grove',
        price: 17,
        description: 'Beautiful maple forest with spectacular fall colors.',
        location: 'Vermont'
    },
    {
        name: 'Riverside Oaks',
        price: 29,
        description: 'Peaceful riverside setting under ancient oak trees.',
        location: 'Missouri'
    },
    {
        name: 'Starlight Mesa',
        price: 36,
        description: 'High desert mesa perfect for astronomy and stargazing.',
        location: 'Utah'
    },
    {
        name: 'Fern Hollow',
        price: 20,
        description: 'Lush fern-filled hollow with babbling brooks and cool shade.',
        location: 'North Carolina'
    },
    {
        name: 'Glacier Point',
        price: 41,
        description: 'Mountain camping with glacier views and alpine hiking trails.',
        location: 'Montana'
    },
    {
        name: 'Sandstone Arches',
        price: 31,
        description: 'Unique rock formations and natural arches create a stunning landscape.',
        location: 'Utah'
    },
    {
        name: 'Bayou Bend',
        price: 23,
        description: 'Swamp camping with alligator watching and cypress trees.',
        location: 'Louisiana'
    },
    {
        name: 'Alpine Meadow',
        price: 37,
        description: 'High-altitude meadow camping with wildflowers and mountain peaks.',
        location: 'Colorado'
    },
    {
        name: 'Lighthouse Point',
        price: 39,
        description: 'Coastal camping near a historic lighthouse with ocean views.',
        location: 'Oregon'
    },
    {
        name: 'Copper Canyon',
        price: 28,
        description: 'Red rock canyon with copper-colored walls and ancient petroglyphs.',
        location: 'Arizona'
    },
    {
        name: 'Misty Mountains',
        price: 34,
        description: 'Mountain camping often shrouded in mystical morning mists.',
        location: 'West Virginia'
    },
    {
        name: 'Turtle Creek',
        price: 18,
        description: 'Gentle creek perfect for tubing and turtle watching.',
        location: 'Ohio'
    },
    {
        name: 'Volcanic Ridge',
        price: 43,
        description: 'Unique volcanic landscape with hot springs and lava rock formations.',
        location: 'Hawaii'
    },
    {
        name: 'Aspen Grove',
        price: 35,
        description: 'Beautiful aspen forest with golden fall colors and mountain views.',
        location: 'Colorado'
    },
    {
        name: 'Pelican Shores',
        price: 30,
        description: 'Coastal wetlands perfect for bird watching and kayaking.',
        location: 'Florida'
    },
    {
        name: 'Badlands Vista',
        price: 25,
        description: 'Dramatic badlands scenery with fossil hunting opportunities.',
        location: 'South Dakota'
    },
    {
        name: 'Cedar Point',
        price: 22,
        description: 'Aromatic cedar forest with hiking trails and wildlife viewing.',
        location: 'Texas'
    },
    {
        name: 'Glacier Lake',
        price: 44,
        description: 'Pristine glacial lake with crystal-clear water and mountain reflections.',
        location: 'Alaska'
    },
    {
        name: 'Rolling Hills',
        price: 19,
        description: 'Gentle rolling hills perfect for hiking and horseback riding.',
        location: 'Kentucky'
    },
    {
        name: 'Sagebrush Flats',
        price: 16,
        description: 'Open sagebrush country with wide skies and antelope viewing.',
        location: 'Nevada'
    },
    {
        name: 'Dogwood Dell',
        price: 26,
        description: 'Spring dogwood blooms create a magical camping experience.',
        location: 'Georgia'
    },
    {
        name: 'Fossil Creek',
        price: 24,
        description: 'Creek camping with fossil hunting and geological wonders.',
        location: 'Wyoming'
    },
    {
        name: 'Thunderbird Peak',
        price: 40,
        description: 'High peak camping with Native American cultural sites nearby.',
        location: 'New Mexico'
    },
    {
        name: 'Willow Bend',
        price: 21,
        description: 'Peaceful willow-lined creek with excellent fishing and relaxation.',
        location: 'Nebraska'
    },
    {
        name: 'Painted Desert',
        price: 33,
        description: 'Colorful desert landscape with petrified wood and unique geology.',
        location: 'Arizona'
    },
    {
        name: 'Hemlock Heights',
        price: 27,
        description: 'Towering hemlock forest with cool temperatures and mountain streams.',
        location: 'Pennsylvania'
    },
    {
        name: 'Bison Plains',
        price: 23,
        description: 'Great plains camping with bison herds and prairie dog towns.',
        location: 'North Dakota'
    },
    {
        name: 'Coral Reef Cove',
        price: 46,
        description: 'Tropical camping with snorkeling access to vibrant coral reefs.',
        location: 'Florida'
    },
    {
        name: 'Autumn Ridge',
        price: 29,
        description: 'Ridge-top camping with spectacular fall foliage and hiking trails.',
        location: 'New Hampshire'
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