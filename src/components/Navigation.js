import React from "react";
import PropTypes from "prop-types";
import Link from "react-router-dom/es/Link";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";
import {
    Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Alignment,
    Button, Intent, Dialog, InputGroup, Tooltip, Tag
} from "@blueprintjs/core";


class Password extends React.Component {
    state = { showPassword: false };

    render () {
        const lockButton = (
            <Tooltip content={`${this.state.showPassword ? "Hide" : "Show"} Password`}>
                <Button
                    icon={this.state.showPassword ? "unlock" : "lock"}
                    intent={Intent.WARNING}
                    minimal={true}
                    onClick={() => { this.setState({ showPassword: !this.state.showPassword }); }}
                />
            </Tooltip>
        );

        return (
            <InputGroup
                placeholder="Enter your password..."
                rightElement={lockButton}
                type={this.state.showPassword ? "text" : "password"}
                value={this.props.value}
                onChange={this.props.onChange}
            />
        );
    }
}


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


@inject("currentUser") @observer
class Navigation extends React.Component {
    componentWillMount() {
        this.props.currentUser.checkLogin();
    }

    render() {
        const { currentUser } = this.props;

        return (
            <Navbar className="mgb-20">
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>
                        YOLO
                    </NavbarHeading>
                    <NavbarDivider />
                    <Link to="/" className="pt-button pt-minimal pt-icon-home">
                        Home
                    </Link>
                </NavbarGroup>

                {currentUser.user ? null : (
                    <NavbarGroup align={Alignment.RIGHT}>
                        <SignIn currentUser={currentUser} />

                        <NavbarDivider />

                        <Button intent={Intent.WARNING}>
                            Sign Up
                        </Button>
                    </NavbarGroup>
                )}
            </Navbar>
        );
    }
}


Password.propTypes = {
    value:    PropTypes.string,
    onChange: PropTypes.func,
};


export default Navigation;
