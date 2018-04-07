import React from "react";

import Navigation from "../../components/Navigation";



const ApplicationLayout = ({ children }) => (
    <div>
        <Navigation />

        <div className="wrapper">
            {children}
        </div>
    </div>
);


export default ApplicationLayout;
