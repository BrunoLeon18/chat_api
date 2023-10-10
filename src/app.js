const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorRoutes = require("./routes/error.routes.js");
const apiv1Routes = require("./routes/apiv1.routes.js");
const path = require('node:path')


const app = express();


app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.use('/avatar', express.static(path.join(__dirname,'../public')))
app.get("/", (req, res) => {
  res.send("OK");
});

apiv1Routes(app);
errorRoutes(app);

module.exports = app;