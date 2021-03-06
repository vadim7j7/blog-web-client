import React from "react";
import PropTypes from "prop-types";
import { Button, Intent, InputGroup, Tooltip } from "@blueprintjs/core";


class Password extends React.Component {
    state = { showPassword: false };

    render () {
        const lockButton = (
            <Tooltip content={`${this.state.showPassword ? "Hide" : "Show"} Password`}>
                <Button
                    icon={this.state.showPassword ? "unlock" : "lock"}
                    intent={Intent.WARNING}
                    minimal={true}
                    onClick={() => {
                        this.setState({ showPassword: !this.state.showPassword });
                    }}
                />
            </Tooltip>
        );

        return (
            <InputGroup
                placeholder="Enter your password..."
                rightElement={lockButton}
                intent={this.props.intent}
                type={this.state.showPassword ? "text" : "password"}
                value={this.props.value}
                onChange={this.props.onChange}
            />
        );
    }
}

Password.propTypes = {
    intent:   PropTypes.string,
    value:    PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

Password.defaultProps = {
    intent: Intent.NONE
};


export default Password;
