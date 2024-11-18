import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRewardsThunk } from "../../store/rewards";
import { useParams, useLocation } from "react-router-dom";
import './Rewards.css'
import { fetchOneProject } from "../../store/projects";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ConfirmDeleteReward from "./DeleteReward";
import ConfirmBackingModal from "../ConfirmModals/ConfirmBackingModal";

const Rewards = () => {
    const { projectId } = useParams()
    const dispatch = useDispatch();
    const rewards = useSelector((state) =>
        Object.values(state.rewards).filter((reward) => reward.project_id === Number(projectId)))
    const user = useSelector((state) => (state.session.user))
    const project = useSelector((state) => (state.projects[projectId]))
    const currentOwner = user && user.id === project?.user_id;
    const navigate = useNavigate()
    const location = useLocation()

    const [donationAmount, setDonationAmount] = useState(0)

    useEffect(() => {
        dispatch(getRewardsThunk())
        dispatch(fetchOneProject(+projectId))
    }, [dispatch, projectId])

    return (
        <div className="each-reward">
            {(location.pathname === `/projects/${projectId}/rewards` || location.pathname === `/projects/${projectId}/rewards/`) && (
                <button id='back-button' onClick={() => { navigate(-1) }}> {`< Back`}</button>
            )}
            {rewards.length > 0 ? (
                <>
                    {rewards.map((reward) => (
                        <div className="rewards-content" key={reward.id}>
                            <h1 className="rewards-name">{reward.name}</h1>
                            <h4 className="rewards-desc">{reward.content}</h4>
                            {!currentOwner &&
                                <OpenModalButton
                                    buttonText={`Pledge: ${reward.pledge.toFixed(2)}`}
                                    modalComponent={
                                        < ConfirmBackingModal
                                            project={project}
                                            reward={reward}
                                            userId={user?.id} />} />
                            }
                            {currentOwner && (
                                <>
                                    <h3>Current Pledge: ${reward.pledge.toFixed(2)}</h3>
                                    <div className="reward-edit-delete">
                                        <button
                                            className="update-reward"
                                            onClick={() => { navigate(`/projects/${projectId}/rewards/${reward.id}/edit`) }}>Edit Reward</button
                                        >

                                        <OpenModalButton
                                            className="delete-reward"
                                            buttonText='Delete'
                                            modalComponent={<ConfirmDeleteReward rewardId={reward.id} userId={user?.id} projectId={+projectId} />} itemText={'Delete'} />
                                    </div>
                                </>
                            )}
                        </div>

                    ))}
                    {!currentOwner && (
                        <div
                            className="rewards-content"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                            <input type="number" onChange={(e) => { setDonationAmount(e.target.value) }} placeholder="Choose your donation amount" />
                            <OpenModalButton buttonText={'Donate'} modalComponent={< ConfirmBackingModal project={project} donationAmount={donationAmount} userId={user?.id} />} />
                        </div>
                    )}
                </>
            ) : (
                <>
                    <h1>No rewards available</h1>
                    {!currentOwner && (
                        <div
                            className="rewards-content"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                            <input type="number" onChange={(e) => { setDonationAmount(e.target.value) }} placeholder="Choose your donation amount" />
                            <OpenModalButton buttonText={'Donate'} modalComponent={< ConfirmBackingModal project={project} donationAmount={donationAmount} userId={user?.id} />} />

                        </div>
                    )}
                </>
            )}
            {currentOwner && (
                <button
                    style={{
                        display: 'flex',
                        justifySelf: 'center',
                        alignItems: 'center',
                        height: '60px'
                    }}
                    onClick={() => navigate(`/projects/${projectId}/rewards/create`)}>Create a new reward!
                </button>
            )}
        </div>
    )
}

export default Rewards
