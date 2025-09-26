const app = require("./src/app");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/api`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
  console.log(`Server (mock) running at http://localhost:${PORT}/public`);
  console.log(`Swagger docs (mock) at http://localhost:${PORT}/api-docs-public`);
});
