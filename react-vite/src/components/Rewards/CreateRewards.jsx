// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addRewardThunk } from '../../store/rewards'

// const CreateReward = () => {
//     const [ pledge, setPledge ] = useState(0)
//     const [ name, setName ] = useState('')
//     const [ content, setContent ] = useState('')
//     const [ errors, setErrors ] = ({})
//     // const [ submitted, setSubmitted ] = useState(false)
//     const project = useSelector(state=> state.session.project)

//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     useEffect(() => {
//         const errors = {}

//         if(pledge < 0) errors.pledge = 'Pledge is required'
//         if(name.length < 0) errors.name = 'Name is required'
//         if(content.length < 30) errors.name = 'Content must be at least 30 characters'

//         setErrors(errors)
//     }, [pledge, name, content])

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         setSubmitted(true)
//         if(Object.values(errors).length) return
//         const reward = { pledge, name, content }
//         await dispatch(addRewardThunk(reward))
//         navigate(`/projects/${project.id}`)
//     }

//     useEffect(() => {
//         return() => {
//             setPledge(0)
//             setName('')
//             setContent('')
//         }
//     }, [])

//     return (
//         <div className="">

//         </div>
//     )
// }

// export default CreateReward
