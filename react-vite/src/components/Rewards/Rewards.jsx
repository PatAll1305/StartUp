import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRewardsThunk } from "../../store/rewards";
// import { useNavigate } from "react-router-dom";

const Rewards = () => {
    const dispatch = useDispatch();
    const rewards = useSelector(state => state.reward)
    // const state = useSelector(state)
    // const navigate = useNavigate()
    // console.log(state => state)

    useEffect(() => {
        dispatch(getRewardsThunk())
    }, [dispatch])

    return (
        <div className="rewards">
            {rewards.map((reward) => (
                <div key={reward.id}>
                </div>
            ))}
        </div>
    )
}

export default Rewards
