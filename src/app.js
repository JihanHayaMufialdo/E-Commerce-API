const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");
const swaggerMockSpecs = require("./swagger.public");

require("dotenv").config();

const routes = require("./routes");
const publicRoutes = require("./routes/public");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/public", publicRoutes);

app.use("/api-docs", swaggerUi.serveFiles(swaggerSpecs), swaggerUi.setup(swaggerSpecs));
app.use("/api-docs-public", swaggerUi.serveFiles(swaggerMockSpecs), swaggerUi.setup(swaggerMockSpecs));

module.exports = app;


