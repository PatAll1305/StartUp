import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../store/projects';
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal.jsx';
import { DeleteProjectModal } from '../DeleteModals/index';
import './Projects.css';

export default function ProjectsById() {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { openModal } = useModal();

    const project = useSelector(state => state.projects[projectId]);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch, projectId]);

    if (!project) return <h1 className='loading'>Loading...</h1>;

    const isOwner = user && user.id === project.user_id;

    return (
        <div className="project-page">
            {/* TODO Add category tag after Categories are created */}
            {/* <p className="project-category">Category: {project.category_id}</p> */}
            <div className="project-header">
                <h1>{project.title}</h1>
                <div className="project-info">
                    <p>{project.description}</p>
                </div>
            </div>
            <div className="project-content">
                <img src={project.media_url} alt={project.title} className="project-image" />
                <div className="project-details">
                    <p>Location: {project.location}</p>
                    <p>About the Project: {project.body}</p>
                    <p>Backers: {project.backers}</p>
                    <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="project-backing">
                <div className="funding-info">
                    <div className='project-funding'>
                        <p>${parseFloat(project.amount).toFixed(2)}</p>
                        <p> Raised towards the ${parseFloat(project.goal).toFixed(2)} goal</p>
                    </div>
                </div>
                <button onClick={(e) => {
                    e.preventDefault();
                    navigate(`/projects/${projectId}/backing`);
                }} className="back-project-button">
                    Back this Project
                </button>
                {isOwner && (
                    <button
                        onClick={() => openModal(<DeleteProjectModal project={project} />)}
                        className="delete-project-button"
                    >
                        Delete Project
                    </button>
                )}
            </div>
        </div>
    );
}
