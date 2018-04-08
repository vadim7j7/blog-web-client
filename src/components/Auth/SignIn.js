import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react/index";
import { observable } from "mobx";
import { Button, Intent, Dialog, InputGroup, Tag } from "@blueprintjs/core";

import Password from "./Password";


@observer
class SignIn extends React.Component {
    @observable isOpen   = false;
    @observable email    = "";
    @observable password = "";

    render () {
        const { currentUser } = this.props;

        return (
            <div>
                <Button
                    icon="log-in"
                    intent={Intent.SUCCESS}
                    onClick={this.toggleDialog}
                >
                    Sign In
                </Button>

                <Dialog
                    title="Sign In"
                    icon="log-in"
                    isOpen={this.isOpen}
                    onClose={this.toggleDialog}
                >

                    <div className="pt-dialog-body">
                        <InputGroup
                            placeholder="Enter Email"
                            leftIcon="email"
                            type="email"
                            className="mgb-10"
                            value={this.email}
                            onChange={(e) => {
                                this.email = e.target.value;
                                currentUser.error = null;
                            }}
                        />

                        <div className="mgb-10">
                            <Password
                                value={this.password}
                                onChange={(e) => {
                                    this.password = e.target.value;
                                    currentUser.error = null;
                                }}
                            />
                        </div>

                        {currentUser.error ? (
                            <Tag intent={Intent.DANGER}>
                                {currentUser.error}
                            </Tag>
                        ) : null}
                    </div>

                    <div className="pt-dialog-footer">
                        <div className="pt-dialog-footer-actions">
                            <Button onClick={this.toggleDialog}>
                                Cancel
                            </Button>

                            <Button
                                intent={Intent.PRIMARY}
                                loading={currentUser.loading}
                                onClick={() => {
                                    currentUser.signIn(this.email, this.password, () => {
                                        this.toggleDialog();
                                    });
                                }}
                            >
                                Sign in
                            </Button>
                        </div>
                    </div>

                </Dialog>
            </div>
        );
    };

    toggleDialog = () => {
        if (this.props.currentUser.loading) { return; }

        this.props.currentUser.error = null;
        this.isOpen = !this.isOpen;
    };
}

SignIn.propTypes = {
    currentUser: PropTypes.object.isRequired,
};


export default SignIn;
