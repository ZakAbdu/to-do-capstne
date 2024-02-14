import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import { Route, Switch } from "react-router-dom";

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch()
    }, [dispatch]);

    return (
        <>
            
        </>
    )
}