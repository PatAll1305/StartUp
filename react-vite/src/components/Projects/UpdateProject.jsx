import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateProject } from "../../store/projects";

export default function UpdateProject() {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session?.user);
    const project = useSelector((state) => state.projects[projectId]);
    const navigate = useNavigate()

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [goal, setGoal] = useState("");
    const [location, setLocation] = useState("");
    const [mediaUrl, setMediaUrl] = useState("");
    const [deadline, setDeadline] = useState("");
    const [errors, setErrors] = useState("");

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
        const updatedProject = {
            title,
            description,
            goal,
            location,
            media_url: mediaUrl,
            deadline,
        };

        try {
            await dispatch(updateProject(projectId, updatedProject, user.id));
            navigate(`/projects/${projectId}`);
        } catch (err) {
            const error = await err.json();
            setErrors(error.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div>
            {/* TODO Uncomment after completing route testing */}
            {/* {(!user) ? navigate("/login") : null} */}
            {user && project && project.userId === user.id ?
                setTitle(project.title) &&
                setDescription(project.description) &&
                setGoal(project.goal) &&
                setLocation(project.location) &&
                setMediaUrl(project.media_url) &&
                setDeadline(project.deadline) &&
                <div>

                    <h1>Update {title}</h1>
                    <form onSubmit={handleSubmit}>
                        {Object.keys(errors).length ? <p className="error-message">{Object.values(errors)[0]}</p> : null}
                        <label>
                            Title
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </label>

                        <label>
                            Description
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </label>

                        <label>
                            Goal
                            <input type="number" value={goal} onChange={(e) => setGoal(e.target.value)} required />
                        </label>

                        <label>
                            Location
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                        </label>

                        <label>
                            Media URL
                            <input type="url" value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} required />
                        </label>

                        <label>
                            Deadline
                            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                        </label>

                        <button type="submit">Update Project</button>
                    </form>

                </div >
                :
                <h1> 404 Project not Found</h1>
            }
        </div >
    )
}
