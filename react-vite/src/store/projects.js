import { csrfFetch } from './csrf.js';

const LOAD_PROJECTS = 'projects/LOAD';
const ADD_PROJECT = 'projects/ADD';
const REMOVE_PROJECT = 'projects/REMOVE';
const UPDATE_PROJECT = 'projects/UPDATE';

const loadProjects = (projects) => ({
    type: LOAD_PROJECTS,
    projects
});

const addProject = (project) => ({
    type: ADD_PROJECT,
    project
});

const removeProject = (projectId) => ({
    type: REMOVE_PROJECT,
    projectId
});

const updateProjectAction = (project) => ({
    type: UPDATE_PROJECT,
    project
});

export const fetchProjects = () => async (dispatch) => {
    const response = await csrfFetch('/api/projects');

    if (response.ok) {
        const projects = await response.json();
        dispatch(loadProjects(projects));
        return projects;
    }
};

export const createProject = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/projects', {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const newProject = await response.json();
        dispatch(addProject(newProject));
        return newProject;
    }
};

export const deleteProject = (projectId, userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/projects/${projectId}`, {
        method: "DELETE",
        headers: { "userId": userId }
    });

    if (response.ok) {
        dispatch(removeProject(projectId));
        return projectId;
    } else {
        console.log(response)
    }
};

export const updateProject = (projectId, payload, userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/projects/${projectId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { "userId": userId }
    });

    if (response.ok) {
        const updatedProject = await response.json();
        dispatch(updateProjectAction(updatedProject));
        return updatedProject;
    } else {
        const errorData = await response.json();
        throw errorData;
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
        case UPDATE_PROJECT: {
            return {
                ...state,
                [action.project.id]: action.project
            };
        }
        default:
            return state;
    }
}
