import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react/index";
import { observable } from "mobx";
import { Button, Intent, Dialog, FormGroup, InputGroup } from "@blueprintjs/core";

import Password from "./Password";


@observer
class SignUp extends React.Component {
    @observable isOpen      = false;
    @observable email       = "";
    @observable password    = "";
    @observable firstName   = "";
    @observable lastName    = "";
    @observable title       = "";
    @observable description = "";

    getError = (key) => (
        this.props.currentUser.error && this.props.currentUser.error[key] ? this.props.currentUser.error[key] : null
    );

    render () {
        const { currentUser } = this.props;

        return (
            <div>
                <Button
                    intent={Intent.WARNING}
                    onClick={this.toggleDialog}
                >
                    Sign Up
                </Button>

                <Dialog
                    title="Registration"
                    isOpen={this.isOpen}
                    onClose={this.toggleDialog}
                >

                    <div className="pt-dialog-body">
                        <FormGroup
                            label="First Name"
                            intent={(this.getError("profile.first_name") ? Intent.DANGER : Intent.NONE)}
                            helperText={this.getError("profile.first_name")}
                        >
                            <InputGroup
                                placeholder="First Name"
                                intent={(this.getError("profile.first_name") ? Intent.DANGER : Intent.NONE)}
                                value={this.firstName}
                                onChange={(e) => {
                                    this.firstName = e.target.value;
                                    currentUser.error = null;
                                }}
                            />
                        </FormGroup>

                        <FormGroup
                            label="Last Name"
                            intent={(this.getError("profile.last_name") ? Intent.DANGER : Intent.NONE)}
                            helperText={this.getError("profile.last_name")}
                        >
                            <InputGroup
                                placeholder="Last Name"
                                intent={(this.getError("profile.last_name") ? Intent.DANGER : Intent.NONE)}
                                value={this.lastName}
                                onChange={(e) => {
                                    this.lastName = e.target.value;
                                    currentUser.error = null;
                                }}
                            />
                        </FormGroup>

                        <FormGroup
                            label="Email"
                            intent={(this.getError("email") ? Intent.DANGER : Intent.NONE)}
                            helperText={this.getError("email")}
                        >
                            <InputGroup
                                type="email"
                                placeholder="Email"
                                intent={(this.getError("email") ? Intent.DANGER : Intent.NONE)}
                                value={this.email}
                                onChange={(e) => {
                                    this.email = e.target.value;
                                    currentUser.error = null;
                                }}
                            />
                        </FormGroup>

                        <FormGroup
                            label="Password"
                            intent={(this.getError("password") ? Intent.DANGER : Intent.NONE)}
                            helperText={this.getError("password")}
                        >
                            <Password
                                intent={(this.getError("password") ? Intent.DANGER : Intent.NONE)}
                                value={this.password}
                                onChange={(e) => {
                                    this.password = e.target.value;
                                    currentUser.error = null;
                                }}
                            />
                        </FormGroup>
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
                                    currentUser.registration(
                                        this.email, this.password,
                                        this.firstName, this.lastName,
                                        this.title, this.description,
                                        () => { this.toggleDialog(); }
                                    );
                                }}
                            >
                                Registration
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

SignUp.propTypes = {
    currentUser: PropTypes.object.isRequired,
};


export default SignUp;
