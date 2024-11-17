import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRewardsThunk } from "../../store/rewards";
import { useParams } from "react-router-dom";
import './Rewards.css'
import { fetchOneProject } from "../../store/projects";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ConfirmDeleteReward from "./DeleteReward";

const Rewards = () => {
    const { projectId } = useParams()
    const dispatch = useDispatch();
    const rewards = useSelector((state) =>
        Object.values(state.rewards).filter((reward) => reward.project_id === Number(projectId)))
    const user = useSelector((state) => (state.session.user))
    const project = useSelector((state) => state.projects[+projectId]?.user_id)
    const currentOwner = user && user.id === project;
    // const thisProject = useSelector((state) => state.projects[+projectId]?.id)
    const navigate = useNavigate()
    const thisReward = useSelector(state => (state.projects[projectId]))
    // console.log(thisProject)

    useEffect(() => {
        dispatch(getRewardsThunk())
        dispatch(fetchOneProject(+projectId))
    }, [dispatch, projectId])

    return (
        <div className="each-reward">
             <button id='back-button' onClick={() => { navigate(`/projects/${project.id}`) }}> {`< Back`}</button>
            {rewards.length > 0 ? (
                <>
                {rewards.map((reward) => (
                <div className="rewards-content" key={reward.id}>
                    <h1 className="rewards-name">{reward.name}</h1>
                    <h4 className="rewards-desc">{reward.content}</h4>
                    {!currentOwner && <button>Pledge: ${reward.pledge.toFixed(2)}</button>}
                    {currentOwner && (
                        <>
                        <h3>Current Pledge: ${reward.pledge.toFixed(2)}</h3>
                        <div className="reward-edit-delete">
                            <button className="update-reward" onClick={() => {navigate(`/projects/${projectId}/rewards/${reward.id}/edit`)}}>Edit Reward</button>
                            <button
                            className="delete-reward"
                            ><OpenModalButton
                            modalComponent={<ConfirmDeleteReward rewardId={thisReward} />} itemText={'Delete'} />Delete</button>
                        </div>
                        </>
                    )}
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
            <>
                <h1>No rewards available</h1>
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
        )}
        <button style={{
            display: 'flex',
            justifySelf: 'center',
            alignItems: 'center',
            height: '60px'}}onClick={() => navigate(`/projects/${projectId}/rewards/create`)}>Create a new reward!</button>
        </div>
    )
}

export default Rewards
