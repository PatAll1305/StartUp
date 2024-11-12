import { csrfFetch } from './csrf.js';

const LOAD_PROJECTS = 'projects/LOAD';
const ADD_PROJECT = 'projects/ADD';
const REMOVE_PROJECT = 'projects/REMOVE';

const loadProjects = (projects) => {
    return {
        type: LOAD_PROJECTS,
        projects
    };
};

const addProject = (project) => {
    return {
        type: ADD_PROJECT,
        project
    };
};

const removeProject = (projectId) => {
    return {
        type: REMOVE_PROJECT,
        projectId
    };
};

export const fetchProjects = () => async (dispatch) => {
    const response = await csrfFetch('/api/projects');

    if (response.ok) {
        const projects = await response.json();
        dispatch(loadProjects(projects));
        return projects;
    }
};

export const createProject = (payload) => async (dispatch) => {
    const { title, description, goal, deadline, location, media_url, category_id, user_id, amount, backers } = payload;

    const response = await csrfFetch('/api/projects', {
        method: "POST",
        body: JSON.stringify({
            title,
            description,
            goal,
            deadline,
            location,
            media_url,
            category_id,
            user_id,
            amount,
            backers
        })
    });

    if (response.ok) {
        const newProject = await response.json();
        dispatch(addProject(newProject));
        return newProject;
    }
};

export const deleteProject = (projectId) => async (dispatch) => {
    const response = await csrfFetch(`/api/projects/${projectId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(removeProject(projectId));
        return projectId;
    }
};

export default function projectReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_PROJECTS: {
            const newState = {};
            action.projects.forEach((project) => {
                newState[project.id] = project;
            });
            return newState;
        }
        case ADD_PROJECT: {
            return {
                ...state,
                [action.project.id]: action.project
            };
        }
        case REMOVE_PROJECT: {
            const newState = { ...state };
            delete newState[action.projectId];
            return newState;
        }
        default:
            return state;
    }
}
