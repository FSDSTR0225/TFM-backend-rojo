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
    },

    createProject:async(req, res)=>{
        try {
            const project = req.body;
            console.log('Valor del frontEnd: ',project);
            const newProject = new Project(project);
            await newProject.save();
            res.json({project: newProject, msg: 'Proyecto creado correctamente'});
        } catch (error) {
            res.status(500).json({ msg: error.message});
        }
    },

    updateProject:async(req,res)=>{
        try {

        } catch (error) {
            res.status(500).json({ msg: error.message});
        }
    }

}
