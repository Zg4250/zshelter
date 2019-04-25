const express = require("express"),
         path = require("path"),
           bp = require("body-parser"),
      DB_NAME = "petshelter",
         port = 8000,
          app = express();
         


app.use(bp.json());
app.use(express.static(path.join(__dirname,'./client/build')));

require('./server/utils/mongoose')(DB_NAME);
require('./server/utils/routes')(app);

app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Listing on port: ${port}`);
});