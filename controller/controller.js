const UserModel = require('../model/model');
const { Op } = require('sequelize');


const saveUser = async (req, h) => {
    try {
        const { firstName, lastName, email } = req.payload;
        const userobj = await UserModel.findOne({
            where: {
                email
            },
            attributes: ['id'],
            raw: true
        })

        if (userobj) {
            return h.response({ error: 'User already exist' }).code(400);
        }
        const newUser = await UserModel.create({ firstName, lastName, email });
        if (newUser) {
            return h.response(newUser).code(200);
        } else {
            return h.response({ error: 'User can not added' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);

    }
};

const updateUser = async (req, h) => {
    try {
        const userIdToUpdate = parseInt(req.params.id); // User id
        const newData = {
            firstName: req.payload.firstName,
            lastName: req.payload.lastName,
            email: req.payload.email,
        };

        const userobj = await UserModel.findOne({
            where: {
                email: req.payload.email,
                id: {
                    [Op.ne]: userIdToUpdate
                },
            },
            attributes: ['id'],
            raw: true
        })

        if (userobj) {
            return h.response({ error: 'User already exist' }).code(400);
        }

        const updatedUser = await UserModel.update(newData, {
            where: {
                id: userIdToUpdate,
            },
        })

        if (updatedUser) {
            return h.response(updatedUser).code(200);
        } else {
            return h.response({ error: 'User can not updated' }).code(400);
        }

    } catch (error) {
        return h.response(error.message).code(500);

    }
};
const deleteUser = async (req, h) => {
    try {
        const userIdToDelete = parseInt(req.params.id);
        const newUser = await UserModel.destroy({
            where: {
                id: userIdToDelete
            }
        })
        return h.response(newUser).code(200);
    } catch (error) {
        return h.response(error.message).code(500);

    }
};

const allUserList = async (req, h) => {
    try {
        const userList = await UserModel.findAll()
        if (userList) {
            return h.response(userList).code(200);
        } else {
            return h.response({ error: 'User list not found' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);

    }
};



module.exports = {
    saveUser,
    updateUser,
    deleteUser,
    allUserList
};
