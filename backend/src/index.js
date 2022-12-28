require("dotenv").config();
const app = require("./app");
const { connection } = require("./database/connection");

// connection to the database
connection();

// server connection
const port = app.get("port");
app.listen(port, () => {
  console.log(`server on port ${port}`);
});

// Listening request http
