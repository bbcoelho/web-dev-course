import mongoose, { Schema, Document } from 'mongoose';
import Joi from 'joi';
import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../presentation/helpers/AppError.js';

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

export default function validateCampground(req: Request, res: Response, next: NextFunction) {
    const campgroundSchema = Joi.object({
        campground: Joi.object({
            name: Joi.string().required(),
            price: Joi.number().min(0).required(),
            location: Joi.string().required(),
            image: Joi.string().required(),
            description: Joi.string().required()
        }).required()
    })
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(', ');
        throw new AppError(msg, 400);
    }
    next();
}