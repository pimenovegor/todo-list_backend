const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const Token = require('../dataBase/models/Token.model.');
const User = require('../dataBase/models/User.model.');
const { asyncHandler,requireToken } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.post('/logout',asyncHandler(requireToken),asyncHandler(exitUser));
    router.get('/',asyncHandler(requireToken), asyncHandler(getUser));
    router.patch('/',asyncHandler(requireToken),asyncHandler(updateUser));
}

async function exitUser(req, res, next) {
    await req.token.destroy();

    res.status(200).json({ message:'OK' });

}

async function getUser(req, res, next) {
    const user = await User.findOne({where:{id: req.userId}});

    res.status(200).json(user);
}

async function updateUser(req, res, next) {
    const user=await User.findByPk(req.userId)
    await user.update({
        login: req.body.login,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        info: req.body.info
    });

    res.status(200).json({message: 'OK'});
}

initRoutes();

module.exports = router;