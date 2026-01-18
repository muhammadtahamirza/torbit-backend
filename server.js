const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes.js");
const offerRoutes = require("./routes/offerRoutes.js");
const request = require("./routes/requests.js");
const app = express();

app.use(cors());
app.use(express.json());


// Auth routes ...
app.use(authRoutes);
app.use(offerRoutes);
app.use(request);



app.get('/', (req, res) => {
  res.send("Server is running!");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});