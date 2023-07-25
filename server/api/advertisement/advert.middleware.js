const advertService = require('./advert.service');
const { NotFound } = require('../../errors/Apierror');

module.exports = {
    getAdvertDynamically: (paramName, from, dbField = paramName) => async (req, res, next) => {
        try {
            const searchData = req[from][paramName];
            const advert = await advertService.findAdvertByParams({ [dbField]: searchData });
	
            if (!advert) {
                throw new NotFound('Advert not found');
            }
	
            req.locals = { ...req.locals, advert };
	
            next();
        } catch (e) {
            next(e);
        }
    },

    getBookingDynamically: (paramName, from, dbField = paramName) => async (req, res, next) => {
        try {
            const searchData = req[from][paramName];
            const booking = await advertService.findBookingByParams({ [dbField]: searchData });
	
            if (!booking) {
                throw new NotFound('Booking not found');
            }
	
            req.locals = { ...req.locals, booking };
	
            next();
        } catch (e) {
            next(e);
        }
    }
};