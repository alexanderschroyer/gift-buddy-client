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

    const handleInputChange = (event) => {
        const newRecipientState = {...currentRecipient}
        const target = event.target;
        var value = target.value;
        if(target.checked){
            newRecipientState.interests.push(parseInt(value));
            setCurrentRecipient(newRecipientState)
            }else{
            let index = newRecipientState.interests.indexOf(value)
            newRecipientState.interests.splice(index, 1);
            setCurrentRecipient(newRecipientState)
            }


        newRecipientState[event.target.name] = event.target.value
        setCurrentRecipient(newRecipientState)
    }

    const createRecipient = (currentRecipient) => {
        return fetch("http://localhost:8000/recipients", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(currentRecipient)
        })
    }

    // const getSelected = () => {
    //     let selected = new Array()
    //     const interestCheck = document.getElementById("interest__check")
    //     // const checks = interestCheck.getElementsByTagName("INPUT")

    //     for (var i = 0; i < checks.length; i++) {
    //         if (checks[i].checked) {
    //             selected.push(checks[i].value)
    //         }
    //     }
    //     if (selected.length > 0) {
    //         return selected
    //     }
    // }

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
                            onChange={handleInputChange} />
                        </div>
                    </fieldset>
                        <div className="form-group">
                            {interests.map(interest => (<>
                            <label id="interest_id" name="interest_id" value={interest.id}> {interest.label} </label>
                            <input type="checkbox" name="interest_id" value={`${interest.id}`}
                                // checked="selected"
                                onChange={ (event) => {
                                    handleInputChange(event)
                                    }}></input>
                            </>))}
                        </div>
                    <button type="submit"
                        onClick={event => {
                            event.preventDefault()

                            const recipient = {
                                name: currentRecipient.name,
                                interests: parseInt(currentRecipient.interests)
                            }

                            createRecipient(currentRecipient)
                                .then(() => history.push("/recipients"))
                        }}
                        className="btn btn-primary">Create</button>
                </form>
            </div>
        </>
    )

}