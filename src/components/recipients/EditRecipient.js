import { CompilerDeprecationTypes } from "@vue/compiler-core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { RecipientContext } from "./RecipientManager";

export const EditRecipient = () => {
    const [recipient, setRecipient] = useState({
        name: ""
    })
    const [interests, setInterests] = useState([])
    const {updateRecipient} = useContext(RecipientContext)
    const {recipientId} = useParams()
    const history = useHistory()

    useEffect(
        () => {
            return fetch(`http://localhost:8000/recipients/${recipientId}`,  {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`
                }
            })
            .then(response => response.json())
            .then((data) => {
                setRecipient(data)
            })
        },
        [recipientId]
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

    useEffect(
        () => {
            getInterests()
        },
        []
    )
    

    return (
        <>
            <section>
                <div>
                    <h2>Edit Recipient</h2>
                    <form>
                        <fieldset>
                            <div>
                                <input
                                    onChange = {
                                        (event) => {
                                            const copy = {...recipient}
                                            copy.name = event.target.value
                                            setRecipient(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="textarea"
                                    className="form-control"
                                    defaultValue={recipient.name}
                                    />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div>
                            {interests.map(interest => (<>
                            <label id="interest_id" name="interest_id" value={interest.id}> {interest.label} </label>
                            <input type="checkbox" name="interest_id" value={`${interest.id}`}
                                checked={recipient.interests}
                                defaultValue={recipient.interests}
                                onChange={ (event) => {
                                    // handleInputChange(event)
                                    }}></input>
                            </>))}
                            </div>
                        </fieldset>
                        <button className="editRecipient" onClick={() => { history.push("/recipients/edit/list") }}>
                            Cancel
                        </button>
                        <button className="updateRecipient" onClick={(event) => { event.preventDefault(); updateRecipient(recipientId, recipient.name) }}>
                            Update
                        </button>
                    </form>
                </div>
            </section>
        </>
    )

}