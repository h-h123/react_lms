const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
  bname: {
      type: String,
      required: true,
  },
  aname: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    default: '0'
  },
  userId: {
    type: Object,
    default: '0'
  }
},
{ timestamps: true }
);

const bookModel = mongoose.model('book', bookSchema);

module.exports = bookModel;