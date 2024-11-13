import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../store/projects';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const projects = useSelector(state => Object.values(state.projects));
    const user = useSelector(state => state.session.user);

    const userProjects = projects.filter(project => project.user_id === user?.id);
    const sortedProjects = projects.sort((a, b) => a.amount - b.amount);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const renderProject = (project) => (
        <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>Amount: ${parseFloat(project.amount).toFixed(2)}</p>
        </div>
    );

    return (
        <div className="homepage">
            {user && (
                <div className="your-projects">
                    <h2>Your Projects</h2>
                    {userProjects.length ? (
                        <div className="project-grid">
                            {userProjects.map(renderProject)}
                        </div>
                    ) : (
                        <button onClick={() => navigate('/projects/create')}>
                            Create Your First Project!
                        </button>
                    )}
                </div>
            )}

            <div className="all-projects">
                <h2>All Projects by Category</h2>
                {Object.entries(
                    sortedProjects.reduce((acc, project) => {
                        if (!acc[project.category_id]) {
                            acc[project.category_id] = [];
                        }
                        acc[project.category_id].push(project);
                        return acc;
                    }, {})
                    // TODO Channge categoryId to Category title
                ).map(([categoryId, projects]) => (
                    <div key={categoryId} className="category-section">
                        <h3>Category {categoryId}</h3>
                        <div className="project-grid">
                            {projects.map(project => (
                                <div key={project.id} onClick={() => navigate(`/projects/${project.id}`)}>
                                    {renderProject(project)}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
