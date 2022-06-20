const UserService = require('../services')
const { Authorize } = require('../middlewares')


const UserAPI = (app) => {

    const service = new UserService()

    /** */
    app.get('/', Authorize(), async (req, res) => {
        const { search } = req.query

        try {
            const data = await service.GetUsers(search)
            return res.json(data)
        } catch(err) {
            console.log(`Error in GET many users: ${err}`);
            return res.status(500).json({ err })
        }
    })

    /** */
    app.get('/:id', Authorize(), async (req, res) => {
        const { id } = req.params

        try {
            const { status, message, user } = await service.GetUser(id)
            return res.status(status).json({ message, user })
        } catch(err) {
            console.log(`Error in GET one user: ${err}`);
            return res.status(500).json({ err })
        }
    })

    /** */
    // app.patch('/:id', Authorize('OWNER'), async (req, res) => {  // AUTH IS DISABLED FOR TESTING PURPOSES
    app.patch('/:id', async (req, res) => {
        const { id } = req.params
        const { batch, course, college, username } = req.body

        try {
            const { status, message, user } = await service.UpdateUser({ id, username, batch, course, college })
            return res.status(status).json({ message })
        } catch(err) {
            console.log(`Error in PATCH user: ${err}`);
            return res.status(500).json({ err })
        }
    })
}

module.exports = UserAPI