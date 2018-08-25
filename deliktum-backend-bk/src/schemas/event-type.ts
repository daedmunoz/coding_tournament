import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const EventTypesSchema = new Schema({
    name: {
        type: String,
        required: 'No name found'
    }
});