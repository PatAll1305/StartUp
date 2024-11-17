import { useModal } from "../../context/Modal";
import { deleteRewardThunk } from "../../store/rewards";
import { useDispatch } from "react-redux";

const ConfirmDeleteReward = ({ rewardId }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const deleteReview = () => {
        dispatch(deleteRewardThunk( rewardId.rewards ))
        closeModal()
        console.log(rewardId.rewards)
    }

    return (
        <div>
            <h1>Confirm Delete</h1>
            <div>
                <p>Are you sure you want to remove this reward?</p>
            </div>
            <div>
                <button onClick={deleteReview}>yes (Delete Reward)</button>
                <button onClick={closeModal}>No (Keep Reward)</button>
            </div>
        </div>
    )
}

export default ConfirmDeleteReward
