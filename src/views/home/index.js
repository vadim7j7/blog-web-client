import React from "react";
import { observer, inject } from "mobx-react";
import { Spinner, Intent } from "@blueprintjs/core";

import Posts from "../../components/Posts";
import Pagination from "../../components/Pagination";


@inject("postListStory") @observer
export default class HomeView extends React.Component {
    componentWillMount() {
        const { postListStory } = this.props;

        postListStory.fetch();
    }

    render() {
        const { postListStory } = this.props;

        return (
            <div className="mgb-20">
                <Posts items={postListStory.posts} />

                {postListStory.loading ? (
                    <div className="align-center">
                        <Spinner intent={Intent.PRIMARY} />
                    </div>
                ) : null}

                {postListStory.paginationIsValid ? (
                    <Pagination
                        total={postListStory.pagination.get("totalPages")}
                        current={(postListStory.pagination.get("currentPage") - 1)}
                        visiblePages={6}
                        titles={{ first: '<|', last: '>|' }}
                        onPageChanged={(page) => { postListStory.fetch(page + 1); }}
                    />
                ) : null}
            </div>
        );
    }
};
