require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const profileRouter = require("./routes/profile-routes.js");

app.use(cors());
app.use(express.json());
app.use("/audio", express.static("public/audio"));

app.use("/api/profile", profileRouter);

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});

