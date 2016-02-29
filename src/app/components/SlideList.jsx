var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var SlideItem = require('./SlideItem.jsx');

var SlideList = React.createClass({
    getInitialState: function () {
        return {
            User: this.props.User,
            saveUser: this.props.saveUser
        };
    },
    stop: function() {
        this.state.User.reset();
        this.props.saveUser(this.state.User);
    },
    render: function () {
        if (this.state.User.getName() == null) {
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