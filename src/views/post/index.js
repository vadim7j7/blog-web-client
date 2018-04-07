import React from "react";
import { inject, observer } from "mobx-react";
import { Spinner, Intent } from "@blueprintjs/core";

import Post from "../../components/Post";


@inject("postItemStory") @observer
export default class PostView extends React.Component {
    componentWillMount() {
        const { postItemStory } = this.props;
        postItemStory.fetch(this.props.match.params.slug);
    }

    render() {
        const { postItemStory } = this.props;

        return (
            <div>
                {postItemStory.loading ? (
                    <div className="align-center">
                        <Spinner intent={Intent.PRIMARY} />
                    </div>
                ) : (
                    <Post
                        key={postItemStory.post.id}
                        title={postItemStory.post.title}
                        body={postItemStory.post.body}
                        tags={postItemStory.post.tags}
                        user={postItemStory.post.userModel}
                    />
                )}
            </div>
        );
    }
};
