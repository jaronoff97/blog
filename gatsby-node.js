'use strict';


const express = require('express')
exports.onCreateDevServer=({app})=>{
    app.use(express.static('public'))
}
exports.createPages = require('./gatsby/create-pages');
exports.onCreateNode = require('./gatsby/on-create-node');
