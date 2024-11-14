import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../store/projects';
import { useNavigate } from 'react-router-dom';
import './DeleteModal.css';

export default function DeleteProjectModal({ project }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const acceptDelete = async (e) => {
        await e.preventDefault();
        await dispatch(deleteProject(project.id));
        await closeModal();
        await navigate(`/projects`);
    };

    const declineDelete = async (e) => {
        await e.preventDefault();
        await closeModal();
    };

    return (
        <div id='delete-window'>
            <h1>Project to be deleted:</h1>
            <h2>{project.title}</h2>
            <h3>Are you sure you want to delete this Project?</h3>
            <div>
                <button className='confirm' onClick={acceptDelete}>Yes (Delete project)</button>
                <button className='decline' onClick={declineDelete}>No (Return to project page)</button>
            </div>
        </div>
    );
}
