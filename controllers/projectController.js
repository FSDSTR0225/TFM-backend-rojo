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
            const userId = req.user.id; // Recoge el id del usuario
            const project = { ...req.body, owner: userId }; //Recoge los datos del usuario y le añade el id del dueño de la tarea.
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
            const projectId = req.params.id; //Recoge el id del proyecto
            const userId = req.user.id; // Recoge el id del usuario
            const projectNewData = req.body; // Recoge los datos del body para pasar al backend
    
            const project = await Project.findById(projectId); // Encuentra la tarea por el id de la tarea
            if (!project) {
                return res.status(404).json({ msg: 'Project not found' });
            }
    
            if (project.owner.toString() !== userId) { //Comprueba que corresponda con el id del usuario y, si no es el mismo, no puede actualizar el proyecto
                return res.status(403).json({ msg: 'You are not authorized to update this project' });
            }
    
            const updatedProject = await Project.findByIdAndUpdate( //actualiza el proyecto
                projectId, // toma el id del proyecto
                { ...projectNewData }, // le mete los nuevos datos
                { new: true }
            );
    
            return res.status(200).json({ msg: 'Project updated successfully', updatedProject }); //devuelve los datos actualizados
            
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

}   
    
