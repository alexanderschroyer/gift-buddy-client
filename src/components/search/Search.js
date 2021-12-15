import React, { useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

export const Search = () => {
    const [query, setQuery] = useState('')

    const  searchStuff = (query) => {
        fetch(`https://serpapi.com/search.json?engine=google&q=${query}&api_key=182cb978ab8751d5eaefdb9cd92a86225572b2fc62c2e8c7fe818d8fb78485bb`)
            .then(res => res.json())
    }

    return (
        <>
            <div className="search">
                <label>Search</label>
                <input value="" type="text" onChange={q => setQuery(q.target.value)} />
                <button onClick={() => searchStuff(query)}>Search</button>
            </div>
        </>
    )
}