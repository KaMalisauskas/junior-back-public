import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const CategorySchema = new Schema({

    category: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

CategorySchema.plugin(uniqueValidator, {
    message: `{VALUE} already exists`
});

export default mongoose.model('Categories', CategorySchema);

