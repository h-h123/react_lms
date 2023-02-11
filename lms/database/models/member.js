const mongoose = require("mongoose");


const memberSchema = new mongoose.Schema({
  mname: {
      type: String,
      required: true,
  },
  mnumber: {
    type: Number,
    required: true
  }
},
{ timestamps: true }
);

const memberModel = mongoose.model('member', memberSchema);

module.exports = memberModel;