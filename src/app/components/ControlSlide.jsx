var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');

var ControlSlide = React.createClass({
    getInitialState: function() {
        return {
            note: null
        };
    },
    componentWillMount: function() {
        var that = this;
        this.props.socket.on('client-flopoke-note', function(objNote) {
            that.setState({note: objNote.note});
        });
    },
    next: function() {
        this.props.socket.emit('bespoke-action', 'next');
    },
    prev: function() {
        this.props.socket.emit('bespoke-action', 'prev');
    },
    stop: function() {
        this.props.setSlideActive(null);
    },
    flopoke_finger1_start: function() {
        this.props.socket.emit('bespoke-action', 'flopoke-finger1-start');
    },
    render: function() {
        if (this.props.slideActive == null) {
            return false;
        }

        return (
            <div>
                <h1>Control {this.props.slideActive.token}</h1>
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
                    <RaisedButton
                        ref="b"
                        fullWidth={true}
                        label="Whaaaat ??"
                        onTouchTap={this.flopoke_finger1_start}
                    />
                </div>
                <div style={{margin: 20, height: 180, overflowY: 'auto'}}>{this.state.note}</div>
                <div>
                    <RaisedButton ref="c" fullWidth={true} label="Stop" onTouchTap={this.stop} />
                </div>
            </div>
        );
    }
});

module.exports = ControlSlide;
