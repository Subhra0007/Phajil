const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
      gender: {
            type:String,
      },
      email: {
            type:String,
            required:true,
            trim:true
      },
      contactNumber: {
            type:Number,
            trim:true,
      },
})

module.exports = mongoose.model("Profile", profileSchema);