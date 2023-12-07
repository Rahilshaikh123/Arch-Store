const payload = require("./payload");
const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

// Localhost Route to Except Payload
app.post("/api/payload", payload);

app.listen(PORT, () => {
  console.log(`Your server is started on PORT= ${PORT}`);
});
