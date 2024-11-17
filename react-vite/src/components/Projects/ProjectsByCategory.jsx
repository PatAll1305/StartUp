import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../../store/projects';
import { useNavigate, useParams } from 'react-router-dom';
import './Projects.css';

const GetCategoryId = () => {
    let { categoryId } = useParams()
    return categoryId
}

export default function ProjectsByCategory({ categoryId }) {
    if (!categoryId) categoryId = GetCategoryId()
    const dispatch = useDispatch();
    const projects = useSelector((state) => Object.values(state.projects));
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const filteredProjects = projects.filter(project => project.category_id === categoryId);

    if (!filteredProjects.length) return <h3 className='loading'>No projects available in this category.</h3>;

    return (
        <div className="projects-list">
            <ul className='project-item-list'>
                {filteredProjects.map((project) => (
                    <div key={project.id} className='project-item' onClick={() => navigate(`/projects/${project.id}`)}>
                        {project.media_url && (
                            <img className='project-media' src={project.media_url} alt={`${project.title} media`} />
                        )}
                        <li>
                            <h4>{project.title}</h4>
                            <p style={{ color: parseFloat(project.goal) - parseFloat(project.amount) > 5000 ? 'red' : parseFloat(project.goal) <= parseFloat(project.amount) ? 'green' : "orange" }}>
                                Goal <br /> ${project.goal.toFixed(2)}
                            </p>
                            <p>Deadline:<br />{new Date(project.deadline).toLocaleDateString()}</p>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}
