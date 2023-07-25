const authRouter = require('express').Router();

const authController = require('./auth.controller');
const authMdlwr = require('./auth.middleware');
const userMdlwr = require('../user/user.middleware');


authRouter.post('/', userMdlwr.getUserDynamically('email', 'body'), authController.userLogin);
authRouter.post('/logout', authMdlwr.validateTokenDynamically('accessToken'), authController.userLogoutSingleDevice);
authRouter.post('/logoutAll', authMdlwr.validateTokenDynamically('accessToken'), authController.userLogoutAllDevice);

authRouter.post('/refresh', authMdlwr.validateTokenDynamically('refreshToken'),  authController.refreshToken);



module.exports = authRouter;