import { csrfFetch } from "./csrf";

const GET_REWARDS = 'rewards/GET'
const ADD_REWARDS = 'rewards/ADD'
const UPDATE_REWARD = 'rewards/UPDATE'
const DELETE_REWARDS = 'rewards/DELETE'

const getRewards = ( rewards ) => ({
    type: GET_REWARDS,
    rewards
})

const addReward = ( reward ) => {
    return {
        type: ADD_REWARDS,
        reward
    }
}

const updateReward = ( reward ) => {
    return {
        type: UPDATE_REWARD,
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
        const res = await fetch('/api/rewards')
        if(!res.ok) {
            throw new Error('network not responding')
        }

        const rewards = await res.json()
        dispatch(getRewards(rewards))
        return rewards
    } catch(error) {
        console.error('Failed to fetch rewards:', error)
    }
}

export const addRewardThunk = ( payload, userId, projectId ) => async ( dispatch ) => {
    try {
        const res = await csrfFetch('/api/rewards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userId': userId,
                'projectId': projectId
            },
            body: JSON.stringify(payload)
        })
        const newReward = await res.json()
        dispatch(addReward(newReward))
        return newReward
    } catch(error) {
        console.error('Failed to add reward:', error)
    }
}

export const updateRewardThunk = ( payload, userId, projectId, rewardId ) => async ( dispatch ) => {
    const res = await csrfFetch(`/api/rewards/${rewardId}`, {
        method: 'PUT',
        body: JSON.stringify( payload ),
        headers: {
            'userId': userId,
            'projectId': projectId
         }
    })
    const editReward = await res.json()
    dispatch(updateReward(editReward))
    return editReward
}

export const deleteRewardThunk = ( rewardId, userId, projectId ) => async ( dispatch ) => {
    const res = await csrfFetch(`/api/rewards/${rewardId}`, {
        method: 'DELETE',
        headers: {
            'userId': userId,
            'projectId': projectId
        }
    })
    if(res.ok) {
        const deletedReward = await res.json()
        dispatch(deleteReward(rewardId))
        return deletedReward
    } else {
        const error = await res.json()
        return error
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
        case UPDATE_REWARD: {
            const updatedReward = action.reward;
            return {
                ...state,
                [updatedReward.id]: updateReward
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
