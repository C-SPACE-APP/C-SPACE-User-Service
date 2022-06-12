const UserAPI = (app) => {
    app.get('/', async (req, res) => {
        const {
            givenName,
            lastName,
            email
        } = req.query
        
        return res.json({
            message: `Inside GET User service`
        })
    })

    app.get('/extra', async (req, res) => {
        return res.json({
            message: `Inside GET User EXTRA service`
        })
    })
}

module.exports = UserAPI