const mongoose = require("mongoose");
const Dev = require('../models/userModel');

module.exports = {
    getDevs : async (req,res) => {
        try {
            const devs = await Dev.find({});
            res.json(devs);
        } catch (error) {
            res.status(500).json({ msg: error.message});
        }
    },

    getDevById : async (req,res) => {
        try {
            const dev = await Dev.findById(req.params.id);
            res.json(dev);
        } catch (error) {
            res.status(500).json({ msg: error.message});
        }
    }
}