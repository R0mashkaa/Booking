const advertService = require('./advert.service');
const { getByAccessToken } = require('../authorization/auth.service');
const { sendBookingAdvertisment } = require('../authorization/auth.controller');
const { CREATED, NO_CONTENT } = require('../../errors/error.codes');

module.exports = {
    getAllAdverts: async (req, res, next) => {
        try {
            const alldvertsList = await advertService.getAllAdverts();

            res.json(alldvertsList);
        } catch (e) {
            next(e);
        }
    },

    getAdvertById: async (req, res, next) => {
        try {
            res.json(req.locals.advert);
        } catch (e) {
            next(e);
        }
    },

    getMyAdvert: async (req, res, next) => {
        try {
            const { _id: userId } = req.user.toObject();
            const userAdverts = await advertService.findAdvertByUserId({ userId });
            
            res.json(userAdverts);
        } catch (e) {
            next(e);
        }
    },

    createAdvert: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization');
            const { user: userOwner } = await getByAccessToken({ accessToken });
            const createdAdvert = await advertService.createAdvert({ ...req.body, owner: userOwner });

            res.status(CREATED).json(createdAdvert);
        } catch (e) {
            next(e);
        }
    },

    updateAdvert: async (req, res, next) => {
        try {
            const updatedAdvert = await advertService.updateAdvert(req.params.advertId, req.body);
			
            res.json(updatedAdvert);
        } catch (e) {
            next(e);
        }
    },

    deleteAdvert: async (req, res, next) => {
        try {
            await advertService.deleteAdvert(req.params.advertId);
			
            res.status(NO_CONTENT).json('Advert deleted');
        } catch (e) {
            next(e);
        }
    },


    getMyBooking: async (req, res, next) => {
        try {
            const { _id: userId } = req.user.toObject();
            const userAdverts = await advertService.findBookingByUserId({ userId });
            
            res.json(userAdverts);
        } catch (e) {
            next(e);
        }
    },

    requestBooking: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization');
            const { user: userId } = await getByAccessToken({ accessToken });
            const advert = req.locals.advert;
            
            sendBookingAdvertisment(userId, advert.owner, advert);

            res.status(200).json('Booking requested');
        } catch (e) {
            next(e);
        }
    },

    createBooking: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization');
            const { user: userId } = await getByAccessToken({ accessToken });
            const advert = req.locals.advert;

            const booking = {
                advertId: advert._id,
                ...req.body,
                user: userId,
                owner: advert.owner
            };
            
            const createdBooking = await advertService.createBooking(booking);

            res.status(CREATED).json(createdBooking);
        } catch (e) {
            next(e);
        }
    },

    updateBooking: async (req, res, next) => {
        try {
            const updatedBooking = await advertService.updateBooking(req.params.bookingId, req.body);
			
            res.json(updatedBooking);
        } catch (e) {
            next(e);
        }
    },

    deleteBooking: async (req, res, next) => {
        try {
            await advertService.deleteBooking(req.params.bookingId);
			
            res.status(NO_CONTENT).json('Booking deleted');
        } catch (e) {
            next(e);
        }
    },   
    
};