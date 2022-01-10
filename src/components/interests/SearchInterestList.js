import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router"
import "./InterestList.css"
import { RecipientContext } from "../recipients/RecipientManager";

export const SearchInterests = () => {
    const [interests, setInterests] = useState([])
    const [recipients, ] = useState([])
    const history = useHistory()
    
    const getInterests = () => {
        return fetch(`https://gift-buddy-server.herokuapp.com/interests`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`
            }
        })
        .then(res => res.json())
        .then(setInterests)
    }

    useEffect(
        () => {
            getInterests()
        },
        []
    )

    return (
        <>
        {interests.map(interest => {
            return <div className="interest__list">{interest.label}</div>
            
        })}
        
        </>
    )
}