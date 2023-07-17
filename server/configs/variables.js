module.exports = {
    PORT: process.env.PORT || 3001,
    FRONTEND_URL: process.env.FRONTEND_URL,
    CONFIRMACCOUNT_URL:process.env.CONFIRMACCOUNTURL,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/rocket2',

    ACCESS_TOKEH_SECRET: process.env.ACCESS_TOKEH_SECRET || 'ThIsMuStBeSeCrEtMaYbE_4ccess',
    REFRESH_TOKEH_SECRET: process.env.REFRESH_TOKEH_SECRET || 'ThIsMuStBeSeCrEtMaYbE_Refresh',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASS: process.env.NO_REPLY_EMAIL_PASS,

};