import React, { useContext, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { RecipientContext } from "../recipients/RecipientManager"



export const CreateInterest = () => {
    const [newInterest, setNewInterest] = useState({
        label: ""
    })
    const { recipients, setRecipients, getRecipients } = useContext(RecipientContext)
    const history = useHistory()
    const { recipientId } = useParams()
    const getInterests = () => {
        return fetch(`http://localhost:8000/interests`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`
            }
        })
    }

        const saveNewInterest = (event) => {
            event.preventDefault()

            const interestData = {
                label: newInterest.label
            }

            const fetchOption = {
                method: "POST",
                headers: {
                    "Authorization":`Token ${localStorage.getItem("gift_buddy_token")}`,
                    "Content-Type": "application/json"
            },
            body: JSON.stringify(interestData)
        }
        return fetch(`http://localhost:8000/interests`, fetchOption)
        .then(() => {getInterests()})
        .then(() => history.push(`/recipients/edit/${recipientId}`))
    }

        


        return (
            <>
                <div className="newInterest_form">
                <h2>Create a new interest</h2>
                    <form className="newInterest">
                        <fieldset>
                            <div className="form-group">
                                <input
                                    onChange = {
                                        (event) => {
                                            const copy = {...newInterest}
                                            copy.label = event.target.value
                                            setNewInterest(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="textarea"
                                    className="form-control"
                                    placeholder="Add text"
                                />
                            </div>
                        </fieldset>
                        <button className="newInterestButton" onClick={saveNewInterest}>
                            Create
                        </button>
                    </form>
                </div>
            </>
        )

    
}