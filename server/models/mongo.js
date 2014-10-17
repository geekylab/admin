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
    parent_id: {
        type: String,
        required: true,
        default: '0'
    },
    type: {
        type: Number
    },
    created: {
        type: Date,
        default: Date.now
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
    'images': [{
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
    }],
    created: {
        type: Date,
        default: Date.now
    }
});


exports.Orders = db.model('Orders', Orders);
exports.Items = db.model('Items', Items);
exports.Categories = db.model('Categories', Categories);