const UserService = require('../services')
const { Authorize } = require('../middlewares')


const UserAPI = (app) => {

    const service = new UserService()

    /** */
    app.get('/test', async (req, res) => {
	return res.json({ message: 'Inside User Service' })
    })

    /** */
    app.get('/', Authorize(), async (req, res) => {
        const { search } = req.query

        try {
            const { status, message, payload } = await service.GetUsers(search)
            return res.status(status).json({ message, payload })
        } catch(err) {
            console.log(`Error in GET many users: ${err}`);
            return res.status(500).json({ err })
        }
    })

    /** */
    app.get('/:id', Authorize(), async (req, res) => {
        const { id } = req.params

        try {
            const { status, message, payload } = await service.GetUser(id)
            return res.status(status).json({ message, payload })
        } catch(err) {
            console.log(`Error in GET one user: ${err}`);
            return res.status(500).json({ err })
        }
    })

    /** */
    app.patch('/:id', Authorize('OWNER'), async (req, res) => {  // AUTH IS DISABLED FOR TESTING PURPOSES
    // app.patch('/:id', async (req, res) => {
        const { id } = req.params
        const { batch, course, college, username } = req.body

        try {
            const { status, message, payload } = await service.UpdateUser({ id, username, batch, course, college })
            return res.status(status).json({ message, payload })
        } catch(err) {
            console.log(`Error in PATCH user: ${err}`);
            return res.status(500).json({ err })
        }
    })

    /** */
    app.delete('/:id', Authorize('OWNER'), async (req, res) => {     // AUTH IS DISABLED FOR TESTING PURPOSES
    // app.delete('/:id', async (req, res) => {
        const { id } = req.params
        
        try {
            const { status, message, payload } = await service.DeleteUser(id)
            return res.status(status).json({ message, payload })
        } catch(err) {

        }
    })
}

module.exports = UserAPI
