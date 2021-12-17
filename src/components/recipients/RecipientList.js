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
        return fetch(`http://localhost:8000/search?q=${query}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gift_buddy_token")}`
            }
        })
            .then(res => res.json())
            .then((data) => setSearchResults(data))

    }

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
    const { recipientId } = useParams()


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
            <div className="result__container" style={{ margin: "0rem 3rem" }}>
                {/* <a className="recipient__list">
                    {recipient.name}
                    {recipient.interests?.interest?.label}
                    {recipients.map(recipient => {
                        return <div>
                            <div> {interests.map(interest => {
                                if (recipient.gifterId === parseInt(currentUser)) {
                                    return <div> </div>
                                } else {

                                }
                            }


                            )} </div>
                            <div></div>
                        </div>
                    })}
                </a> */}
                <div className="search__flex">
                    {recipient.name}
                    {recipientInterests.map(recint => {
                        if (recipient.id === recint.recipient.id)
                            return <div>
                                <div>
                                    <input id={`input-${recint.interest.id}`} value={recint.interest.label} type="text" onChange={event => setQuery(event.target.value)} />
                                    <button id={recint.interest.id} onClick={(event) => searchStuff(query != "" ? query : document.getElementById(`input-${event.target.id}`).value).then(getRecipientInterests())}>Search</button>
                                </div>
                            </div>
                    })}
                </div>
                <div>
                    <h3>
                        {searchResults?.shopping_results?.map(result => {
                            return <div id="search__right">
                                <a className="search__title">{result.title}</a>
                                <Link className="search__link" to={result.product_link}>{result.product_link}</Link>
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