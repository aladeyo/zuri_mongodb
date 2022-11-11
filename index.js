const express = require("express");
const TodoRoute = require("./routes/TodoRoute");
const port = process.env.PORT || 4000;

const app = express()
require("./db/mongoose")
   
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(TodoRoute)

app.listen(port, () => {
  console.log("Server is running on port", port)
})