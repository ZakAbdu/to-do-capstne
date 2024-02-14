import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { signUp } from "../../../store/session";
import "./SignUpForm.css"

export default function SignUpFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const {closeModal} = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let err = {}

        if (password.length >= 20) err.maxPassword = "Password must be less than 20 characters";
		if (password.length < 6) err.password = "Password must be at least 6 characters";
		if (password !== confirmPassword) err.match = "Passwords must match";

        if (Object.values(err).length) return setErrors(err);

        if (password === confirmPassword) {
            const data = await dispatch(signUp(firstName, lastName, email, password))
            if (data) {
                let dataErrs = {};
                if (data.some(err => err.includes('email'))) dataErrs.email = "Email address is already in use"
				setErrors(dataErrs);
            } else {
                closeModal();
            }
        } else {
            setErrors([
                "Password field and Confirm Password field must match"
            ])
        }
    }

    const [showModal, setShowModal] = useState(true)

    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <>
        {showModal && (
            <div className="SignUp-Wrapper">
                <i className="fa-solid fa-xmark" onClick={() => handleCloseModal()} id="x" />
                <h1 className="SignUp-Title">Sign Up</h1>
                <form className="SignUp-Form" onSubmit={handleSubmit}>
                    <div className="SignUp-Errors">
                        {Object.values(errors).map((error, idx) => (
                            <p className="SignUp-Error" key={idx}>{`* ${error}`}</p>
                        ))}
                    </div>
                    <label className="SignUp-Form-Top-Text">
                        First Name:
                        <input
                            id="form-input"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </label>
                    <label className="SignUp-Form-Top-Text">
                        Last Name:
                        <input
                            id="form-input"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </label>
                    <label className="SignUp-Form-Top-Text">
                        Email:
                        <input
                            id="form-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label className="SignUp-Form-Top-Text">
                        Password:
                        <input
                            id="form-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label className="SignUp-Form-Top-Text">
                        Confirm Password:
                        <input
                            id="form-input"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                    <div className="SignUp-Buttons-Div">
                        <button className="SignUp-Button" type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        )}
        </>
    )
}