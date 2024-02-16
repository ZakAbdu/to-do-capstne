
import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import { authenticate } from "./store/session";

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(authenticate()).then(() => setIsLoaded(true));
      }, [dispatch]);

    return (
        <>
            <Navigation></Navigation>
            

            
        </>
    )
}

export default App