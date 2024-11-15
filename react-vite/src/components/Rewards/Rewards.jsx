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

    useEffect(() => {
        dispatch(getRewardsThunk())
    }, [dispatch])

    return (
        <div className="each-reward">
            {rewards.length > 0 ? (
                <>
                {rewards.map((reward) => (
                <div className="rewards-content" key={reward.id}>
                    <h4 className="rewards-desc">{reward.content}</h4>
                    <button>Pledge: ${reward.pledge}</button>
                </div>
            ))}
            <div
                className="rewards-content"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                <input type="number" placeholder="Choose your donation amount"/>
                <button>Donate</button>
            </div>

                </>
        ) : (
            <h1>No rewards available</h1>
        )}
        </div>
    )
}

export default Rewards
