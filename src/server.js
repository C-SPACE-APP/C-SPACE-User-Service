const cors  = require('cors')
const express = require('express')

const { user, appEvents } = require('./api')

module.exports = async (app) => {
    app.use(cors())
    app.use(express.urlencoded({extended: true}));
    app.use(express.json())

    appEvents(app)
    
    user(app)
}