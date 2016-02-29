var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');

var ControlSlideButtonAdmin = React.createClass({
    getInitialState: function () {
        return {
            User: this.props.User,
        };
    },
    next: function () {
        this.props.socket.emit('bespoke-action', 'next');
    },
    prev: function () {
        this.props.socket.emit('bespoke-action', 'prev');
    },
    render: function () {
        if (this.state.User.isAdmin == false) {
            return null;
        }

        return (
            <div>
                <RaisedButton
                    ref="a"
                    fullWidth={true}
                    label="Précédent"
                    onTouchTap={this.prev}
                />
                <br /><br />

                <RaisedButton
                    ref="b"
                    fullWidth={true}
                    label="Suivant"
                    onTouchTap={this.next}
                />
                <br /><br />
            </div>
        );
    }
});

module.exports = ControlSlideButtonAdmin;
