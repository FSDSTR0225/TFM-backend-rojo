const mongoose = require("mongoose");
const Project = require('../models/projectModel');

module.exports = {
    getProjects : async (req,res) => {
        try {
            const projects = await Project.find({});
            res.json(projects);
        } catch (error) {
            res.status(500).json({ msg: error.message});
        }
    },

    getProjectById : async (req,res) => {
        try {
            const project = await Project.findById(req.params.id);
            res.json(project);
        } catch (error) {
            res.status(500).json({ msg: error.message});
        }
    }


}

