import React from "react";
import Link from "react-router-dom/es/Link";
import { Card, Elevation } from "@blueprintjs/core";


const Post = ({ slug, title, body }) => (
    <Card
        className="mgb-20"
        elevation={Elevation.THREE}
    >
        <h5>
            {slug ? (
                <Link to={slug}>
                    {title}
                </Link>
            ) : title}
        </h5>
        <p>{body}</p>
    </Card>
);

export default Post;
