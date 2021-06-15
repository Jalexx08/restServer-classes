const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require('../helpers/generateJWT');

const login = async (req, res = response) => {
	const { email, password } = req.body;

	try {

        //* Verificar si exite el email
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({
            msg: 'User/ Password are not valids - email'
        });

        //* Si el usuario está activo

        if(!user.state) return res.status(400).json({
            msg: 'User/ Password are not valids - state: false'
        });

        //* Verificar la contrasñea

        const validPassword = bcryptjs.compareSync( password, user.password );
        if(!validPassword ) return res.status(400).json({
            msg: 'User/ Password are not valids - password'
        });

        //* Generar el JWT

        const token = await generateJWT( user.id );

		res.json({
			user,
            token

		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Error server",
		});
	}
};

module.exports = {
	login,
};
