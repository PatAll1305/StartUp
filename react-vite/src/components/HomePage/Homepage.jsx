import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../store/projects';
import { useNavigate } from 'react-router-dom';
import { restoreCSRF } from '../../store/csrf';
import './HomePage.css';

export default function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const projects = useSelector(state => Object.values(state.projects));
    const user = useSelector(state => state.session.user);
    user?.id ? null : restoreCSRF()

    const sortedProjects = [...projects].sort((a, b) => a.amount - b.amount);
    const userProjects = user ? sortedProjects.filter(project => project.user_id === user.id) : [];

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    return (
        <div className="homepage">
            {user && (
                <div className="your-projects">
                    <h2>Your Projects</h2>
                    {userProjects.length > 0 ? (
                        <div className="project-grid">
                            {userProjects.map((project) => (
                                <div key={project.id} className="project-card" onClick={() => navigate(`/projects/${project.id}`)}>
                                    <h3>{project.title}</h3>
                                    <p>Amount: ${parseFloat(project.amount).toFixed(2)}</p>
                                </div>))}
                        </div>
                    ) : (
                        <button onClick={() => navigate('/projects/create')}>
                            Create Your First Project!
                        </button>
                    )}
                </div>
            )}

            <div className="all-projects">
                <h2>Projects</h2>
                {Object.entries(
                    sortedProjects.reduce((acc, project) => {
                        // TODO Channge categoryId to Category title
                        if (!acc[project.category_id]) {
                            acc[project.category_id] = [];
                        }
                        acc[project.category_id].push(project);
                        return acc;
                    }, {})
                ).map(([categoryId, projects]) => (
                    <div key={categoryId} className="category-section">
                        <h3>Category {categoryId}</h3>
                        <div className="project-grid">
                            {projects.map((project) => (
                                <div key={project.id} className="project-card" onClick={() => navigate(`/projects/${project.id}`)}>
                                    <h3>{project.title}</h3>
                                    <p>Amount: ${parseFloat(project.amount).toFixed(2)}</p>
                                </div>))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
