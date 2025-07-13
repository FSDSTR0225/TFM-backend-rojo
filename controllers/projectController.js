const mongoose = require("mongoose");
const Project = require("../models/projectModel");

module.exports = {
  getProjects: async (req, res) => {
    try {
      const projects = await Project.find({
        isDeleted: { $ne: true },
      }).populate({
        path: "owner",
        select: "name surname avatar role",
        match: { isDeleted: { $ne: true } }
      });

      // Filtrar proyectos cuyos owners no estén eliminados
      const filteredProjects = projects.filter(project => project.owner);

      res.json(filteredProjects);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getProjectById: async (req, res) => {
    try {
      const userId = req.user ? req.user.id : null; // el id del usuario logueado, o null si no hay
      const project = await Project.findById(req.params.id).populate({
        path: "owner",
        select: "name surname avatar role",
        match: { isDeleted: { $ne: true } }
      });

      if (!project || project.isDeleted) {
        return res.status(404).json({ msg: "Project not found" });
      }

      // Verificar si el owner está eliminado
      if (!project.owner) {
        return res.status(404).json({ msg: "Project not found" });
      }

      // Comprobar si el usuario ha dado like
      let liked = false;
      if (userId) {
        liked = project.likedBy.some((id) => id.toString() === userId);
      }

      // Devuelves el proyecto junto con liked
      res.json({ ...project.toObject(), liked });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getProjectsByDeveloper: async (req, res) => {
    try {
      const developerId = req.params.developerId;
      
      // Primero verificar que el developer no esté eliminado
      const User = require("../models/userModel");
      const developer = await User.findById(developerId);
      if (!developer || developer.isDeleted) {
        return res.status(404).json({ msg: "Developer not found" });
      }

      const projects = await Project.find({
        owner: developerId,
        isDeleted: { $ne: true },
      }).populate({
        path: "owner",
        select: "name surname avatar role",
        match: { isDeleted: { $ne: true } }
      });

      // Filtrar proyectos cuyos owners no estén eliminados (por seguridad adicional)
      const filteredProjects = projects.filter(project => project.owner);

      res.status(200).json(filteredProjects);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  createProject: async (req, res) => {
    try {
      const userId = req.user.id;
      const project = { ...req.body, owner: userId };
      console.log("Frontend value: ", project);
      const newProject = new Project(project);
      await newProject.save();
      res.json({ project: newProject, msg: "Project created successfully" });
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
      if (!project || project.isDeleted) {
        return res.status(404).json({ msg: "Project not found" });
      }

      if (project.owner.toString() !== userId) {
        return res
          .status(403)
          .json({ msg: "You are not authorized to update this project" });
      }

      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { ...projectNewData },
        { new: true }
      );

      return res
        .status(200)
        .json({ msg: "Project updated successfully", updatedProject });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  deleteProject: async (req, res) => {
    try {
      const projectId = req.params.id;
      const userId = req.user.id;

      const project = await Project.findById(projectId);

      if (!project || project.isDeleted) {
        return res.status(404).json({ msg: "Project not found" });
      }

      if (project.owner.toString() !== userId) {
        return res
          .status(403)
          .json({ msg: "You are not authorized to delete this project" });
      }

      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { isDeleted: true, deletedAt: new Date() },
        { new: true }
      );

      return res
        .status(200)
        .json({ msg: "Project deleted (soft delete)", updatedProject });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  incrementView: async (req, res) => {
    try {
      const projectId = req.params.id;
      
      // Verificar que el proyecto existe y no está eliminado
      const project = await Project.findById(projectId).populate({
        path: "owner",
        select: "_id",
        match: { isDeleted: { $ne: true } }
      });
      
      if (!project || project.isDeleted || !project.owner) {
        return res.status(404).json({ msg: "Project not found" });
      }
      
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { $inc: { views: 1 } },
        { new: true }
      );
      
      res.json({ views: updatedProject.views });
    } catch (error) {
      console.error("Error en incrementView:", error);
      res.status(500).json({ msg: error.message });
    }
  },

  toggleLike: async (req, res) => {
    try {
      const projectId = req.params.id;
      const userId = req.user.id;

      const project = await Project.findById(projectId).populate({
        path: "owner",
        select: "_id",
        match: { isDeleted: { $ne: true } }
      });

      if (!project || project.isDeleted || !project.owner) {
        return res.status(404).json({ msg: "Project not found" });
      }

      const likedIndex = project.likedBy.findIndex(
        (id) => id.toString() === userId
      );

      if (likedIndex === -1) {
        // No ha dado like, agregamos userId
        project.likedBy.push(userId);
      } else {
        // Ya dio like, lo quitamos (toggle off)
        project.likedBy.splice(likedIndex, 1);
      }

      project.likes = project.likedBy.length; // Actualizamos contador

      await project.save();

      res.json({ likes: project.likes, liked: likedIndex === -1 });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  softDeleteProject: async (req, res) => {
    try {
      const projectId = req.params.id;
      const userId = req.user.id;

      const project = await Project.findById(projectId);
      if (!project || project.isDeleted) {
        return res.status(404).json({ msg: "Project not found" });
      }
      if (project.owner.toString() !== userId)
        return res.status(403).json({ msg: "Unauthorized" });

      project.isDeleted = true;
      await project.save();

      res.status(200).json({ msg: "Project deleted (soft)" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getLikeStatus: async (req, res) => {
    try {
      const projectId = req.params.id;
      const userId = req.user.id;

      const project = await Project.findById(projectId).populate({
        path: "owner",
        select: "_id",
        match: { isDeleted: { $ne: true } }
      });

      if (!project || project.isDeleted || !project.owner) {
        return res.status(404).json({ msg: "Project not found" });
      }

      const liked = project.likedBy.some((id) => id.toString() === userId);

      res.json({ liked, likesCount: project.likes });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  searchProjects: async (req, res) => {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ msg: "Search query is required" });
    }

    try {
      const regex = new RegExp(q, "i");

      const projects = await Project.find({
        isDeleted: { $ne: true },
        $or: [
          { title: regex },
          { description: regex },
          { category: regex },
          { professionalRole: regex },
          { projectSkills: regex },
        ],
      }).populate({
        path: "owner",
        select: "name surname avatar role",
        match: { isDeleted: { $ne: true } }
      });

      // Filtrar proyectos cuyos owners no estén eliminados
      const filteredProjects = projects.filter(project => project.owner);

      res.json(filteredProjects);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};