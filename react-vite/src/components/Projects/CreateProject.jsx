import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../store/projects';
import './Projects.css';

export default function CreateProject() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState('');
    const [location, setLocation] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [deadline, setDeadline] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const errors = {}

        title.length < 10 ? errors.title = "Title must contain at least 10 characters" : null
        description.length < 30 ? errors.description = "Description must contain at least 30 characters" : null
        goal < 1000 || goal > 100000 ? errors.goal = "Goal cannot be lower than $1000 USD or greater than $1 Million USD" : null
        !location.length ? errors.location = "location must be filled in" : null
        !mediaUrl.includes('http://') && !mediaUrl.includes('https://') ? errors.mediaUrl = "Media URL must contain the 'http' or 'https' at the beginning of the URL" : null
        Date.parse(deadline) <= new Date ? errors.deadline = "Deadline cannot be before or on today's date" : null

        if (Object.keys(errors).length) {
            setErrors({ ...errors })
        } else {
            setErrors({})
        }
    }, [title.length, description.length, goal, location.length, mediaUrl, deadline])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            goal,
            location,
            media_url: mediaUrl,
            deadline,
            user_id: user.id,
        };

        try {
            await dispatch(createProject(payload));
            navigate('/projects');
        } catch (err) {
            const errorMessage = await err.json();
            setErrors(errorMessage.error || 'Something went wrong.');
        }
    };

    return (
        <div className="create-project-container">
            {/* TODO Uncomment after completing route testing */}
            {/* {(!user) ? navigate("/login") : null} */}
            <h1>Start a new Project!</h1>
            {Object.keys(errors).length ? <p className="error-message">{Object.values(errors)[0]}</p> : null}
            <form onSubmit={handleSubmit} className="create-project-form">
                <label className={"title" + errors.title ? "-error" : ''}>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label className={"description" + errors.description ? "-error" : ''}>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label className={"goal" + errors.goal ? "-error" : ''}>
                    Goal (USD):
                    <input
                        type="number"
                        step="0.01"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        required
                    />
                </label>
                <label className={"location" + errors.location ? "-error" : ''}>
                    Location:
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </label>
                <label className={"media-url" + errors.mediaUrl ? "-error" : ''}>
                    Media URL:
                    <input
                        type="url"
                        value={mediaUrl}
                        onChange={(e) => setMediaUrl(e.target.value)}
                        placeholder='Be sure to include the "https://" in your url!'
                        required
                    />
                </label>
                <label className={"deadline" + errors.deadline ? "-error" : ''}>
                    Deadline:
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                </label>
                <button disabled={Object.keys(errors).length} type="submit">Create Project</button>
            </form>
        </div>
    );
}
