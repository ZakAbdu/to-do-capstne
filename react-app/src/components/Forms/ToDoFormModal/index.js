import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { addToDo, getAllToDos } from "../../../store/todo";
import "./ToDoForm.css"

export default function CreateToDo() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { closeModal } = useModal();

    const [name, setName] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [category, setCategory] = useState('')
    const [errors, setErrors] = useState([]);
    const [newToDo, setNewToDo] = useState(null);

    const isImageURL = (url) => {
        return /\.(png|jpe?g)$/i.test(url);
    };

    const isValid = () => {
        return (
            name.trim().length > 0 &&
            email.trim().length > 4 &&
            phoneNumber.trim().length > 6 &&
            address.trim().length > 2 &&
            city.trim().length > 0 &&
            state.trim().length > 0
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = {}

        if (!isImageURL(coverImage)) {
            err.coverImage = 'Please provide a valid image url ending in .png, .jpg, or .jpeg';
        }
        
        if (name.length < 3) err.nameLength = 'To-Do Name must be more than 3 characters.'
        if (phoneNumber.length < 6) err.phoneNumberLength = 'Phone Number must be at least 7 digits.'

        if (Object.values(err).length) return setErrors(err);

        const newTODO = {
            userId: sessionUser.id,
            name,
            cover_image: coverImage,
            email,
            phone_number: phoneNumber,
            address,
            city,
            state,
            category
        };
        dispatch(addToDo(newTODO));
        history.push('/')
        dispatch(getAllToDos())
        closeModal()
    
    }

    useEffect(() => {
        if (newToDo) {
            dispatch(getAllToDos());
        }
    }, [dispatch, newToDo])

  
    return (
            <div className="todo-form-container">
                <h1 className="manage-header">Add a To-Do!</h1>
                <form id="new-todo-form" onSubmit={handleSubmit}>
                    <div className="create-name">
                        <label className="create-label">
                            To-Do Name
                            <input
                                className="create-input"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="create-name">
                        <label className="create-label">
                            Cover Image
                            <input
                                className="create-input"
                                type="text"
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="create-name">
                        <label className="create-label">
                            Email
                            <input
                                className="create-input"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="create-name">
                        <label className="create-label">
                            Phone Number
                            <input
                                className="create-input"
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="create-name">
                        <label className="create-label">
                            Address
                            <input
                                className="create-input"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="create-name">
                            <label className="create-label">
                                City
                                <select
                                    className="create-select"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                >
                                    <option value=''>--Select a City--</option>
                                    <option value='San Diego'>San Diego</option>
                                    <option value='New York'>New York</option>
                                    <option value='Chicago'>Chicago</option>
                                    <option value='Seattle'>Seattle</option>
                                    <option value='Miami'>Miami</option>
                                </select>
                            </label>
                    </div>
                    <div className="create-name">
                        <label className="create-label">
                            State
                            <input
                                className="create-input"
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="ToDo-Category">
                            <label className="ToDo-Category-Create">
                                Category
                                <select
                                    className="create-select"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value=''>--Select a Category--</option>
                                    <option value='To-Do'>To-Do</option>
                                    <option value='To-Eat'>To-Eat</option>
                                    <option value='To-See'>To-See</option>
                                </select>
                            </label>
                        </div>
                        <button className="ToDo-Submit" type="submit" disabled={!isValid()}>Create To-Do!</button>
                </form>
            </div>
    )

}