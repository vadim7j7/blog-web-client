import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import Post from "./Post";


@observer
class Posts extends React.Component {
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
                        tags={post.tags}
                        user={post.userModel}
                    />
                ))}
            </div>
        );
    }
}

Posts.propTypes = {
    items: PropTypes.array.isRequired,
};


export default Posts;
