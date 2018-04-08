import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Button, Intent, Alert } from "@blueprintjs/core";


@observer
class SignOut extends React.Component {
    @observable isOpen = false;

    render() {
        return (
            <div>
                <Button onClick={this.handleToggle}>
                    Sign Out
                </Button>

                <Alert
                    cancelButtonText="Cancel"
                    confirmButtonText="Okay"
                    intent={Intent.SUCCESS}
                    isOpen={this.isOpen}
                    onConfirm={() => {
                        this.handleToggle();
                        this.props.onConfirm();
                    }}
                    onCancel={this.handleToggle}
                >
                    <h4>Sign Out</h4>
                    <p>Are you sure?</p>
                </Alert>
            </div>
        );
    }

    handleToggle = () => {
        this.isOpen = !this.isOpen;
    };
}

SignOut.propTypes = {
    onConfirm: PropTypes.func.isRequired,
};


export default SignOut;
