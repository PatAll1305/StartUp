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
    console.log(user.id)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const errors = {}

        if(pledge < 0) errors.pledge = 'Pledge is required'
        if(name.length < 0) errors.name = 'Name is required'
        if(content.length < 30) errors.name = 'Content must be at least 30 characters'

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
            <h1> Create a new Reward </h1>
            <form onSubmit={handleSubmit} className="create-reward-form">
                <label className="name">
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    {submitted && errors.name && <p> {errors.name}</p>}
                </label>
                <label className="pledge">
                    Pledge:
                    <input type="number" value={pledge} onChange={(e) => setPledge(e.target.value)} required />
                    {submitted && errors.number && <p> {errors.number}</p>}
                </label>
                <label className="content">
                    Content:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                    {submitted && errors.submitted && <p> {errors.content}</p>}
                </label>
                <button type="submit">Add Reward!</button>
            </form>
        </div>
    )
}

export default CreateReward
