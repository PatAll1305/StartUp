import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchBackedProjects } from '../../store/backedProjects';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmCancelBackingModal } from '../DeleteModals';
import './BackedProjects.css'
import OpenModalButton from '../OpenModalButton/OpenModalButton';

export default function BackedProjects() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const backedProjects = useSelector((state) => state.backedProjects);
    const navigate = useNavigate();

    const handleChangePledgeClick = (id) => {
        navigate(`/user/${userId}/backed/${id}`);
    };

    useEffect(() => {
        dispatch(fetchBackedProjects());
    }, [dispatch]);

    if (!backedProjects || Object.keys(backedProjects).length === 0) {
        return (
            <>
                <h1 onClick={() => navigate(-1)} id='back-button' style={{ color: 'white' }}> {'< Back'}</h1 >
                <h1 className='loading'>No backed projects found.</h1>
            </>
        )
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
            <h2 onClick={() => navigate(-1)} id="back-button">{`< Back`}</h2>
            {Object.entries(
                Object.values(backedProjects).reduce((acc, backing) => {
                    const category = backing.project?.category || "Uncategorized";
                    if (!acc[category]) acc[category] = [];
                    acc[category].push(backing);
                    return acc;
                }, {})
            ).map(([category, backings]) => (
                <div key={category} className="category-section">
                    <h2>{category}</h2>
                    <div className="backed-projects-list">
                        {backings.map((backing) => {
                            const project = backing.project;
                            return (
                                <div key={backing.id} className="backed-project-card">
                                    <h3 onClick={() => navigate(`/projects/${project?.id}`)}>{project?.title}</h3>
                                    <p onClick={() => navigate(`/projects/${project?.id}`)}>{project?.description}</p>
                                    <p onClick={() => navigate(`/projects/${project?.id}`)}>Currently at: ${Number(project?.amount).toFixed(2)}</p>
                                    <p onClick={() => navigate(`/projects/${project?.id}`)}>You donated: ${Number(backing?.donation_amount).toFixed(2)} on {String(backing?.created_at).split(' ', 3).join(' ')}</p>
                                    <button
                                        className="change-pledge-button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleChangePledgeClick(backing.id);
                                        }}
                                    >
                                        Change Pledge
                                    </button>
                                    <OpenModalButton
                                        buttonText="Cancel Backing"
                                        modalComponent={
                                            <ConfirmCancelBackingModal backing={backing} />
                                        }
                                        className="cancel-backing-button"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
