import { CompilerDeprecationTypes } from "@vue/compiler-core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { RecipientContext } from "./RecipientManager";
import "./EditRecipient.css"

export const EditRecipient = () => {
    const [recipient, setRecipient] = useState({
        name: ""
    })
    const [interests, setInterests] = useState([])
    const { updateRecipient } = useContext(RecipientContext)
    const { recipientId } = useParams()
    const history = useHistory()
    const [selectedRecipientInterests, setSelectedRecipientInterests] = useState([])

    useEffect(
        () => {
            return fetch(`https://gift-buddy-server.herokuapp.com/recipients/${recipientId}`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`
                }
            })
                .then(response => response.json())
                .then((data) => {
                    setRecipient(data)
                    const copy = [...selectedRecipientInterests]
                    for (const selectedInterest of data.interests) {
                        copy.push(selectedInterest.id)
                    }
                    setSelectedRecipientInterests(copy)
                    console.log(selectedRecipientInterests)
                })
        },
        [recipientId]
    )
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

    const handleInputChange = (event) => {
        const target = event.target;
        var value = target.value;
        if (target.checked) {
            const copy = [...selectedRecipientInterests]
            copy.push(parseInt(value))
            setSelectedRecipientInterests(copy)
        } else {
            const copy = [...selectedRecipientInterests]
            let index = copy.indexOf(parseInt(value))
            copy.splice(index, 1);
            setSelectedRecipientInterests(copy)
        }
    }

    return (
        <>
            <section>
                <div className="edit__recipient">
                    <h2>Edit Recipient</h2>
                    <form>
                        <fieldset>
                            <div>
                                <input
                                    onChange={
                                        (event) => {
                                            const copy = { ...recipient }
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
                                {interests?.map(interest => {
                                    if (selectedRecipientInterests.includes(interest.id)) {
                                        return (<>
                                            <label id="interest_id" name="interest_id" value={interest.id}> {interest.label} </label>
                                            <input type="checkbox" name="interest_id" value={`${interest.id}`}
                                                checked
                                                defaultValue={recipient.interests}
                                                onChange={(event) => {
                                                    handleInputChange(event)
                                                }}></input>
                                        </>)
                                    } else {
                                        return (<>
                                            <label id="interest_id" name="interest_id" value={interest.id}> {interest.label} </label>
                                            <input type="checkbox" name="interest_id" value={`${interest.id}`}
                                                defaultValue={recipient.interests}
                                                onChange={(event) => {
                                                    handleInputChange(event)
                                                }}></input>
                                        </>)

                                    }
                                })}
                            </div>
                            <div>
                            <button onClick={() => history.push(`/interest/new/${recipientId}`)}> Add Custom Interest </button>
                            </div>
                        </fieldset>
                        <button className="editRecipient" onClick={() => { history.push("/recipients/edit/list") }}>
                            Cancel
                        </button>
                        <button className="updateRecipient" onClick={(event) => { event.preventDefault(); updateRecipient(recipientId, recipient.name, selectedRecipientInterests) }}>
                            Update
                        </button>
                    </form>
                </div>
            </section>
        </>
    )

}