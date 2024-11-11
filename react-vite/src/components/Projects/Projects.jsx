import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../../store/projects';
import { useNavigate } from 'react-router-dom';
import './Projects.css'

export default function Projects() {
    const dispatch = useDispatch();
    const projects = useSelector((state) => Object.values(state.projects));
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    if (!projects.length) return <p>Loading projects...</p>;

    return (
        <div className="projects-list">
            <h1>Projects</h1>
            <ul className='project-item-list'>
                {projects.map((project) => (
                    <li key={project.id} className="project-item" onClick={(e) => {
                        e.preventDefault()
                        navigate(`/projects/${project.id}`)
                    }}>
                        <h2>{project.title}</h2>
                        <p>Description: {project.description}</p>
                        <p>Goal: ${project.goal.toFixed(2)}</p>
                        <p>Location: {project.location}</p>
                        <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                        <p>Backers: {project.backers}</p>
                        {project.media_url && (
                            <img src={project.media_url} alt={`${project.title} media`} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}