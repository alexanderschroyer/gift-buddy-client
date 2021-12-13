import React from "react";
import { Route } from "react-router-dom";
import { Interests } from "./interests/InterestList";
import { EditNavBar } from "./nav/EditNavBar";
import { EditRecipient } from "./recipients/EditRecipient";
import { RecipientForm } from "./recipients/NewRecipientForm";
import { RecipientList } from "./recipients/RecipientList";
import "./ApplicationViews.css"

export const ApplicationViews = () => {
    return (
        <div id="main--container">
            <main
                style={{
                    margin: "5rem 2rem",
                    lineHeight: "1.75rem",
                }}
            >
                <Route exact path="/recipients/edit/list">
                    <EditNavBar />
                </Route>

                <Route exact path="/recipient/interests">
                    <Interests />
                </Route>

                <Route exact path="/recipient/form">
                    <RecipientForm />
                </Route>

                <Route exact path="/recipients/edit/:recipientId(\d+)">
                    <EditRecipient />
                </Route>
            </main>
        </div>
    );
};