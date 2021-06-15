const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
	if (!req.user)
		return res.status(500).json({
			msg: "It is required to verify role without validating role before",
		});

	const { role, name } = req.user;

	if (role !== "ADMIN_ROLE")
		return res.status(401).json({
			msg: `${name} is not Admin`,
		});

	next();
};

const gotRole = (...roles) => {
	return (req, res = response, next) => {
		if (!req.user)
			return res.status(500).json({
				msg: "It is required to verify role without validating role before",
			});

		if (!roles.includes(req.user.role))
			return res.status(401).json({
				msg: `It is required some these roles ${roles}`,
			});

		next();
	};
};

module.exports = {
	isAdminRole,
	gotRole,
};
