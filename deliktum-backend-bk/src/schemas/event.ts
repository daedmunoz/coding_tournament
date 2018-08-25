import * as mongoose from 'mongoose';
import { LocationSchema } from './location';

const Schema = mongoose.Schema;

export const EventSchema = new Schema({
    description: {
        type: String,
        required: 'No description found'
    },
    type: {
        type: String,
        required: 'No type found'
    },
    image: {
        type: String            
    },
    location: {
        type: LocationSchema,
        required: "No location found"
    },
    dateTime: {
        type: Date,
        default: Date.now
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});