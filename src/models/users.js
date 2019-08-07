const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: {
      type: String
    },
    emailAddress: {
      type: String
    },
    name: {
      type: String
    }
  },
  {
    timestamps: {
      created_at: "created_at"
    }
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
