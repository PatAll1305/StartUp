import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchBackedProjects } from '../../store/backedProjects';
import './BackedProjects.css'

const BackedProjects = () => {
    const dispatch = useDispatch();
    const backedProjects = useSelector((state) => state.backedProjects);

    useEffect(() => {
        dispatch(fetchBackedProjects());
    }, [dispatch]);

    if (!backedProjects || Object.keys(backedProjects).length === 0) {
        return <p>No backed projects found.</p>;
    }

    const projectsByCategory = {};

    Object.values(backedProjects).forEach((backedProject) => {
        const category = backedProject.project?.category || 'Uncategorized';
        if (!projectsByCategory[category]) {
            projectsByCategory[category] = [];
        }
        projectsByCategory[category].push(backedProject.project);
    });

    return (
        <div className="backed-projects-container">
            {Object.entries(projectsByCategory).map(([category, projects]) => (
                <div key={category} className="category-section">
                    <h2>{category}</h2>
                    <div className="backed-projects-list">
                        {projects.map((project) => (
                            <div key={project.id} className="backed-project-card">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <p>Goal: ${project.goal}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BackedProjects;
