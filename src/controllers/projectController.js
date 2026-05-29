import { getUpcomingProjects, getProjectById } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js'; // Asegúrate de que la ruta sea correcta

export const showUpcomingProjects = async (req, res) => {
    try {
        const projects = await getUpcomingProjects();
        res.render('projects', { title: 'Upcoming Service Projects', projects });
    } catch (error) {
        console.error(error);
        res.status(500).render('500');
    }
};

export const showProjectDetails = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await getProjectById(projectId);
        if (!project) return res.status(404).render('404');
        
        // Obtener las categorías del proyecto
        const categories = await getCategoriesByProjectId(projectId);
        
        res.render('project', { title: project.project_name, project, categories });
    } catch (error) {
        console.error(error);
        res.status(500).render('500');
    }
};