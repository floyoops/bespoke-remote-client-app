var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var SlideItem = require('./SlideItem.jsx');

var SlideList = React.createClass({
    stop: function() {
        this.props.setUserName(null);
    },
    render: function () {
        if (this.props.userName == null) {
            return null;
        }

        if (this.props.slideActive) {
            return null;
        }

        var that = this;
        var rows = this.props.slides.map(function (slide, i) {
            return <SlideItem key={slide.token} slide={slide} setSlideActive={that.props.setSlideActive}/>
        });

        return (
            <div>
                <h1>Choose</h1>
                {rows}
                <br />
                <RaisedButton fullWidth={true} label="Stop" onTouchTap={this.stop} />
            </div>


        );
    }
});

module.exports = SlideList;