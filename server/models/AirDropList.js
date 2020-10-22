const mongoose = require('mongoose');
const { Schema } = mongoose;

const AirDropListSchema = new Schema({
  tranche: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  twitter: {
    type: String,
    required: true,
  },
  following: {
    type: Boolean,
    default: false,
  },
  retweet: {
    type: Boolean,
    default: false,
  },
  telegram: {
    type: String,
    require: true,
  },
  discord: {
    type: String,
    require: false,
  },
});

const AirDropList = mongoose.model('AirDropList', AirDropListSchema);

module.exports = AirDropList;
