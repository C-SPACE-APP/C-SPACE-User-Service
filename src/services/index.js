const { UserRepository } = require('../database')
const mongoose = require('mongoose')

class UserService {

    constructor() {
        this.repository = new UserRepository()
    }

    async GetUsers(filter) {
        const blankPattern = /\S/g

        try {
            let pattern = filter

            if(!filter || typeof filter !== 'string' || !filter.match(blankPattern)) {
                pattern = ".*"
            }

            const users = await this.repository.FindUsers(pattern)

            return(users)
        } catch(err) {
            throw err
        }
    }

    async GetUser(id) {
        try {
            mongoose.Types.ObjectId(id)
        } catch(err) {
            throw `Invalid id '${id}'`
        }

        try {
            const user = await this.repository.FindUser(id)

            if(!user) throw `User ${id} not found`
            
            return(user)
        } catch(err) {
            throw `Error searching for User. Error: ${err}`
        }
    }

}

module.exports = UserService