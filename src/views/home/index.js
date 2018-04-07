import React from "react";
import { observer, inject } from "mobx-react";
import { Spinner, Intent } from "@blueprintjs/core";

import Posts from "../../components/Posts";


@inject("postListStory") @observer
export default class HomeView extends React.Component {
    componentWillMount() {
        const { postListStory } = this.props;

        postListStory.clear();
        postListStory.fetch();
    }

    render() {
        const { postListStory } = this.props;

        return (
            <div>
                {postListStory.loading ? (
                    <div className="align-center">
                        <Spinner intent={Intent.PRIMARY} />
                    </div>
                ) : (
                    <Posts items={postListStory.posts} />
                )}
            </div>
        );
    }
};
