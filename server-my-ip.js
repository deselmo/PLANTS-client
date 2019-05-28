var express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());

app.get('/my-ip', function (req, res) {
  res.send('"' + req.ip.substr(7) + '"');
});

app.listen(4201, () => { });
