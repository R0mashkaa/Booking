const apiRouter = require('express').Router();

const advertRouter = require('./advertisement/advert.router');
const userRouter = require('./user/user.router');
const authRouter = require('./authorization/auth.router');

apiRouter.use('/advert', advertRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);


module.exports = apiRouter;