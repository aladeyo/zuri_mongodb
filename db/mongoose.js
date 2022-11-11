const mongoose = require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/Todo', { useNewUrlParser: true }, (err) => {
  if (err) {
    return console.log("DB connection error: ", err.message)
  }
  console.log("DB connection on...")
})
