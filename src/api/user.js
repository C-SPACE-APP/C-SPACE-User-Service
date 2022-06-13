const UserService = require('../services')

const UserAPI = (app) => {

    const service = new UserService()

    app.get('/', async (req, res) => {
        const { search } = req.query

        try {
            const data = await service.GetUsers(search)
            return res.json(data)
        } catch(err) {
            console.log(`Error in GET many users: ${err}`);
            return res.status(500).json({ err })
        }

    })

    app.get('/:id', async (req, res) => {
        const { id } = req.params

        try {
            const data = await service.GetUser(id)
            return res.json(data)
        } catch(err) {
            console.log(`Error in GET one user: ${err}`);
            return res.status(500).json({ err })
        }
    })
}

module.exports = UserAPI