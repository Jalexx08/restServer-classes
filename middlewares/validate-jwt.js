const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
	const token = req.header("x-token");
	if (!token)
		return res.status(401).json({
			msg: "There is no token",
		});

	try {
		const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

		//*  Leer el ususario que correponde al uid
		const user = await User.findById(uid);

		if (!user)
			return res.status(401).json({
				msg: "Token is not valid - user no DB",
			});

		//* Verificar si el uid tiene estado true
		if (!user.state)
			return res.status(401).json({
				msg: "Token is not valid - user.state:false",
			});

		req.user = user;

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg: "Token is not valid",
		});
	}
};

module.exports = {
	validateJWT,
};
