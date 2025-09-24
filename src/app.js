const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");

require("dotenv").config();

const routes = require("./routes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

module.exports = app;

