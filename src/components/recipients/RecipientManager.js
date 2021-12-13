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

    const updateRecipient = (recipientId, name, interests) => {

        const fetchOption = {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                interests: interests
            })
        }

        return fetch(`http://localhost:8000/recipients/${recipientId}`, fetchOption)
            .then(() => {history.push(`/`)})
    }



    return (
        <RecipientContext.Provider value={{
            recipients, setRecipients, getRecipients, deleteRecipient, updateRecipient
        }}>
            {props.children}
        </RecipientContext.Provider>
    )

}