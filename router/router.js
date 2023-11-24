const userController = require('../controller/controller')

const userRoute = {
    method: 'POST',
    path: '/api/user/add',
    handler: userController.saveUser,

    method: 'PUT',
    path: '/api/user/update/{id}',
    handler: userController.updateUser,

    method: 'DELETE',
    path: '/api/user/delete/{id}',
    handler: userController.deleteUser,

    method: 'GET',
    path: '/api/user/list',
    handler: userController.allUserList,
};

module.exports = [userRoute];



