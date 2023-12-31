const authService = require('./auth.service');
const userService = require('../user/user.service');
const { OAuthService, emailService } = require('../../services');
const { NO_CONTENT } = require('../../errors/error.codes');
const { BadRequest, Conflict, Unauthorized } = require('../../errors/Apierror');
const { FRONTEND_URL } = require('../../configs/variables');
const { FORGOT_PASSWORD, WELCOME, DELETE_ACCOUNT, BOOKING_OWNER, BOOKING_USER } = require('../../configs/emailTypes.enum');
const { FORGOT_PASSWORD: forgotPasswordAction,
    CONFIRM_ACCOUNT: сonfirmAccountAction,
    DELETE_ACCOUNT: deleteAccountAction,
    BOOKING_ADVERT: bookingAdvertAction } = require('../../configs/actionTokenTypes.enum');

module.exports = {
    userLogin: async (req, res, next) => {
        try {
            const user = req.locals.user;

            if (user.accountStatus === 'Pending') {
                throw new BadRequest('Account not confirmed.');
            }

            if (user.accountStatus === 'Banned') {
                throw new Unauthorized('Your account banned.');
            }

            await OAuthService.checkPasswords(user.password, req.body.password);
            const tokenPair = OAuthService.generateAccessTokenPair( { ...user } );
            await authService.createOauthPair({ ...tokenPair, user: user._id });
			
            res.json({
                ...tokenPair,
                user
            });
        } catch (e) {
            next(e);
        }
    },

    userLogoutSingleDevice: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization');
            await authService.deleteOneByParams({ accessToken });
	
            res.status(NO_CONTENT).json('Logouted');
        } catch (e) {
            next(e);
        }
    },

    userLogoutAllDevice: async (req, res, next) => {
        try {
            await authService.deleteManyByParams({ user: req.user._id });

            res.status(NO_CONTENT).json('Logouted on all devices');
        } catch (e) {
            next(e);
        }
    },

    sendForgotPasswordEmail: async (req, res, next) => {
        try {
            const user = req.locals.user;
            const forgotPasswordToken = OAuthService.generateActionToken(
                forgotPasswordAction,
                { email: user.email }
            );
            
            await authService.createActionToken({
                actionType: forgotPasswordAction,
                tokenData: forgotPasswordToken,
                user: req.locals.user._id
            });

            const forgotPassURL = `${FRONTEND_URL}/password/forgot?token=${forgotPasswordToken}`;

            await emailService.sendMail(user.email, FORGOT_PASSWORD, { forgotPassURL } );

            res.json('Email sent'); 
        } catch (e) {
            next(e);
        }
    },

    setForgotPassword: async (req, res, next) => {
        try {
            const { _id: userId } = req.user;

            const hashPassword = await OAuthService.hashPassword(req.body.password);
            await userService.updateUser(userId, { password: hashPassword });
            await authService.deleteManyByParams({ user: userId });
            
            res.json('Password changed. Logouted from all devices'); 
        } catch (e) {
            next(e);
        }
    },

    sendConfirmAccount: async (user) => {
        if (user.accountStatus != 'Pending') {
            throw new Conflict('You account is confirmed');
        }

        const confirmAccountToken = OAuthService.generateActionToken(
            сonfirmAccountAction,
            { email: user.email }
        );
            
        authService.createActionToken({
            actionType: сonfirmAccountAction,
            tokenData: confirmAccountToken,
            user: user._id
        });

        const confirmAccountURL = `${FRONTEND_URL}/account/confirmation?${confirmAccountToken}`;

        await emailService.sendMail(user.email, WELCOME, { confirmAccountURL, name: user.fullName });
    },

    setConfirmAccount: async (req, res, next) => {
        try {
            const { _id: userId } = req.user;
            await userService.updateUser(userId, { accountStatus: 'Active' });
            
            res.json('Account confirmed'); 
        } catch (e) {
            next(e);
        }
    },

    sendDeleteAccount: async (req, res, next) => {
        try {
            const user = req.locals.user;

            const deleteAccountToken = OAuthService.generateActionToken(
                deleteAccountAction,
                { email: user.email }
            );
            
            authService.createActionToken({
                actionType: deleteAccountAction,
                tokenData: deleteAccountToken,
                user: user._id
            });

            const deleteAccountURL = `${FRONTEND_URL}/account/delete?${deleteAccountToken}`;

            await emailService.sendMail(user.email, DELETE_ACCOUNT, { deleteAccountURL, name: user.fullName });
            res.json('Email sent'); 
        } catch (e) {
            next(e);
        }
    },

    setDeleteAccount: async (req, res, next) => {
        try {
            const { _id: userId } = req.user;
            await userService.deleteUser(userId);
            
            res.json('Account deleted'); 
        } catch (e) {
            next(e);
        }
    },

    sendBookingAdvertisment: async (userId, ownerId, advert) => {
        const userObject = await userService.getSingleUser(userId);
        const ownerObject = await userService.getSingleUser(ownerId);

        console.log(advert);

        const BookingAdvertismentToken = OAuthService.generateActionToken(
            bookingAdvertAction,
            { email: userObject.email }
        );
            
        authService.createActionToken({
            actionType: bookingAdvertAction,
            tokenData: BookingAdvertismentToken,
            user: userObject._id
        });

        await emailService.sendMail(ownerObject.email, BOOKING_OWNER, {
            ownerName: ownerObject.fullName,
            userName: userObject.fullName,
            advertName: advert.advertName
        });
        await emailService.sendMail(userObject.email, BOOKING_USER, {
            userName: userObject.fullName,
            advertName: advert.advertName,
            region: advert.region,
            city: advert.city,
            pricePerDay: advert.pricePerDay
        });
    },

    refreshToken: async (req, res, next) => {
        try {
            const user = req.user;

            const refreshToken = req.get('Authorization');

            await authService.deleteOneByParams({ refreshToken });

            const tokenPair = OAuthService.generateAccessTokenPair({ ...user.id });

            await authService.createOauthPair({ ...tokenPair, user: user._id });
            res.json({ ...tokenPair, user });
        } catch (e) {
            next(e);
        }
    }
};