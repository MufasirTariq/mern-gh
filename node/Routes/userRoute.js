const express = require('express');
const route = express.Router();
const check = require('../Controllers/userControl');

route.get('/', check);

module.exports = route;