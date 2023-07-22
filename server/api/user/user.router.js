const userRouter = require('express').Router();

const userController = require('./user.controller');
const userMdlwr = require('./user.middleware');
const authController = require('../authorization/auth.controller');
const authMdlwr = require('../authorization/auth.middleware');

const { FORGOT_PASSWORD, CONFIRM_ACCOUNT, DELETE_ACCOUNT } = require ('../../configs/actionTokenTypes.enum');

userRouter.post('/', userMdlwr.createValidator, userMdlwr.isEmailAndLoginExsist, userController.createUser);
userRouter.post('/confirmation', userMdlwr.getUserDynamically('email','body'), authController.sendConfirmAccount);
userRouter.patch('/confirmation', authMdlwr.validateActionToken(CONFIRM_ACCOUNT), authController.setConfirmAccount);

userRouter.post('/password/forgot', userMdlwr.getUserDynamically('email','body'), authController.sendForgotPasswordEmail);
userRouter.patch('/password/forgot', authMdlwr.validateActionToken(FORGOT_PASSWORD), authController.setForgotPassword);


userRouter.use('/', authMdlwr.validateTokenDynamically('accessToken'));
userRouter.get('/', userController.getAllUsers);

userRouter.get('/:userId', userMdlwr.getUserDynamically('userId','params','_id'), userController.getUserById);
userRouter.put('/:userId',  userMdlwr.getUserDynamically('userId','params','_id'), userMdlwr.createValidator, userMdlwr.isEmailAndLoginExsist, userController.updateUser);
userRouter.delete('/:userId', userMdlwr.getUserDynamically('userId','params','_id'),  userController.deleteUser);

userRouter.get('/Profile', userController.getMyProfile);

userRouter.post('/deleteAccount', userMdlwr.getUserDynamically('email','body'), authController.sendDeleteAccount);
userRouter.patch('/deleteAccount', authMdlwr.validateActionToken(DELETE_ACCOUNT), authController.setDeleteAccount);



module.exports = userRouter;