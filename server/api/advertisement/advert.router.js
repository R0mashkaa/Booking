const advertRouter = require('express').Router();

const advertController = require('./advert.controller');
const advertMdlwr = require('./advert.middleware');
const authMdlwr = require('../authorization/auth.middleware');


advertRouter.use('/', authMdlwr.validateTokenDynamically('accessToken'));

advertRouter.post('/',  advertController.createAdvert);
advertRouter.get('/', advertController.getAllAdverts);

advertRouter.get('/MyBooking', advertController.getMyBooking);
advertRouter.get('/MyAdverts', advertController.getMyAdvert);

advertRouter.get('/:advertId', advertMdlwr.getAdvertDynamically('advertId','params','_id'), advertController.getAdvertById);
advertRouter.put('/:advertId',  advertMdlwr.getAdvertDynamically('advertId','params','_id'), advertController.updateAdvert);
advertRouter.delete('/:advertId', advertMdlwr.getAdvertDynamically('advertId','params','_id'),  advertController.deleteAdvert);

advertRouter.post('/booking/:advertId', advertMdlwr.getAdvertDynamically('advertId','params','_id'), advertController.createBooking);
advertRouter.put('/booking/:bookingId',  advertMdlwr.getBookingDynamically('bookingId','params','_id'), advertController.updateBooking);
advertRouter.delete('/booking/:bookingId', advertMdlwr.getBookingDynamically('bookingId','params','_id'),  advertController.deleteBooking);




module.exports = advertRouter;