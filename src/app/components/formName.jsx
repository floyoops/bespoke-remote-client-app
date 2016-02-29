var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var TextField = require('material-ui/lib/text-field');

var FormName = React.createClass({
    getInitialState: function () {
        return {
            User: this.props.User,
            saveUser: this.props.saveUser,
            socket: this.props.socket
        };
    },
    handleForm: function (e) {
        e.preventDefault();
        this.state.User.setName(this.refs.nameuser.getValue());
        this.state.socket.emit('setUserName', this.state.User.getName());
        this.props.saveUser(this.state.User);
    },
    render: function () {
        if (this.state.User.getName() !== null) {
            return null;
        }

        return (
            <form onSubmit={this.handleForm}>
                <TextField
                    fullWidth={true}
                    floatingLabelText="Votre nom"
                    ref="nameuser"
                />

                <RaisedButton
                    label="Envoyer"
                    primary={true}
                    fullWidth={true}
                    onTouchTap={this.handleForm}
                />
            </form>
        );
    }
});

module.exports = FormName;
