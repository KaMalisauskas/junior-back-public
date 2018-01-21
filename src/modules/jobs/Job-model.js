import mongoose, { Schema } from 'mongoose';



const JobSchema = new Schema({
    jobTitle: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: String,
        required: true,
        trim: true
    },
    requirements: {
        type: [String],
        trim: true
    },
    languages: {
        type: [String],
        trim: true,
        required: true
    },
    summery: {
        type: String,
        required: true,
        trim: true
    },
    benefits: {
        type: [String],
        trim: true,
        required: true
    },
    salary: {
        type: String,
        trim: true
    },
    level: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    updated: {
        type: Date,
        default: Date.now
    },

});


export default mongoose.model('Jobs', JobSchema);