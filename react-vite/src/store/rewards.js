import { csrfFetch } from "./csrf";

const GET_REWARDS = 'rewards/GET'
const ADD_REWARDS = 'rewards/ADD'
const DELETE_REWARDS = 'rewards/DELETE'

const getRewards = ( rewards ) => {
    return {
        type: GET_REWARDS,
        rewards
    }
}

const addReward = ( reward ) => {
    return {
        type: ADD_REWARDS,
        reward
    }
}

const deleteReward = ( rewardId ) => {
    return {
        type: DELETE_REWARDS,
        rewardId
    }
}

export const getRewardsThunk = () => async ( dispatch ) => {
    try {
        const res = await csrfFetch('/api/rewards')

        const rewards = await res.json()
        dispatch(getRewards(rewards))
        return rewards
    } catch(error) {
        console.error('Failed to fetch rewards:', error)
    }
}

export const addRewardThunk = ( payload ) => async ( dispatch ) => {
    try {
        const { project_id, pledge, name, content } = payload

        const res = await csrfFetch('/api/rewards', {
            method: 'POST',
            body: JSON.stringify({ project_id, pledge, name, content })
        })
        const newReward = await res.json()
        dispatch(addReward(newReward))
        return newReward
    } catch(error) {
        console.error('Failed to add reward:', error)
    }
}

export const deleteRewardThunk = ( rewardId ) => async ( dispatch ) => {
    try {
        await csrfFetch(`/api/rewards/${rewardId}`, {
            method: 'DELETE'
        })
        dispatch(deleteReward(rewardId))
        return rewardId
    } catch(error) {
        console.error('Failed to delete reward:', error)
    }
}

export default function rewardReducer( state = {}, action ) {
    switch (action.type) {
        case GET_REWARDS: {
            const newState = {}
            action.rewards.forEach((reward) => {
                newState[reward.id] = reward
            })
            return newState
        }
        case ADD_REWARDS: {
            return {
                ...state,
                [action.reward.id]: action.reward
            }
        }
        case DELETE_REWARDS: {
            const newState = {...state}
            delete newState[action.rewardId]
            return newState
        }
        default:
            return state;
    }
}
