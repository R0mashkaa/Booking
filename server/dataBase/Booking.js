const mongoose = require('mongoose');

const BookingScheme = new mongoose.Schema({
    advertId: { type: String },
    bookedFrom: { type: String, trim: true, required: true },
    bookedTo: { type: String, trim: true, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Advertisement', required: true },
},
{
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

module.exports = mongoose.model('Booking', BookingScheme);