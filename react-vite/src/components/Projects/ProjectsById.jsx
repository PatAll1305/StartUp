import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from "../../store/projects";
import { useParams } from "react-router-dom";
import './Projects.css';

export default function ProjectsById() {
    const { projectId } = useParams();
    const dispatch = useDispatch();

    const project = useSelector(state => state.projects[+projectId] || {});
    // const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch, projectId]);

    return (
        <div id="project-details">
            {project && Object.keys(project).length
                ? (
                    <div>
                        <h1>{project.title}</h1>
                        <p>Description: {project.description}</p>
                        <p>Goal: ${parseFloat(project.goal).toFixed(2)}</p>
                        <p>Location: {project.location}</p>
                        <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                        <p>Backers: {project.backers}</p>
                        {project.media_url && (
                            <img src={project.media_url} alt={`${project.title} media`} />
                        )}
                    </div>
                ) : (
                    <div id="no-project">
                        <h1>Project does not exist</h1>
                    </div>
                )
            }
        </div>
    );
}
