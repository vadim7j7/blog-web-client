import React from "react";
import Link from "react-router-dom/es/Link";
import { Card, Elevation, Intent, Tag } from "@blueprintjs/core";

import UserBadge from "./UserBadge";


const TagList = ({ tags }) => (
    tags && tags.length > 0 ? (
        <div className="mgb-10">
            {tags.map((tag, index) => (
                <Tag
                    key={index}
                    intent={Intent.PRIMARY}
                    className="mgr-5"
                >
                    {tag}
                </Tag>
            ))}
        </div>
    ) : null
);


const Post = ({ slug, title, body, tags, user }) => (
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

        <TagList tags={tags} />

        {user ? (
            <UserBadge data={user} />
        ) : null}
    </Card>
);

export default Post;
