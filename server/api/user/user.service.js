const User = require('../../dataBase/User');
const { OAuthService } = require('../../services');

module.exports = {
    getAllUsers: async () => {
        return await User.find();
    },
  
    getSingleUser: async (userId) => {
        return await User.findById(userId);
    },

    findUserByParams: (searchObject) => {
        return User.findOne(searchObject);
    },
  
    createUser: async (userObject) => {
        const hashPassword = await OAuthService.hashPassword(userObject.password);
        return User.create({ ...userObject, password: hashPassword });
    },

    updateUser: async (userId, userNewData) => {
        return User.findByIdAndUpdate(userId, userNewData);
    },

    deleteUser: async (userId) => {
        return  User.findByIdAndRemove(userId);
    },
    
};