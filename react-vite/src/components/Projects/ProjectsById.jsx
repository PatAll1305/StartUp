import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneProject } from '../../store/projects';
import { useParams, useNavigate } from 'react-router-dom';
import { DeleteProjectModal } from '../DeleteModals/index';
import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
import { ProjectsByCategory } from './index.js';
import './Projects.css';
import { getCategoriesThunk } from '../../store/categories.js';
import { getRewardsThunk } from '../../store/rewards.js';
import Rewards from '../Rewards/Rewards.jsx';

export default function ProjectsById() {
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const project = useSelector(state => state.projects[+projectId]);
    const user = useSelector(state => state.session.user);
    const category = useSelector(state => state.categories[project?.category_id]);
    const rewards = useSelector((state) => (Object.values(state.rewards).filter(reward => reward.project_id === project.id)));
    
    useEffect(() => {
        dispatch(fetchOneProject(+projectId));
        dispatch(getCategoriesThunk())
        dispatch(getRewardsThunk())
    }, [dispatch, projectId]);

    if (!project) return <h1 className='loading'>Loading...</h1>;

    const isOwner = user && user.id === project.user_id;

    return (
        <div className="project-page">
            <h2 id='back-button' onClick={() => { navigate(-1) }}> {`< Back`}</h2>
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
                    <p>Backers: {/*TODO get backed_projects and add count for all with this project id */}</p>
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
                {isOwner ? (
                    <div className='manipulation-buttons'>
                        <OpenModalButton
                            buttonText="Delete Project"
                            modalComponent={<DeleteProjectModal project={project} />}
                            className='delete-project'
                        />
                        <button className='update-project' onClick={() => { navigate(`/projects/${projectId}/update`) }}> Update Project</button>
                        <button className='update-rewards' onClick={() => { navigate(`/projects/${projectId}/rewards`) }}> Update Rewards</button>
                    </div>
                )
                    :
                    (<button onClick={(e) => {
                        e.preventDefault();
                        navigate(`/projects/${projectId}/rewards`);
                    }} className="back-project-button">
                        Back this Project
                    </button>)}
            </div>
            {rewards && <h2>Rewards for this Project:</h2>}
            <Rewards />
            <h3>Other {category?.title} Projects</h3>
            <ProjectsByCategory categoryId={project.category_id} />
        </div>
    );
}
