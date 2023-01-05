const express = require("express");
const app = express();
const cors = require("cors");

// setting
app.set("port", process.env.PORT || 3500); // Define port of server

// setting cors
app.use(cors());  

// conver body to json
app.use(express.json());   
app.use(express.urlencoded({ extended: true }));

// Create routes
app.use("/api", require("./routes/rs.routes"));
app.use("/api/user", require("./routes/user.routes"))
app.use("/api/public", require('./routes/publication.routes'))
app.use("/api/follow", require("./routes/follow.routes"))

// Export the module
module.exports = app;
