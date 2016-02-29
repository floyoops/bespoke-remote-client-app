var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var ControlSlideButtonAdmin = require('./ControlSlideButtonAdmin.jsx');

var ControlSlide = React.createClass({
    getInitialState: function () {
        return {
            note: null,
            User: this.props.User
        };
    },
    componentWillMount: function () {
        var that = this;
        this.props.socket.on('client-flopoke-note', function (objNote) {
            that.setState({note: objNote.note});
        });
    },
    stop: function () {
        this.props.setSlideActive(null);
    },
    flopoke_finger1_start: function () {
        this.props.socket.emit('bespoke-action', 'flopoke-finger1-start');
    },
    render: function () {
        if (this.props.slideActive == null) {
            return false;
        }

        return (
            <div>
                <h1>Control {this.props.slideActive.token}</h1>
                <div>
                    <ControlSlideButtonAdmin
                        User={this.state.User}
                        socket={this.props.socket}
                    />
                    <RaisedButton
                        ref="b"
                        fullWidth={true}
                        label="Whaaaat ??"
                        onTouchTap={this.flopoke_finger1_start}
                    />
                </div>
                <div style={{margin: 20, height: 180, overflowY: 'auto'}}>{this.state.note}</div>
                <div>
                    <RaisedButton ref="c" fullWidth={true} label="Stop" onTouchTap={this.stop}/>
                </div>
            </div>
        );
    }
});

module.exports = ControlSlide;
