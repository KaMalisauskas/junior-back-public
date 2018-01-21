
import mongoose from 'mongoose';

const connect = mongoose.connect('mongodb://juni_admin:admin_juni@ds157964.mlab.com:57964/junior', {
    useMongoClient: true,

    },
    (err) => {
    if(err) console.log(err);
    else console.log("Connected");
    }
);

module.exports = connect;