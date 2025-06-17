const mongoose = require("mongoose");
const Project = require('../models/projectModel');

module.exports = {
    getProjects : async (req,res) => {
        try {
        const projects = await Project.find({ isDeleted: { $ne: true } })
        .populate('owner', 'name surname avatar');

          res.json(projects);
        } catch (error) {
            res.status(500).json({ msg: error.message});
        }
    },

    getProjectById : async (req,res) => {
        try {
            const project = await Project.findById(req.params.id)
                .populate('owner', 'name surname avatar'); // Aquí está la clave
            res.json(project);
        } catch (error) {
            res.status(500).json({ msg: error.message});
        }
    },

    getProjectsByDeveloper: async (req, res) => {
        try {
            const developerId = req.params.developerId;
            const projects = await Project.find({ owner: developerId, isDeleted: { $ne: true } })
            .populate('owner', 'name surname avatar');

            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ msg: error.message });
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
    },

    deleteProject: async (req, res) => {
        try {
            const projectId = req.params.id;
            const userId = req.user.id;

            const project = await Project.findById(projectId);

            if (!project) {
                return res.status(404).json({ msg: 'Project not found' });
            }

            if (project.owner.toString() !== userId) {
                return res.status(403).json({ msg: 'You are not authorized to delete this project' });
            }

            const updatedProject = await Project.findByIdAndUpdate(
                projectId,
                { isDeleted: true, deletedAt: new Date() },
                { new: true }
            );

            return res.status(200).json({ msg: 'Project deleted (soft delete)', updatedProject });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}   







