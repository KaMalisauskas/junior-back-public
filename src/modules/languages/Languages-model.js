import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';



const languageSchema = new Schema({

    language: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

languageSchema.plugin(uniqueValidator, {
    message: `{VALUE} already exists`
});

export default mongoose.model('Languages', languageSchema);

