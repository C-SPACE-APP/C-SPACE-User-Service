const express = require('express')
const server = require('./server')

const start = async () => {
    const app = express()

    await server(app)

    const PORT = process.env.PORT || 3001

    app.listen(PORT, (err) => {
        if(err) console.log(`Error starting app: ${err}`)
        else console.log(`Started listening on port ${PORT}`)
    })
}

start()