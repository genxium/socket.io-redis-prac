const baseAbsPath = __dirname + '/';
const express = require('express');
const app = express();
const http = require('http').Server(app);
const constants = require('../common/constants');

// Mount static resource entry, reference http://expressjs.com/en/api.html
app.use(express.static('docs'));

const port = 9999;
http.listen(port, function() {
  console.log('Apidocs service listening on port ' + port);
});
