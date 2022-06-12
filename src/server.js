const cors  = require('cors')

module.exports = async (app) => {
    app.use(cors())

    app.use('/', (req, res) => {
        return res.json({
            message: `Inside user service`
        })
    })
}