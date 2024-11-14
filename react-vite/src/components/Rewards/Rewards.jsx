import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRewardsThunk } from "../../store/rewards";
import { useParams } from "react-router-dom";
import './Rewards.css'
// import { useNavigate } from "react-router-dom";

const Rewards = () => {
    const { projectId } = useParams()
    const dispatch = useDispatch();
    const rewards = useSelector((state) =>
        Object.values(state.rewards).filter((reward) => reward.project_id === Number(projectId)))
    console.log(projectId)

    useEffect(() => {
        dispatch(getRewardsThunk())
    }, [dispatch])

    return (
        <div className="rewards">
            {rewards.length > 0 ? (
                rewards.map((reward) => (
                <div key={reward.id}>
                    <p>{reward.content}</p>
                    <button>Pledge: ${reward.pledge}</button>
                </div>
            ))
        ) : (
            <h1>No rewards available</h1>
        )}
        </div>
    )
}

export default Rewards
