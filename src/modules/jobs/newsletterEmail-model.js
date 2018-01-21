import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';



const newsletterEmailSchema = new Schema({

    email: {
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

newsletterEmailSchema.plugin(uniqueValidator, {
    message: `{VALUE} already exists`
});

export default mongoose.model('newsletterEmail', newsletterEmailSchema);

