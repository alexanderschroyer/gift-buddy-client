import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

export const EditRecipient = () => {
    const [recipient, updateRecipient] = useState({
        name: ""
    })
    const {recipientId} = useParams()
    const history = useHistory()

    useEffect(
        () => {
            return fetch(`http://localhost:8000/recipients/${recipientId}`)
            .then(response => response.json())
            .then((data) => {
                updateRecipient(data)
            })
        },
        [recipientId]
    )


}