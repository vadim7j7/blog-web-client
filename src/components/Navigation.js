import React from "react";
import Link from "react-router-dom/es/Link";
import { Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Alignment } from "@blueprintjs/core"


const Navigation = () => (
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
    </Navbar>
);

export default Navigation;
