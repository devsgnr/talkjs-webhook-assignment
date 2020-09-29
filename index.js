//Import Important Required Files
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConfig = require("./config/database.config");

//Setup Express App
const app = express();

//Setup CORS
app.use(cors());

//Setup Port
const PORT = process.env.PORT || 8080;

//Setup Body Parser
//for X-WWW-FORM-URLENCODED
app.use(bodyParser.urlencoded({ extended: false }));
//for JSON
app.use(bodyParser.json());

//Setup Database
mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.log(err, "Database connection unsuccessful");
  });

//Setup Routes
//Import Routes
const indexRoutes = require("./app/routes/index.routes");

//Use Routes
app.use("/", indexRoutes);

//Start up Application
app.listen(PORT, () => {
  console.log(`API running on: http://localhost:${PORT}`);
});
