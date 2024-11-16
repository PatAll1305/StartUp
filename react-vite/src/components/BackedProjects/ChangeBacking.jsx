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
        if (backedProject) {
            setDonationAmount(backedProject.donation_amount);
            setOriginalAmount(backedProject.donation_amount);
        }
    }, [backedProject]);

    useEffect(() => {
        let errors = {}
        if (donationAmount === 0) errors.donationAmount = 'BE CAREFUL, SETTING DONATION AMOUNT TO 0 HERE WILL DELETE YOUR BACKING'
        setErrors({ ...errors })
    }, [donationAmount])

    useEffect(() => {
        dispatch(fetchBackedProjects())
    }, [dispatch])

    const handleConfirmChange = async () => {
        const difference = donationAmount - originalAmount;

        if (donationAmount === 0) {
            try {
                dispatch(deleteBacking(backedProjectId))
            } catch {
                window.alert('Something went wrong')
            }
        }

        try {
            dispatch(updateBackedProject(backedProjectId, difference));
            dispatch(updateProject(backedProject.project_id, { amount: backedProject.project.amount + difference }, userId));
        } catch {
            window.alert('Something went wrong');
        }

        navigate(-1);
    };

    return (
        <div className="change-backing-container">
            <h2 onClick={() => navigate(-1)} className="back-button">
                {`< Back`}
            </h2>
            <h1>Change your donation amount</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                {Object.keys(errors).length > 0 && <h2 className='error-message'> {errors.donationAmount} </h2>}
                <label>Donation Amount</label>
                <input
                    type="number"
                    id="donation-amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                />
            </form>
            <div className="button-group">
                <button className="confirm-button" onClick={handleConfirmChange}>
                    Confirm Change
                </button>
                <button className="cancel-button" onClick={() => navigate(-1)}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
