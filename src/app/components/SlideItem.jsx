var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');

var SlideItem = React.createClass({
    getInitialState: function() {
        return {
            slide: this.props.slide,
            setSlideActive: this.props.setSlideActive
        }
    },
    activeSlide: function() {
        this.state.setSlideActive(this.state.slide);
    },
    render: function() {
        return (
            <RaisedButton label={this.state.slide.token} fullWidth={true} onTouchTap={this.activeSlide} />
        );
    }
});

module.exports = SlideItem;