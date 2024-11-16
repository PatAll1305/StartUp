import { deleteBacking } from '../../store/backedProjects';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import "./DeleteModal.css"

export default function ConfirmCancelBackingModal({ backingId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleConfirmCancel = async () => {
        try {
            dispatch(deleteBacking(backingId));
            closeModal();
        } catch (error) {
            window.alert("Something went wrong");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Confirm Cancel Backing</h3>
                <p>Are you sure you want to cancel your backing for this project?</p>
                <div className="modal-buttons">
                    <button className="confirm-button" onClick={handleConfirmCancel}>
                        Yes, Cancel
                    </button>
                    <button className="close-button" onClick={e => {
                        e.preventDefault();
                        closeModal();
                    }}>
                        No, Close
                    </button>
                </div>
            </div>
        </div>
    );
}
