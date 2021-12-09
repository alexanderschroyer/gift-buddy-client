import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import "./NewRecipientForm.css"

export const RecipientForm = () => {
    const [interests, setInterests] = useState([])
    const history = useHistory()

    const getInterests = () => {
        return fetch(`http://localhost:8000/interests`, {
            headers: {"Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`}
        })
        .then(res => res.json())
        .then((data) => setInterests(data))
    }

    const [currentRecipient, setCurrentRecipient] = useState({
        name: "",
        interests: []
    })

    useEffect(
        () => {
            getInterests()
        },
        []
    )

    const changeRecipientState = (event) => {
        const newRecipientState = {...currentRecipient}
        newRecipientState[event.target.name] = event.target.value
        setCurrentRecipient(newRecipientState)
    }

    const createRecipient = (recipient) => {
        return fetch("http://localhost:8000/recipients", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipient)
        })
    }

    return (
        <>
            <div className="new__recipient__form">
                <h2>New Buddy</h2>
                <form className="new__recipient">
                    <fieldset>
                        <label htmlFor="name">Name:</label>
                        <div className="form-group">
                            <input type="text" name="name" required autoFocus className="form-control"
                            value={currentRecipient.name}
                            onChange={changeRecipientState} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="interests">Interests:</label>
                        <div className="form-group">
                            <div type="checkbox" name="interests" required autoFocus className="form"
                            value={currentRecipient.interests}
                            onChange={changeRecipientState}>
                            {interests.map(interest => <div value={interest.id}><input type="checkbox"/>{interest.label}</div>)}
                            </div>
                        </div>
                    </fieldset>
                    <button type="submit"
                        onClick={event => {
                            event.preventDefault()

                            const recipient = {
                                name: currentRecipient.name,
                                interests: parseInt(currentRecipient.interests)
                            }

                            createRecipient(recipient)
                                .then(() => history.push("/recipients"))
                        }}
                        className="btn btn-primary">Create</button>
                </form>
            </div>
        </>
    )

}