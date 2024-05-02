const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {type: String, required: true, minLength: 7},
    description: {type: String, required: true, minLength: 7, maxLength: 1000},
    productName: {type: String, required: true, minLength: 7},
    hostId: {type: String, required: true, minLength: 7},
    startDate: {type: Date, require: true, default: Date.now(), validate: {
        validator: function (v) {
          return (
            v && // > 24h from now
            v.getTime() > Date.now() + 24 * 60 * 60 * 1000
          );
        }}
    },
    endDate: {type: Date, require: true,  validate: {
        validator: function (v) {
          return (
            v && v > this.startDate // > start date
          );
        }}
    },
    defaultPrice: {type: Number, require: true, min: 100000},
    minBid: {type: Number, require: true}
}, {
    timestamps : true
});

const AuctionRoom = mongoose.model("AuctionRoom", roomSchema);

module.exports = AuctionRoom;