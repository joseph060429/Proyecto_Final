const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user_id: {
    
  },

  name: {
    type: String,
    required: true,
  },
});
