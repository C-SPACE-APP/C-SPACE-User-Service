const UserService = require('../services')

const UserAPI = (app) => {

    const service = new UserService()

    app.get('/', async (req, res) => {
        
        const {
            search
        } = req.query

        try {
            const data = await service.GetUsers(search)
            return res.json(data)
        } catch(err) {
            console.log(`Error in get users: ${err}`);
            return res.status(500).json({ err })
        }

    })

    // app.get('/extra', async (req, res) => {
    //     return res.json({
    //         message: `Inside GET User EXTRA service`
    //     })
    // })
}

module.exports = UserAPI