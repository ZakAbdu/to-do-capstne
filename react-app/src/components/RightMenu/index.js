import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../Forms/LoginFormModal";
import SignUpFormModal from "../Forms/SignUpFormModal";
import CreateToDo from "../Forms/ToDoFormModal";

import { logout, login } from "../../store/session";
import "./RightMenu.css"

export default function RightSideMenu() {
    const ref = useRef();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    useEffect(() => {
        // Exit early if the menu is not shown
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ref.current.contains(e.target)) {
                setShowMenu(false)
            }
        };
        
        // Add a click event listener to the document to close the menu
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu])

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        toggleMenu()
        return history.push('/browse')
    }

    const demoUser = () => {
        dispatch(login('demo@aa.io', 'password'));
        toggleMenu();
        console.log('heyyyyyy')
        return;
    }

    return (
        <div>
            {user ? (
                <div className={`burger fa-solid fa-bars ${showMenu ? 'open' : ''}`} onClick={toggleMenu}></div>)
                :
                <div className={`fa-solid fa-user-plus ${showMenu ? 'open' : ''}`} onClick={toggleMenu}>
                    <p className="LoginButton">Sign In</p>
                </div>
            }
            <div className={`rightside-menu-container ${showMenu ? 'open' : ''}`} ref={ref}>
                {user ?
                    <ul className="RightMenu-LoggedIn">
                        <p className="Welcome">{`Welcome ${user.firstName}`}</p>

                        <OpenModalMenuItem
                            itemText='Create To-Do'
                            onItemClick={toggleMenu}
                            modalComponent={<CreateToDo />}
                            className='RM-Label'
                        />

                        <p className="RM-Logout" onClick={((e) => {handleLogout(e)})}>Log Out</p>
                    </ul>
                    :
                    <ul className="RightMenu-LoggedOut">
                        <p className="Welcome">{'Welcome'}</p>

                        <OpenModalMenuItem
                            itemText='Login'
                            onItemClick={toggleMenu}
                            modalComponent={<LoginFormModal />}
                            className='RM-Label'
                        />

                        <OpenModalMenuItem
                            itemText='Sign Up'
                            onItemClick={toggleMenu}
                            modalComponent={<SignUpFormModal />}
                            className='RM-Label'
                        />

                        <p className="RM-Demo" onClick={((e) => demoUser(e))}>Demo User Login</p>
                    </ul>
                }
            </div>
            <div className={`menu-overlay ${showMenu ? 'open' : ''}`} onClick={toggleMenu}></div>
        </div>
    );
};