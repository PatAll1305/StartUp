import { csrfFetch } from './csrf';

const SET_BACKED_PROJECTS = 'backedProjects/SET';

const setBackedProjects = (backedProjects) => ({
    type: SET_BACKED_PROJECTS,
    backedProjects,
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

export default function backedProjectsReducer(state = {}, action) {
    switch (action.type) {
        case SET_BACKED_PROJECTS:
            return { ...state, ...action.backedProjects };
        default:
            return state;
    }
}
