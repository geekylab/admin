var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/geekymenu');

function validator(v) {
    return v.length > 0;
}

var Orders = new mongoose.Schema({
    table_number: {
        type: String,
        required: true
    },
    order_status: {
        type: Number
    },
    items: [{
        item_id: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        annotation: [String]
    }],
    created: {
        type: Date,
        default: Date.now
    }
});

var Categories = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

var Image = new mongoose.Schema({
    path: {
        type: String
    },
    filename: {
        type: String
    },
    sort_order: {
        type: Number,
        default: 0
    },
    image_type: {
        type: Number,
        default: 0
    }
});

var Items = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    'time': {
        type: Number,
        default: 0
    },
    'images': [Image],
    'categories': [String],
    created: {
        type: Date,
        default: Date.now
    }
});

var Tables = new mongoose.Schema({
    'table_number': {
        type: String,
        required: true
    },
    'table_status': {
        type: Number,
        default: 0
    },
    'limited_number': {
        type: Number,
        default: 0
    },
    'created': {
        type: Date,
        default: Date.now
    }
});

var Users = mongoose.Schema({

    local: {
        email: String,
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }

});

// methods ======================
// generating a hash
Users.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
Users.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};


exports.Orders = db.model('Orders', Orders);
exports.Items = db.model('Items', Items);
exports.Categories = db.model('Categories', Categories);
exports.Tables = db.model('Tables', Tables);
exports.Users = db.model('Users', Users);