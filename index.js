const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/get', (req, res) => res.send("Hello World"));

app.listen(port, () => console.log('Listening on port: ' + port));