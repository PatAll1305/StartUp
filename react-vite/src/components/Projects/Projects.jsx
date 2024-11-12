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

    if (!projects.length) return <h1 className='loading'>Loading projects...</h1>;

    return (
        <div className="projects-list">
            <h1 id='projects-list-title'>Projects</h1>
            <ul className='project-item-list'>
                {projects.map((project) => (
                    <div key={project.id} className='project-item' onClick={(e) => {
                        e.preventDefault()
                        navigate(`/projects/${project.id}`)
                    }}>
                        {project.media_url && (
                            <img className='project-media' src={project.media_url} alt={`${project.title} media`} />
                        )}
                        <li >
                            <h4>{project.title}</h4>
                            <p style={{ color: parseFloat(project.goal) - parseFloat(project.amount) > 5000 ? 'red' : parseFloat(project.goal) <= parseFloat(project.amount) ? 'green' : "orange" }}>
                                Goal <br /> ${project.goal.toFixed(2)}</p>
                            <p>Deadline:<br />{new Date(project.deadline).toLocaleDateString()}</p>

                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}