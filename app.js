const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let port = 3001;

app.listen(port, () => {
  console.log("Server is running on port " + port);
})
