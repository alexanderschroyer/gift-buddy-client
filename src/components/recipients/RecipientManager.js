import React, { useState, createContext } from "react";
import { useHistory } from "react-router";

export const RecipientContext = createContext()

export const RecipientProvider = (props) => {
    const [recipients, setRecipients] = useState([])
    const history = useHistory()

    const getRecipients = () => {
        return fetch(`https://gift-buddy-server.herokuapp.com/recipients/currentuser`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`
            }
        })
        .then(res => res.json())
        .then((data) => setRecipients(data))
    }

    const deleteRecipient = (id) => {
        return fetch(`https://gift-buddy-server.herokuapp.com/recipients/${id}`, {
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

        return fetch(`https://gift-buddy-server.herokuapp.com/recipients/${recipientId}`, fetchOption)
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