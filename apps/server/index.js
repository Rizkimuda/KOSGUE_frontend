const app = require("./app");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
