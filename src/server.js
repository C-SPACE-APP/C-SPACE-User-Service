const cors  = require('cors')
const { user } = require('./api')

module.exports = async (app) => {
    app.use(cors())

    user(app)

    app.use('/', (req, res) => {
        return res.json({
            message: `Inside user service`
        })
    })
}