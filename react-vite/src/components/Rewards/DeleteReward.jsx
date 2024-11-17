import { useModal } from "../../context/Modal";
import { deleteRewardThunk } from "../../store/rewards";
import { useDispatch } from "react-redux";

const ConfirmDeleteReward = ({ rewardId, userId, projectId }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const deleteReward = async () => {
        await dispatch(deleteRewardThunk( rewardId, userId, projectId ))
        closeModal()
        console.log(projectId)
    }

    return (
        <div>
            <h1>Confirm Delete</h1>
            <div>
                <p>Are you sure you want to remove this reward?</p>
            </div>
            <div>
                <button onClick={deleteReward}>yes (Delete Reward)</button>
                <button onClick={closeModal}>No (Keep Reward)</button>
            </div>
        </div>
    )
}

export default ConfirmDeleteReward
