import mongoose from "mongoose";

const apischema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
    required: true,
  },
  adharno: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  paymentmode: { type: String },

  items: [
    {
      srno: { type: String, required: true },
      itemname: { type: String, required: true },
      quantity: { type: Number, required: true },
      hsncode: { type: String },
      grossweight: { type: Number },
      purity: { type: String },
      rate: { type: Number },
      hallmarkcharge: { type: Number },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Task = mongoose.model("Task", apischema);

