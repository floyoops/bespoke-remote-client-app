var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var TextField = require('material-ui/lib/text-field');

var FormName = React.createClass({
    getInitialState: function () {
        return {userName: this.props.userName};
    },
    handleForm: function (e) {
        e.preventDefault();
        this.state.userName = this.refs.nameuser.getValue();
        this.setState({userName: this.state.userName});
    },
    render: function () {
        if (this.state.userName == null) {
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
                        onTouchEnd={this.handleForm}
                    />
                </form>
            );
        }

        return null;
    }
});

module.exports = FormName;