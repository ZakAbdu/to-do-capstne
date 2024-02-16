import React, { useState } from "react";
import { UseDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "./SearchBar.css"


function SearchBar() {
    const [city, setCity] = useState('')
    const [category, setCategory] = useState('')
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const queryParams = new URLSearchParams();
        if (city) {
            queryParams.append('city', city)
        }
        if (category) {
            queryParams.append('type', category)
        }

        const queryString = queryParams.toString();
        history.push(`/to-do${ queryString ? `?${queryString}` : '' }`)

        return (
            <form className="search-form-container" onSubmit={handleSubmit}>
                <label className="city"></label>
                <select
                    className="cityinput"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                >
                    <option value=''>Search by City</option>
                    <option value='San Diego'>San Diego</option>
                </select>

                <label className="category-type"></label>
                <select 
                    className="typeinput"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value=''>Search by Category</option>
                    <option value='To-Do'>To-Do</option>
                    <option value='To-Eat'>To-Eat</option>
                    <option value='To-See'>To-See</option>
                </select>
                <button className="table-button" type="submit">Find a To-Do</button>
            </form>
        )
    }
}

export default SearchBar