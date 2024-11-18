import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addRewardThunk } from '../../store/rewards'

const CreateReward = () => {
    const { projectId } = useParams()
    const [ pledge, setPledge ] = useState(0)
    const [ name, setName ] = useState('')
    const [ content, setContent ] = useState('')
    const [ errors, setErrors ] = useState({})
    const [ submitted, setSubmitted ] = useState(false)
    const user = useSelector((state) => state.session.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const errors = {}

        if(Number(pledge) < 1) errors.pledge = 'Pledge is required'
        if(name.length < 3) errors.name = 'Name must be at least 3 characters'
        if(content.length < 30) errors.content = 'Content must be at least 30 characters'

        setErrors(errors)

    }, [pledge, name, content])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        if(Object.values(errors).length) return
        const reward = { pledge, name, content, project_id: projectId }
        await dispatch(addRewardThunk(reward, user.id, projectId))
        navigate(`/projects/${projectId}/rewards`)
    }

    return (

        <div className="create-reward">
        <button id='back-button' style={{width: 'fit-content'}} onClick={() => { navigate(-1) }}> {`< Back`}</button>
            <h1> Create a new Reward </h1>
            <form onSubmit={handleSubmit} className="create-reward-form">
                    {submitted && errors.name && <p className="reward-errors"> {errors.name}</p>}
                <label className="name">
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                    {submitted && errors.pledge && <p className="reward-errors"> {errors.pledge}</p>}
                <label className="pledge">
                    Pledge:
                    <input type="number" value={pledge} onChange={(e) => setPledge(e.target.value)} required />
                </label>
                    {submitted && errors.content && <p className="reward-errors"> {errors.content}</p>}
                <label className="content">
                    Content:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </label>
                <button type="submit">Add Reward!</button>
            </form>
        </div>
    )
}

export default CreateReward
