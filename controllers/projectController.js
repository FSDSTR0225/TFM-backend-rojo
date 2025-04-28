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

    createProject: async (req, res) => {
        try {
            const userId = req.user.id;
            const project = { ...req.body, owner: userId };
            console.log('Frontend value: ', project);
            const newProject = new Project(project);
            await newProject.save();
            res.json({ project: newProject, msg: 'Project created successfully' });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    updateProject: async (req, res) => {
        try {
            const projectId = req.params.id;
            const userId = req.user.id;
            const projectNewData = req.body;
    
            const project = await Project.findById(projectId);
            if (!project) {
                return res.status(404).json({ msg: 'Project not found' });
            }
    
            if (project.owner.toString() !== userId) { 
                return res.status(403).json({ msg: 'You are not authorized to update this project' });
            }
    
            const updatedProject = await Project.findByIdAndUpdate( 
                projectId, 
                { ...projectNewData }, 
                { new: true }
            );
    
            return res.status(200).json({ msg: 'Project updated successfully', updatedProject }); 
            
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

}   
    
