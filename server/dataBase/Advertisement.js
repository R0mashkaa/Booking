const mongoose = require('mongoose');

const AdvertScheme = new mongoose.Schema({
    advertName: { type: String, trim: true, required: true },
    region: { type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true },
    pricePerDay: { type: Number, trim: true, required: true },
    reserved: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
},
{
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

module.exports = mongoose.model('Advert', AdvertScheme);