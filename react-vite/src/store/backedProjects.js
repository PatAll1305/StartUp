import { csrfFetch } from './csrf';

const SET_BACKED_PROJECTS = 'backedProjects/SET';
const UPDATE_BACKED_PROJECT = 'backedProjects/UPDATE';
const REMOVE_BACKING = 'backedProjects/REMOVE';
const ADD_BACKING = 'backedProjects/ADD';

const setBackedProjects = (backedProjects) => ({
    type: SET_BACKED_PROJECTS,
    backedProjects,
});

const updateBackedProjectAction = (backedProject) => ({
    type: UPDATE_BACKED_PROJECT,
    backedProject,
});

const removeBacking = (backingId) => ({
    type: REMOVE_BACKING,
    backingId,
});

const addBacking = (backedProject) => ({
    type: ADD_BACKING,
    backedProject,
});

export const fetchBackedProjects = () => async (dispatch) => {
    const res = await csrfFetch('/api/backed_projects/my-backed-projects');
    if (res.ok) {
        const data = await res.json();
        dispatch(setBackedProjects(data.backed_projects));
        return data.backed_projects;
    }
    throw new Error('Failed to fetch backed projects');
};

export const updateBackedProject = (id, donation_amount, reward_id) => async (dispatch) => {
    const payload = {};
    if (donation_amount) payload.donation_amount = donation_amount;
    if (reward_id) payload.reward_id = reward_id;

    const res = await csrfFetch(`/api/backed_projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(updateBackedProjectAction(data));
        return data;
    }
    throw new Error('Failed to update backed project');
};

export const deleteBacking = (backingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/backed_projects/${backingId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(removeBacking(backingId));
        return backingId;
    } else {
        const errorData = await response.json();
        throw errorData;
    }
};

export const backProject = (payload, projectId) => async (dispatch) => {
    const response = await csrfFetch(`/api/projects/${projectId}/back`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        const backedProject = await response.json();
        dispatch(addBacking(backedProject));
        return backedProject;
    } else {
        throw new Error("Failed to back the project.");
    }
};

export default function backedProjectsReducer(state = {}, action) {
    switch (action.type) {
        case SET_BACKED_PROJECTS: {
            const newState = {};
            action.backedProjects.forEach((project) => {
                newState[project.id] = project;
            });
            return { ...state, ...newState };
        }
        case UPDATE_BACKED_PROJECT:
            return { ...state, [action.backedProject.id]: action.backedProject };
        case REMOVE_BACKING: {
            const newState = { ...state };
            delete newState[action.backingId];
            return newState;
        }
        case ADD_BACKING:
            return { ...state, [action.backedProject.id]: action.backedProject };
        default:
            return state;
    }
}
