const userService = require('./user.service');
const { CREATED, NO_CONTENT } = require('../../errors/error.codes');
const { sendConfirmAccount } = require('../authorization/auth.controller');

module.exports = {
    getMyProfile: async (req, res, next) => {
        try {
            res.json({
                ...req.user.toObject(),
            });
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const allUsersList = await userService.getAllUsers();

            res.json(allUsersList);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            res.json(req.locals.user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const createdUser = await userService.createUser(req.body);
            sendConfirmAccount(createdUser);

            res.status(CREATED).json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const updatedUser = await userService.updateUser(req.params.userId, req.body);
			
            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            await userService.deleteUser(req.params.userId);
			
            res.status(NO_CONTENT).json('User deleted');
        } catch (e) {
            next(e);
        }
    },

};