const { WELCOME, FORGOT_PASSWORD, BANNED, DELETE_ACCOUNT } = require ('../configs/emailTypes.enum');

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
    }
};