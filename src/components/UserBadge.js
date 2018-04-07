import React from "react";
import { observer } from "mobx-react";
import { Popover, PopoverInteractionKind } from "@blueprintjs/core";

import { BACK_END_HOST } from "../config/api";


@observer
export default class UserBadge extends React.Component {
    render() {
        const { data } = this.props;

        return (
            <div>
                <div className="avatar small">
                    <Popover
                        interactionKind={PopoverInteractionKind.HOVER}
                        content={
                            <div className="user-info">
                                <h4>
                                    {data.fullName}
                                </h4>
                            </div>
                        }
                    >
                        <img
                            src={[BACK_END_HOST, data.avatar.medium].join('')}
                            alt={data.fullName}
                        />
                    </Popover>
                </div>
            </div>
        );
    }
}
