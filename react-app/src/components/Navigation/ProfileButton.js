import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../store/session";

export default function ProfileButton({ user }) {

    const dispatch = useDispatch();
    const history = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };
    
    useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = (e) => {
          if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };
    
        document.addEventListener("click", closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

      const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        return history.push('/browse');
      };

      const ulClassName = "Menu" + (showMenu ? "" : " hidden");
      const closeMenu = () => setShowMenu(false);

      return (
        <>
            <div className="Menu-Button-Wrap">
                <i className="fa-solid fa-bars" id="burger" onClick={openMenu} />
            </div>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <div className="Menu-Buttons">
                            <div className="Menu-Welcome">Welcome {user.first_name}!</div>
                            <NavLink to='/favorites' style={{ textDecoration: 'none' }} className='Menu-myToDo'>My To-Do List
                                <i className="" id="notebook" />
                            </NavLink>
                            <div className="Menu-Upload">
                                
                            </div>
                            <div className="Menu-Logout" onClick={handleLogout}>
                                Log Out
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="Menu-Welcome">Welcome!</div>
                        <div className="Menu-Login">

                        </div>
                        <div className="Menu-SignUp">

                        </div>
                    </>
                )}
            </ul>
        </>
      )
}