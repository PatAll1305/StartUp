import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProject } from '../../store/projects';
import { deleteBacking, fetchBackedProjects, updateBackedProject } from '../../store/backedProjects';

export default function ChangeBacking() {
    const { userId, backedProjectId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const backedProject = useSelector(state => Object.values(state.backedProjects).find(backedProject => +backedProject.id === +backedProjectId));
    const [donationAmount, setDonationAmount] = useState(0);
    const [originalAmount, setOriginalAmount] = useState(backedProject?.donation_amount || 0);
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(fetchBackedProjects())
    }, [dispatch])

    useEffect(() => {
        if (backedProject) {
            setDonationAmount(Number(backedProject.donation_amount).toFixed(2));
            setOriginalAmount(Number(backedProject.donation_amount).toFixed(2));
        }
    }, [backedProject]);

    useEffect(() => {
        let errors = {}
        if (donationAmount < 0) errors.negative = 'Cannot set donation amount to less than 0'
        if (donationAmount === 0) errors.donationAmount = 'BE CAREFUL, SETTING DONATION AMOUNT TO 0 HERE WILL DELETE YOUR BACKING'
        if (String(donationAmount).split(".")[1]?.length > 2) errors.penny = 'You cannot donate less than a penny'
        setErrors({ ...errors })
    }, [donationAmount])


    const handleConfirmChange = async () => {
        const difference = donationAmount - originalAmount;

        if (donationAmount === 0) {
            try {
                dispatch(deleteBacking(backedProjectId))
            } catch {
                window.alert('Something went wrong')
            }
        } else {
            try {
                dispatch(updateBackedProject(backedProjectId, (+backedProject.donation_amount + +difference).toFixed(2)));
                dispatch(updateProject(backedProject.project_id, { amount: backedProject.project.amount + difference }, backedProject.project.user_id));
            } catch {
                window.alert('Something went wrong');
            }
        }
        navigate(`/user/${userId}/backed-projects`);
    };

    return (
        <div className="change-backing-container">
            <h2 onClick={() => navigate(-1)} className="back-button">
                {`< Back`}
            </h2>
            <h1>Change your donation amount</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                {Object.keys(errors).length > 0 && <h2 className='error-message'> {Object.values(errors)[0]} </h2>}
                <label>Donation Amount</label>
                <input
                    type="number"
                    id="donation-amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                />
            </form>
            <div className="button-group">
                <button className="confirm-button" disabled={errors.negative || errors.penny} onClick={handleConfirmChange}>
                    Confirm Change
                </button>
                <button className="cancel-button" onClick={() => navigate(-1)}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
