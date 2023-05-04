"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
//const express = require('express');
var app = (0, express_1["default"])();
var port = process.env.SERVER_PORT || 5000;
app.listen(port, function () { return console.log("Listening on port ".concat(port)); });
// route for retrieving movie title
app.get('/test', function (req, res) {
    console.log(typeof (res));
    res.send({ express: 'Test route connecting successfully' });
});
