import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstrapping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { RecipientContext } from "../recipients/RecipientManager";
import "./NavBar.css"


export const EditNavBar = () => {
    const { recipients, setRecipients, getRecipients, deleteRecipient } = useContext(RecipientContext)
    const history = useHistory();

    useEffect(
        () => {
            getRecipients()
        },
        []
    )


    return (
        <SideNav className="SideNav"
        expanded="True"
            onSelect={(selected) => {
                // Add your code here
                if(selected === "home"){
                    history.push("/")
                }
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">
                    <NavIcon>
                        <span class="material-icons" style={{ fontSize: '1.75em' }} > home
                        </span>   
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>

                <NavItem eventKey="recipients">
                    <NavIcon>

                    </NavIcon>
                    {/* <NavText>
                        Buddies
                    </NavText> */}
                    <NavText>
                        {recipients.map(recipient => {
                            return <NavItem key={`recipient--${recipient.id}`}>
                                <NavText key={`recipient-${recipient.id}`}>{recipient.name}
                                <button onClick={() => history.push(`/recipients/edit/${recipient.id}`)}> Edit </button>
                                <button onClick={() => { deleteRecipient(recipient.id) }}>Delete</button></NavText>
                            </NavItem>
                        })}
                        </NavText>
                    <NavItem eventKey="recipient/form">
                        <NavText>
                        <button onClick={() => history.push(`/recipient/form`)}>Create Buddy</button>
                        </NavText>
                    </NavItem>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
};