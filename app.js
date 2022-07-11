// Requiring the module
const express = require('express');
const app = express();
const helmet = require("helmet");
var cors = require('cors');

const crmRoutes = require("./controller");

const port = 8080;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',crmRoutes);

app.listen(port, () => {
    console.log('Server is running on ' + port);
});
