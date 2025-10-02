import mongoose, { Schema, Document } from 'mongoose';

export interface ICampground extends Document {
    name: string;
    price: number;
    description: string;
    location: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

const CampgroundSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: 'https://picsum.photos/500/375'
    }
}, {
    timestamps: true
});

export const Campground = mongoose.model<ICampground>('Campground', CampgroundSchema);