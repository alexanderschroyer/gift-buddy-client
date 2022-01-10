import React, { useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstrapping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { RecipientContext } from "../recipients/RecipientManager";
import "./NavBar.css"

export const NavBar = () => {
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
                if (selected === "home") {
                    history.push("/")
                }
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">
                    <NavIcon className="material">
                        <span class="material-icons" style={{ fontSize: '1.75em' }}> home
                        </span>
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>

                <NavItem eventKey="recipients">
                    <NavIcon className="material">
                        <span class="material-icons"> people
                        </span>
                    </NavIcon>
                    <NavText>
                        Buddies
                    </NavText>
                    {recipients.map(recipient => {
                        return <NavItem key={`recipient--${recipient.id}`}>
                            <NavText key={`recipient-${recipient.id}`}>
                                <Link to={`/recipients/${recipient.id}`}> {recipient.name} </Link></NavText>
                        </NavItem>
                    })}
                    <NavItem>
                        <NavText>
                            <NavItem>
                                <button onClick={() => history.push(`/recipients/edit/list`)}> Edit </button>
                            </NavItem>
                            <a onClick={() => {
                                localStorage.clear()
                                history.push("/login")
                            }}>
                                <NavItem className="logout" eventKey="logout">
                                    <NavText><button>Logout</button></NavText>
                                </NavItem>
                            </a>
                            {/* set state variable = true edit button sets from false to true
                
                ternary at top wraps nav bar if true render edit nav bar if false render this navbar*/}
                        </NavText>
                    </NavItem>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
};