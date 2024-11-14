import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOneProject, updateProject } from "../../store/projects";
import './Projects.css'

export default function UpdateProject() {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session?.user);
    const project = useSelector((state) => state.projects[+projectId]);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [goal, setGoal] = useState("");
    const [location, setLocation] = useState("");
    const [mediaUrl, setMediaUrl] = useState("");
    const [deadline, setDeadline] = useState("");
    const [errors, setErrors] = useState("");

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        dispatch(fetchOneProject(+projectId));
    }, [dispatch, projectId, user, navigate]);

    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setDescription(project.description);
            setGoal(project.goal);
            setLocation(project.location);
            setMediaUrl(project.media_url);
            setDeadline(new Date(project.deadline).toISOString().split('T')[0]);
        }
    }, [project]);

    useEffect(() => {
        const validationErrors = {};
        if (title.length < 10) validationErrors.title = "Title must contain at least 10 characters";
        if (description.length < 30) validationErrors.description = "Description must contain at least 30 characters";
        if (goal < 1000 || goal > 100000) validationErrors.goal = "Goal cannot be lower than $1000 or greater than $1 Million";
        if (!location.length) validationErrors.location = "Location must be filled in";
        if (!mediaUrl.includes('http://') && !mediaUrl.includes('https://')) validationErrors.mediaUrl = "Media URL must start with 'http' or 'https'";
        if (Date.parse(deadline) <= new Date()) validationErrors.deadline = "Deadline cannot be in the past";

        setErrors(validationErrors);
    }, [title, description, goal, location, mediaUrl, deadline]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProject = {
            title,
            description,
            goal,
            location,
            media_url: mediaUrl,
            deadline: new Date(deadline).toISOString().split('.')[0].split('T').join(' '),
        };

        try {
            await dispatch(updateProject(projectId, updatedProject, user.id));
            navigate(`/projects/${projectId}`);
        } catch (err) {
            const errorData = await err.json();
            setErrors({ message: errorData.message || "An error occurred. Please try again." });
        }
    };

    if (!project) return <h1>404 Project not Found</h1>;

    return (
        <div >
            {user && project.user_id === user.id ? (
                <div className="create-project-container">
                    <h1>Update {title}</h1>
                    <form onSubmit={handleSubmit} className="create-project-form">
                        {Object.keys(errors).length > 0 && (
                            <p className="error-message">{Object.values(errors)[0]}</p>
                        )}
                        <label className={"title" + errors.title ? "-error" : ''}>
                            Title
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </label>

                        <label className={"description" + errors.description ? "-error" : ''}>
                            Description
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </label>

                        <label className={"goal" + errors.goal ? "-error" : ''}>
                            Goal
                            <input type="number" value={goal} onChange={(e) => setGoal(e.target.value)} required />
                        </label>

                        <label className={"location" + errors.location ? "-error" : ''}>
                            Location
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                        </label>

                        <label className={"media-url" + errors.mediaUrl ? "-error" : ''}>
                            Media URL
                            <input type="url" value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} required />
                        </label>

                        <label className={"deadline" + errors.deadline ? "-error" : ''}>
                            Deadline
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                required
                            />
                        </label>

                        <button type="submit">Update Project</button>
                    </form>
                </div>
            ) : (
                <h1>404 Project not Found</h1>
            )}
        </div>
    );
}
