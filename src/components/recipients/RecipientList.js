import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { RecipientContext } from "./RecipientManager"


export const RecipientList = () => {
    const [interests, setInterests] = useState([])
    const [recipientInterests, setRecipientInterests] = useState([])
    const [recipient, setRecipient] = useState({})
    const {recipients, setRecipients, getRecipients, deleteRecipients, updateRecipient } = useContext(RecipientContext)
    const history = useHistory()
    const currentUser = () => {
        return localStorage.getItem("gift_buddy_token")
    }

    const getRecipient = () => {
        return fetch(`http://localhost:8000/recipients/${recipientId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`
            }
        })
        .then(res => res.json())
        .then(setRecipient)
    }
    const {recipientId} = useParams()

    
    useEffect(
        () => {
            getRecipients()
        },
        []
    )
    const getInterests = () => {
        return fetch(`http://localhost:8000/interests`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`
            }
        })
        .then(res => res.json())
        .then(setInterests)
    }

    const getRecipientInterests = () => {
        return fetch(`http://localhost:8000/recipientinterests`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`
            }
        })
        .then(res => res.json())
        .then(setRecipientInterests)
    }
    
    useEffect(
        () => {
            getInterests()
        },
        []
    )

    useEffect(
        () => {
            getRecipientInterests()
        },
        []
    )
    useEffect(
        () => {
            getRecipient()
        },
        []
    )


    return (
        <>
            <div style={{margin: "0rem 3rem"}}>
                <a className="recipient__list">
                    {recipient.name}
                    {recipient.interests?.interest?.label}
                    {recipients.map(recipient => {
                        return <div>
                            <div> {interests.map(interest => {
                                if (recipient.gifterId === parseInt(currentUser)) {
                                return <div> </div>} else {

                                }
                            }

                            
                            )} </div>
                            <div></div>
                            </div>
                    })}
                </a>
                <div>
                    {recipientInterests.map(recint => {
                        if (recipient.id === recint.recipient.id)
                        return <div> <div>{recint.recipient.name} <input type="text" name="interest" 
                        required
                        autoFocus
                        className="form-control"
                        value={recint.interest.label}></input></div> </div>
                        
                    })}
                </div>
            </div>
        </>
    )
}