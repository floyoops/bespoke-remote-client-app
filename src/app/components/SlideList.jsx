var React = require('react');
var SlideItem = require('./SlideItem.jsx');

var SlideList = React.createClass({
    render: function () {
        if (this.props.slideActive) {
            return false;
        }

        var that = this;
        var rows = this.props.slides.map(function (slide, i) {
            return <SlideItem key={slide.token} slide={slide} setSlideActive={that.props.setSlideActive}/>
        });

        return (
            <div>
                <h1>Choose</h1>
                {rows}
            </div>
        );
    }
});

module.exports = SlideList;