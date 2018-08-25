import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const LocationSchema = new Schema({
    latitude: {
        type: Number,
        required: 'No latitude found'
    },
    longitude: {
        type: Number,
        required: 'No longitude found'
    }
});