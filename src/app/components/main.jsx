/** In this file, we create a React component which incorporates components provided by material-ui */
var socket = require('socket.io-client')('http://localhost:8000');

var React = require('react');

// Material-ui
var AppBar = require('material-ui/lib/app-bar');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
var Colors = require('material-ui/lib/styles/colors');

// BespokeApp
var ControlSlide = require('./ControlSlide.jsx');
var SlideList = require('./SlideList.jsx');
var FormName = require('./formName.jsx');
var User = require('../model/User.js');


var Main = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getInitialState () {
        return {
            socket: socket,
            slides: [],
            slideActive: null,
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
            User: User
        };
    },

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme,
        };
    },
    slideExist(slide) {
        var exist = false
        this.state.slides.map(function (item) {
            if (item.token === slide.token) {
                exist = true;
            }
        });

        return exist;
    },
    addSlide(slide) {
        if (this.slideExist(slide) == false) {
            this.state.slides.push(slide);
            this.setState({slides: this.state.slides});
        }
    },
    removeAllSlides() {
        this.state.slides = [];
    },
    setSlideActive(slide) {
        if (slide !== null) {
            this.state.socket.emit('setRemoteUser', slide.token);
        }

        this.state.slideActive = slide;
        this.setState({slideActive: this.state.slideActive});
    },
    componentWillMount() {

        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
            accent1Color: Colors.deepOrange500
        });

        var that = this;

        this.state.socket.on('client-list-users', function (users) {
            that.removeAllSlides();
            users.map(function (user) {
                that.addSlide({token: user});
            });
        });

        this.setState({muiTheme: newMuiTheme});
        this.state.socket.emit('list-users');
    },
    setAutoUserAdmin() {
        if (this.state.userName == 'admin') {
            this.state.userIsAdmin = true;
        }
    },
    saveUser(User) {
        if (User.getName() == 'admin') {
            User.isAdmin = true;
        }

        this.setState({User: User});
    },
    render() {
        let containerStyle = {
            textAlign: 'center',
        };

        return (
            <div style={containerStyle}>
                <AppBar title="Bespoke remote"/>

                <FormName
                    User={this.state.User}
                    saveUser={this.saveUser}
                    socket={this.state.socket}
                />

                <SlideList
                    User={this.state.User}
                    saveUser={this.saveUser}
                    slides={this.state.slides}
                    slideActive={this.state.slideActive}
                    setSlideActive={this.setSlideActive}
                />

                <ControlSlide
                    User={this.state.User}
                    slideActive={this.state.slideActive}
                    setSlideActive={this.setSlideActive}
                    socket={this.state.socket}
                />

            </div>
        );
    }
});

module.exports = Main;
