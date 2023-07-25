const Advert = require('../../dataBase/Advertisement');
const Booking = require('../../dataBase/Booking');

module.exports = {
    getAllAdverts: async () => {
        return Advert.find();
    },
  
    getSingleAdvert: async (advertId) => {
        return Advert.findById(advertId);
    },

    findAdvertByParams: (searchObject) => {
        return Advert.findOne(searchObject);
    },

    findAdvertByUserId: async (userId) => {
        return Advert.find(userId);
    },
  
    createAdvert: async (advertObject) => {
        return Advert.create(advertObject);
    },

    updateAdvert: async (advertId, advertNewData) => {
        return Advert.findByIdAndUpdate(advertId, advertNewData);
    },

    deleteAdvert: async (advertId) => {
        return  Advert.findByIdAndRemove(advertId);
    },
    

    findBookingByParams: (searchObject) => {
        return Booking.findOne(searchObject);
    },

    findBookingByUserId: async (userId) => {
        return Booking.find(userId);
    },

    createBooking: async (bookingObject) => {
        return Booking.create(bookingObject);
    },

    updateBooking: async (BookingId, bookingNewData) => {
        return Booking.findByIdAndUpdate(BookingId, bookingNewData);
    },

    deleteBooking: async (BookingId) => {
        return  Booking.findByIdAndRemove(BookingId);
    },
};