import React from "react";
import Link from "react-router-dom/es/Link";
import { observer, inject } from "mobx-react";
import {
    Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Alignment, Button, Intent
} from "@blueprintjs/core";

import SignIn from "./Auth/SignIn";
import SignOut from "./Auth/SignOut";


@inject("currentUser") @observer
class Navigation extends React.Component {
    componentWillMount() {
        this.props.currentUser.checkLogin();
    }

    render() {
        const { currentUser } = this.props;

        return (
            <Navbar className="mgb-20">
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>
                        YOLO
                    </NavbarHeading>
                    <NavbarDivider />
                    <Link to="/" className="pt-button pt-minimal pt-icon-home">
                        Home
                    </Link>
                </NavbarGroup>

                {currentUser.user ? (
                    <NavbarGroup align={Alignment.RIGHT}>
                        <SignOut onConfirm={currentUser.signOut} />
                    </NavbarGroup>
                ) : (
                    <NavbarGroup align={Alignment.RIGHT}>
                        <SignIn currentUser={currentUser} />

                        <NavbarDivider />

                        <Button intent={Intent.WARNING}>
                            Sign Up
                        </Button>
                    </NavbarGroup>
                )}
            </Navbar>
        );
    }
}


export default Navigation;
