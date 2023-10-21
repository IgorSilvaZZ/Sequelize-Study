const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = { 

    async index(req, res){

        const users = await User.findAll();

        return res.json(users);

    },

    async store(req, res){
        const { name, email } = req.body;

        const userExists = await User.findOne({ where: { [Op.or]: [ { email }, { name } ] }});

        if(userExists){
            return res.status(400).json({ error: "User exists" });
        }

        const user = await User.create({ name, email });

        return res.json(user)

    },

}