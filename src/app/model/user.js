var User = {
    name: null,
    isAdmin: false,
    setName: function (name) {
        this.name = name;
    },
    getName: function () {
        return this.name;
    },
    reset: function() {
        this.setName(null);
        this.isAdmin = false;
    }
};

module.exports = User;
