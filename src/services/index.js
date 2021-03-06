const { UserRepository, DBUtils } = require('../database')

class UserService {

    constructor() {
        this.repository = new UserRepository()
        this.utils = new DBUtils()
    }

    /** */
    async AddUser(userData) {
        const {
            googleId,
            email,
            givenName,
            lastName,
            photo,
            username,
            password,
            batch,
            college,
            course
        } = userData

        try {
            const existing = await this.repository.FindUserByGoogleId(googleId)
            if(existing) return({
                status: 200,
                message: `User ${givenName} already exist`,
                payload: { user: existing }
            })
        } catch(err) {
            console.log(`Error in UserService: AddUser: ${err}`)
            throw err
        }

        try {
            const user = await this.repository.CreateUser({
                googleId,
                email,
                givenName,
                lastName,
                photo,
                username,
                password,
                batch,
                college,
                course
            })

            return({
                status: 200,
                payload: { user }
            })
        } catch (err) {
            console.log(`Error in UserService: AddUser: ${err}`)
            throw err
        }
    }

    /** */
    async DeleteUser(id) {
        const objID = await this.utils.validID(id)
        if(!objID) return({
            status: 400,
            message: `Invalid ID: ${id}`
        })

        try {
            const user = await this.repository.DeleteUser(objID)
           
            if(!user) return({
                status: 400,
                message: `User ${id} not found`
            })

            return({
                status: 200,
                payload: { user }
            })
        } catch(err) {
            throw `Error deleting User. Error: ${err}`
        }
    }

    /** */
    async GetUsers({ search, limit, page } = {}) {
        let { search:pattern } = await this.utils.sanitize({ search })

        if(!pattern) pattern = ".*"

        try {
            const { users, resultCount, lastPage } = await this.repository.FindUsers(pattern)

            return({
                status: 200,
                payload: { users, resultCount, lastPage }
            })
        } catch(err) {
            console.log(`Error in UserService: GetUser: ${err}`)
            throw err
        }
    }

    /** */
    async GetUser(id) {
        const objID = await this.utils.validID(id)
        if(!objID) return({
            status: 400,
            message: `Invalid ID: ${id}`
        })

        try {
            const user = await this.repository.FindUser(id)

            if(!user) return({
                status: 400,
                message: `User ${id} not found`
            })
            
            return({
                status: 200,
                payload: { user }
            })
        } catch(err) {
            throw `Error searching for User. Error: ${err}`
        }
    }

    /** */
    async GetUserByGoogleId(id) {
        try {
            const user = await this.repository.FindUserByGoogleId(id)
            return({
                status: 200,
                payload: { user }
            })
        } catch(err) {
            throw `Error searching for User. Error: ${err}`
        }
    }

    /** */
    async UpdateUser({ id, username, batch, college, course }){
        const objID = await this.utils.validID(id)
        if(!objID) return({
            status: 400,
            message: `Invalid ID: ${id}`
        })

        const details = await this.utils.sanitize({ username, batch, college, course })

        if(Object.keys(details).length === 0 ) return({
            status: 400,
            message: `Invalid new values for user ${id}`
        })

        try {
            const user = await this.repository.EditUser(id, details)
            
            if(!user) return({
                status: 400,
                message: `Unable to edit user`
            })

            return({
                status: 200,
                payload: { user }
            })
        } catch(err) {
            throw `Error updating User. Error: ${err}`
        }
    }

    /** */
    async SubscribeEvents(payload){
 
        const { event, data } =  payload;
        const { userId, googleId } = data;

        switch(event){
            case 'FIND_BY_GOOGLE_ID':
                return this.GetUserByGoogleId(googleId)
            case 'ADD_USER':
                return this.AddUser(data)
            case 'GET_USER':
                return this.GetUser(userId)
            default:
                return({
                    status: 400,
                    message: `No event ${event} available`
                })
        }
    }

}

module.exports = UserService