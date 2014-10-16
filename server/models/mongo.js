var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/firstapp');

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

var Items = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    created: {
        type: Date,
        default: Date.now
    }
});


exports.Orders = db.model('Orders', Orders);
exports.Items = db.model('Items', Items);