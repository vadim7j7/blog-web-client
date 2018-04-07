import React from "react";
import { observer } from "mobx-react";

import Post from "./Post";


@observer
export default class Posts extends React.Component {
    render() {
        const { items } = this.props;
        return (
            <div>
                {items.map(post => (
                    <Post
                        key={post.id}
                        slug={post.slug}
                        title={post.title}
                        body={post.body}
                    />
                ))}
            </div>
        );
    }
}
