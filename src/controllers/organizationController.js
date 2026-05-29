import { getAllOrganizations, getOrganizationById, getProjectsByOrganizationId } from '../models/organization.js';

export const showOrganizations = async (req, res) => {
    try {
        const organizations = await getAllOrganizations();
        res.render('organizations', { title: 'Partner Organizations', organizations });
    } catch (error) {
        console.error(error);
        res.status(500).render('500');
    }
};

export const showOrganizationDetails = async (req, res) => {
    try {
        const orgId = req.params.id;
        const organization = await getOrganizationById(orgId);
        if (!organization) return res.status(404).render('404');
        const projects = await getProjectsByOrganizationId(orgId);
        res.render('organization', { title: organization.name, organization, projects });
    } catch (error) {
        console.error(error);
        res.status(500).render('500');
    }
};