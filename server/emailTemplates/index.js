const { WELCOME, FORGOT_PASSWORD, BANNED, DELETE_ACCOUNT, BOOKING_OWNER, BOOKING_USER} = require ('../configs/emailTypes.enum');

module.exports = {
    [WELCOME]: {
        templateName: 'Welcome',
        subject: 'Welcome to the platform'
    },

    [FORGOT_PASSWORD]: {
        templateName: 'ForgotPassword',
        subject: 'Forgot password'
    },

    [BANNED]: {
        templateName: 'Banned',
        subject: 'Your account was banned'
    },

    [DELETE_ACCOUNT]: {
        templateName: 'DeleteAccount',
        subject: 'Account deletion confirmation'
    },

    
    [BOOKING_OWNER]: {
        templateName: 'BookingOwner',
        subject: 'Booking request'
    },
 
    [BOOKING_USER]: {
        templateName: 'BookingUser',
        subject: 'Booking requested'
    }
};