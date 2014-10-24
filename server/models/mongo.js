var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/geekymenu');

function validator(v) {
    return v.length > 0;
}

var Orders = new mongoose.Schema({
    order_number: {
        type: String,
        required: true,
        index: true
    },
    table_number: {
        type: String,
        required: true,
        index: true
    },
    order_status: {
        type: Number
    },
    secret_number: {
        type: Number
    },
    items: [{
        item: {
            item_id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true,
                index: true
            },
            price: {
                type: Number,
                default: 0,
                index: true
            }
        }
    }],
    created: {
        type: Date,
        default: Date.now
    }
});

var Categories = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
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
        required: true,
        index: true
    },
    price: {
        type: Number,
        default: 0,
        index: true
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
        required: true,
        index: true
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

var Store = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    'store_name': {
        type: mongoose.Schema.Types.Mixed,
        index: true
    },
    'logo': {
        type: String
    },
    'tel': {
        type: String
    },
    'country': {
        type: String
    },
    'zip_code': {
        type: String
    },
    'state': {
        type: String
    },
    'city': {
        type: String
    },
    'address': {
        type: String
    },
    'address2': {
        type: String
    },
    location: [Number, Number],
    seat_count: {
        type: Number
    },
    'opening_hour': {
        start: {
            type: String
        },
        end: {
            type: String
        }
    },
    'seat_type': [{
        type: String
    }],
    'images': [{
        path: {
            type: String
        },
        filename: {
            type: mongoose.Schema.Types.Mixed
        },
        desc: {
            type: mongoose.Schema.Types.Mixed
        }
    }],
    'created': {
        type: Date,
        default: Date.now
    }
});

Store.index({name: 1, location: "2d"});

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
exports.Stores = db.model('Stores', Store);