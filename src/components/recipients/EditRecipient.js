import { CompilerDeprecationTypes } from "@vue/compiler-core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { RecipientContext } from "./RecipientManager";

export const EditRecipient = () => {
    const [recipient, setRecipient] = useState({
        name: ""
    })
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
                                            updateRecipient(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="textarea"
                                    className="form-control"
                                    defaultValue={recipient.name}
                                    />
                            </div>
                        </fieldset>
                    </form>
                </div>
            </section>
        </>
    )

}