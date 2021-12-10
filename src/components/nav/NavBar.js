import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstrapping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { RecipientContext } from "../recipients/RecipientManager";

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
        <SideNav
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
                        <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Buddies
                    </NavText>
                        {recipients.map(recipient => {
                            return <NavItem key={`recipient--${recipient.id}`}>
                                <NavText key={`recipient-${recipient.id}`}>{recipient.name}</NavText>
                            </NavItem>
                        })}
                    <NavItem eventKey="charts/linechart">
                        <NavText>
                            Line Chart
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="charts/barchart">
                        <NavText>
                            Bar Chart
                    <NavItem>
                    <button onClick={() => history.push(`/recipients/edit/list`)}> Edit </button>
                </NavItem> 
                {/* set state variable = true edit button sets from false to true
                
                ternary at top wraps nav bar if true render edit nav bar if false render this navbar*/}
                        </NavText>
                    </NavItem>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
};