const userService = require('./user.service');
const User = require('../../dataBase/User');
const { joiValidatorSchema } = require('./user.validator');
const { NotFound, BadRequest, Conflict } = require('../../errors/Apierror');

module.exports = {
    getUserDynamically: (paramName, from, dbField = paramName) => async (req, res, next) => {
        try {
            const searchData = req[from][paramName];
            const user = await userService.findUserByParams({ [dbField]: searchData });
	
            if (!user) {
                throw new NotFound('User not found');
            }
	
            req.locals = { ...req.locals, user };
	
            next();
        } catch (e) {
            next(e);
        }
    },

    createValidator: async (req, res, next) => {
        try {
            const { error } = joiValidatorSchema.validate(req.body);
	
            if(error){
                throw new BadRequest(error);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
	
    isEmailAndLoginExsist:  async (req, res, next) => {
        try {
            const fullName = req.body?.fullName;
            const email = req.body?.email;

            if(await User.findOne({email})){
                throw new Conflict('This email used, try another one');
            }

            if(await User.findOne({fullName})){
                throw new Conflict('This fullName used, try another one');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};