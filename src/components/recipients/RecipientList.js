import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { RecipientContext } from "./RecipientManager"


export const RecipientList = () => {
    const {recipients, setRecipients, getRecipients, deleteRecipients} = useContext(RecipientContext)
    const history = useHistory()
    
    useEffect(
        () => {
            getRecipients()
        },
        []
    )


    return (
        <>
            <div style={{margin: "0rem 3rem"}}>
                <a className="recipient__list">
                    {recipients.map(recipient => {
                        return <div>{recipient.name}</div>
                    })}
                </a>
            </div>
        </>
    )
}