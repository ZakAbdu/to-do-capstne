import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/ToDos/AllToDos";
import ToDoPage from "./components/ToDos/SingleToDo";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      { isLoaded && (
        <div className="appcontainer">
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route exact path="/to-do/:id">
              <ToDoPage />
            </Route>
          </Switch>
        </div>
      )}
    
    </>
  );
}

export default App;
