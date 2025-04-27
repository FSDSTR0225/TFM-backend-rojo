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
            res.json({project: newProject, msg: 'Project created successfully'});
        } catch (error) {
            res.status(500).json({ msg: error.message});
        }
    },

    updateProject:async(req,res)=>{
        try {
            const project = req.body;
            // const userId = req.params.id;
            // if(!userId) return res.status(400).json({ msg: 'User not found' });
            if(!project) return res.status(400).json({ msg: 'Some required fields are missing' });
            if(!project._id) return res.status(400).json({ msg: 'Project not found' });
            const projectUpdate = await Project.findByIdAndUpdate(project._id,project,{new:true});
            res.json({project: projectUpdate, msg: 'Project update successfully'});
        } catch (error) {
            res.status(500).json({ msg: error.message});
        }
    }

}

