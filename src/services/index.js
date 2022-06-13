const { UserRepository } = require('../database')

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
}

module.exports = UserService