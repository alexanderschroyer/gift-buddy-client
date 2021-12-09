import React, { useState, createContext } from "react";
import { useHistory } from "react-router";

export const RecipientContext = createContext()

export const RecipientProvider = (props) => {
    const [recipients, setRecipients] = useState([])
    const history = useHistory()

    const getRecipients = () => {
        return fetch(`http://localhost:8000/recipients`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`
            }
        })
        .then(res => res.json())
        .then(setRecipients)
    }

    const deleteRecipient = (id) => {
        return fetch(`http://localhost:8000/recipients/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`
            }
        })
        .then(getRecipients)
    }



    return (
        <RecipientContext.Provider value={{
            recipients, setRecipients, getRecipients, deleteRecipient
        }}>
            {props.children}
        </RecipientContext.Provider>
    )

}