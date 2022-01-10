import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { RecipientContext } from "./RecipientManager"
import "./RecipientList.css"


export const RecipientList = () => {
    const [query, setQuery] = useState([''])
    const [interests, setInterests] = useState([])
    const [recipientInterests, setRecipientInterests] = useState([])
    const [recipient, setRecipient] = useState({})
    const [searchResults, setSearchResults] = useState([])
    const { recipients, setRecipients, getRecipients, deleteRecipients, updateRecipient } = useContext(RecipientContext)
    const history = useHistory()

    const searchStuff = (query) => {
        return fetch(`https://gift-buddy-server.herokuapp.com/search?q=${query}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`
            }
        })
            .then(res => res.json())
            .then((data) => setSearchResults(data))

    }

    const getRecipient = () => {
        return fetch(`https://gift-buddy-server.herokuapp.com/recipients/${recipientId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`
            }
        })
            .then(res => res.json())
            .then((data) => setRecipient(data))
    }
    const { recipientId, interestId } = useParams()


    useEffect(
        () => {
            getRecipients()
        },
        []
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

    const getRecipientInterests = () => {
        return fetch(`https://gift-buddy-server.herokuapp.com/recipientinterests`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`
            }
        })
            .then(res => res.json())
            .then(setRecipientInterests)
    }

    const deleteInterest = (interestId) => {
        return fetch(`https://gift-buddy-server.herokuapp.com/interests/${interestId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`
            }
        })
    }

    // useEffect(
    //     () => {
    //         getInterests()
    //     },
    //     []
    // )

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
            <div className="result__container" style={{ margin: "0rem 3rem" }}>
                <div className="search__flex">
                    {recipient.name}
                    {recipientInterests.map(recint => {
                        if (recipient.id === recint.recipient.id)
                            return <div>
                                <div>
                                    {/* <p id={`input-${recint.interest.id}`} value={recint.interest.label}>{recint.interest.label} </p> */}
                                    <input disabled id={`input-${recint.interest.id}`} value={recint.interest.label} type="text" onChange={event => setQuery(event.target.value)} />
                                    <button id={recint.interest.id} onClick={(event) => searchStuff(query != "" ? query : document.getElementById(`input-${event.target.id}`).value).then(getRecipientInterests())}>Search</button>
                                </div>
                                <div>
                                    <button className="delete__interest"
                                        onClick={() => deleteInterest(recint.interest.id).then(() => getRecipient())}
                                    >Delete</button>
                                </div>
                            </div>
                    })}
                </div>
                <div>
                    <h3>
                        {searchResults?.shopping_results?.map(result => {
                            return <div id="search__right">
                                <a className="search__title">{result.title}</a>
                                <a className="search__link" target="_blank" href={result.product_link}>{result.product_link}</a>
                                <a>{result.price}</a>
                                <img className="search__img" src={result.thumbnail} />
                            </div>

                        })}
                    </h3>
                </div>
            </div>
        </>
    )
}
