import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllToDos } from "../../store/todo";
import { useLocation, Link } from "react-router";

import "./HomePage.css"

const HomePage = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("type")
    const city = queryParams.get('city')

    const allToDos = useSelector(state => state.todos)
    const todoValues = Object.values(allToDos)

    function shuffle(todoValues) {
        let currentIndex = todoValues.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = todoValues[currentIndex]
            todoValues[currentIndex] = todoValues[randomIndex];
            todoValues[randomIndex] = temporaryValue;
        }
        return todoValues
    }

    const shuffledToDos = shuffle(todoValues)
    const selectedToDos = shuffledToDos.slice(0, 12)

    useEffect(() => {
        dispatch(getAllToDos(category, city))
    }, [dispatch, category, city])

    return (
        <div className="homepage-container">
            <div className="homepage-search">
                <h1 className="homepage-header">Discoverrr</h1>
                <div className="search">

                </div>
            </div>
            <div className="featured-todo-cards">
                <div className="featured-bar">
                    <h2>Featured To-Do's</h2>
                </div>
                <div className="todo-cards">
                    {
                        selectedToDos.map(todo => (
                            <Link to={`/to-do/${todo.id}`} key={todo.id}>
                                <div className="card-container">
                                    <img className="card-img" src={todo.cover_image} alt="to-do" />
                                    <div className="card-name">{`${todo.name}`}</div>
                                    <div className="card-info">
                                        <div className="card-category">{`${todo.category}`}</div>
                                        <p className="dot">•</p>
                                        <div className="card-city">{`${todo.city}`}</div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage;
