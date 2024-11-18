import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getRewardsThunk, updateRewardThunk } from '../../store/rewards'

const EditReward = () => {
    const { projectId, rewardId } = useParams()
    const [ pledge, setPledge ] = useState(0)
    const [ name, setName ] = useState('')
    const [ content, setContent ] = useState('')
    const [ errors, setErrors ] = useState({})
    const [ submitted, setSubmitted ] = useState(false)
    const user = useSelector((state) => state.session.user)
    const reward = useSelector((state) =>
        Object.values(state.rewards).filter((reward) => reward.id === Number(rewardId)))

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getRewardsThunk())
    }, [dispatch])

    useEffect(() => {
        const errors = {}

        if(Number(pledge) < 1) errors.pledge = 'Pledge is required'
        if(name?.length < 3) errors.name = 'Name must be at least 3 characters'
        if(content?.length < 30) errors.content = 'Content must be at least 30 characters'

        setErrors(errors)

    }, [pledge, name, content])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        if(Object.values(errors)?.length) return
        const reward = { pledge, name, content, project_id: projectId }
        await dispatch(updateRewardThunk(reward, user.id, projectId, rewardId))
        navigate(`/projects/${projectId}/rewards`)
    }

    useEffect(() => {
        if(reward[0]) {
            setPledge(reward[0]?.pledge)
            setName(reward[0]?.name)
            setContent(reward[0]?.content)
        }
    }, [])


    return (
        <div className="create-reward">
            <h1> Edit your Reward </h1>
            <form onSubmit={handleSubmit} className="create-reward-form">
                    {submitted && errors.name && <p className="reward-errors"> {errors.name}</p>}
                <label className="name">
                    Name:
                    <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} required />
                </label>
                    {submitted && errors.pledge && <p className="reward-errors"> {errors.pledge}</p>}
                <label className="pledge">
                    Pledge:
                    <input type="number" value={pledge} onChange={(e) => {setPledge(e.target.value)}} required />
                </label>
                    {submitted && errors.content && <p className="reward-errors"> {errors.content}</p>}
                <label className="content">
                    Content:
                    <textarea value={content} onChange={(e) => {setContent(e.target.value)}} required />
                </label>
                <button type="submit">Save Reward!</button>
            </form>
        </div>
    )
}

export default EditReward
