import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { NavBar } from "./nav/NavBar"
import { RecipientProvider } from "./recipients/RecipientManager"

export const GiftBuddy = () => (
    <>
        <RecipientProvider>
            <Route render={() => {
                if (localStorage.getItem("gift_buddy_token")) {
                    return <>
                        <NavBar />
                        <ApplicationViews />
                    </>
                } else {
                    return <Redirect to="/login" />
                }
            }} />
        </RecipientProvider>
        
        <Route path="/login" render={() => {
            if (localStorage.getItem("gift_buddy_token")) {
                return <Redirect to="/" />
            } else {
                return <Login />
            }
        }} />

        <Route path="/register" render={() => {
            if (localStorage.getItem("gift_buddy_token")) {
                return <Redirect to="/" />
            } else {
                return <Register />
            }
        }} />
    </>
)
