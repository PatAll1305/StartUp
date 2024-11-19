import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { backProject } from "../../store/backedProjects";
import "./ConfirmBackingModal.css";
import { useNavigate } from "react-router-dom";
import { updateProject } from "../../store/projects";

export default function ConfirmBackingModal({ reward, project, donationAmount, userId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleConfirm = async () => {
        if (userId) {
            const payload = {
                user_id: userId,
                reward_id: reward ? reward?.id : null,
                project_id: project?.id ? +project?.id : null,
                donation_amount: reward ? null : Number(donationAmount).toFixed(2)
            };
            dispatch(backProject(payload, project?.id));
            dispatch(updateProject(project?.id, { amount: !reward ? Number(project?.amount + +donationAmount).toFixed(2) : Number(project?.amount + +reward?.pledge).toFixed(2) }, project.user_id))
            navigate(`/user/${userId}/backed-projects`);
            closeModal();
        } else {
            window.alert('Please sign in to donate')
            navigate('/login')
        }
    };

    return (
        <div className="modal-overlay">
            {reward || +donationAmount > 0 ?
                <div className="modal-content">
                    <h3>Confirm Backing</h3>
                    <p>Are you sure you want to back this project and give ${reward ? reward.pledge : donationAmount}?</p>
                    <div className="modal-buttons">
                        <button className="confirm-button" onClick={handleConfirm}>
                            Yes
                        </button>
                        <button className="close-button" onClick={() => closeModal()}>
                            No
                        </button>
                    </div>
                </div>
                :
                <div className="modal-content">
                    <h3 className="error-message">Invalid donation</h3>
                    <p>Please donate an amount greater than 0</p>
                    <button className="close-button" onClick={() => closeModal()}>
                        I promise to be a better person
                    </button>
                </div>
            }
        </div>
    );
}
